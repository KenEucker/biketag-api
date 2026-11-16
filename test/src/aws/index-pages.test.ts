import { describe, expect, test, vi } from 'vitest'
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, CopyObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import { Readable } from 'node:stream'
import { getTag } from '../../../src/aws/getTag'
import { updateTag } from '../../../src/aws/updateTag'
import { getTags } from '../../../src/aws/getTags'
import { saveIndex, getMainIndexPage, getMainIndexKey, updateStoredTagMetadata, patchStoredTagFoundFields } from '../../../src/aws/helpers'
import type { Tag } from '../../../src/common/schema'

const tag = (n: number) => ({ game: 'test', tagnumber: n, slug: `test-tag-${n}` }) as Tag
const clientWithObjects = (initial: Record<string, Tag[] | Tag> = {}) => {
  const objects = new Map(Object.entries(initial).map(([key, data]) => [key, JSON.stringify(data)]))
  const send = vi.fn(async (command: any) => {
    const key = command.input.Key
    if (command instanceof GetObjectCommand) {
      if (!objects.has(key)) throw Object.assign(new Error('NoSuchKey'), { name: 'NoSuchKey' })
      return { Body: Readable.from([objects.get(key)!]) }
    }
    if (command instanceof HeadObjectCommand) {
      if (!objects.has(key)) throw Object.assign(new Error('Not found'), { name: 'NotFound' })
      return { Metadata: { data: Buffer.from('{}').toString('base64'), keep: 'yes' }, ContentType: 'image/webp' }
    }
    if (command instanceof CopyObjectCommand) return {}
    if (command instanceof DeleteObjectCommand) {
      objects.delete(key)
      return {}
    }
    if (command instanceof PutObjectCommand) {
      objects.set(key, command.input.Body)
      return {}
    }
    throw new Error('Unexpected command')
  })
  return { client: { send } as unknown as S3Client, send, objects }
}

describe('AWS historical index pages', () => {
  test('index.json remains page one; page boundary is stable', () => {
    expect(getMainIndexPage(1)).toBe(1)
    expect(getMainIndexPage(2000)).toBe(1)
    expect(getMainIndexPage(2001)).toBe(2)
    expect(getMainIndexKey(1)).toBe('main/index.json')
    expect(getMainIndexKey(2)).toBe('main/index-2.json')
  })

  test('current lookup performs exactly one read when pointer exists', async () => {
    const { client, send } = clientWithObjects({ 'main/index-0.json': tag(2001) })
    const response = await getTag(client, { game: 'test', region: 'nyc3', slug: 'current' } as any)
    expect(response.success).toBe(true)
    expect(response.data.tagnumber).toBe(2001)
    expect(send).toHaveBeenCalledTimes(1)
  })

  test('missing current pointer falls back to legacy history without writes', async () => {
    const { client, send } = clientWithObjects({ 'main/index.json': [tag(20), tag(19)] })
    const response = await getTag(client, { game: 'test', region: 'nyc3', slug: 'current' } as any)
    expect(response.data.tagnumber).toBe(20)
    expect(send.mock.calls.every(([command]) => command instanceof GetObjectCommand)).toBe(true)
  })

  test('new tags are persisted to their numbered page before index-0', async () => {
    const { client, objects, send } = clientWithObjects()
    await saveIndex(client, 'test-biketag', 'main', [tag(2001), tag(2000), tag(1)])
    expect(JSON.parse(objects.get('main/index.json')!)).toHaveLength(2)
    expect(JSON.parse(objects.get('main/index-2.json')!)[0].tagnumber).toBe(2001)
    expect(JSON.parse(objects.get('main/index-0.json')!).tagnumber).toBe(2001)
    const keys = send.mock.calls.map(([command]) => command.input.Key)
    expect(keys.at(-1)).toBe('main/index-0.json')
  })

  test('deleting newest page removes the stale index and updates the current pointer', async () => {
    const { client, objects } = clientWithObjects({
      'main/index-0.json': tag(2001),
      'main/index.json': [tag(2000)],
      'main/index-2.json': [tag(2001)],
    })
    await saveIndex(client, 'test-biketag', 'main', [tag(2000)])
    expect(objects.has('main/index-2.json')).toBe(false)
    expect(JSON.parse(objects.get('main/index-0.json')!).tagnumber).toBe(2000)
  })

  test('AWS-only metadataOnly flag uses updateTag without invoking upload', async () => {
    const current = {
      ...tag(7), hint: 'old',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-7--mystery.webp',
    } as Tag
    const { client, objects } = clientWithObjects({
      'main/index-0.json': current, 'main/index.json': [current],
      'main/test-tag-7--mystery.webp': current,
    })
    const response = await (updateTag as any).call({
      getTags: () => { throw new Error('should use the index helper') },
      uploadTagImage: () => { throw new Error('must not upload an image') },
    }, client, { game: 'test', tagnumber: 7, region: 'sfo2', metadataOnly: true, hint: 'edited' })
    expect(response.success).toBe(true)
    expect(JSON.parse(objects.get('main/index-0.json')!).hint).toBe('edited')
  })

  test('AWS-only found repair flag does not invoke image upload', async () => {
    const current = { ...tag(8), mysteryPlayer: 'keep' } as Tag
    const { client, objects } = clientWithObjects({
      'main/index-0.json': current, 'main/index.json': [current],
    })
    const response = await (updateTag as any).call({
      uploadTagImage: () => { throw new Error('must not upload an image') },
    }, client, { game: 'test', tagnumber: 8, region: 'sfo2',
      indexOnlyFoundRepair: true, foundPlayer: 'winner' })
    expect(response.success).toBe(true)
    expect(JSON.parse(objects.get('main/index-0.json')!).mysteryPlayer).toBe('keep')
    expect(JSON.parse(objects.get('main/index.json')!)[0].foundPlayer).toBe('winner')
  })

  test('found-only image update cannot erase the existing mystery half', async () => {
    const original = {
      ...tag(42), mysteryPlayer: 'mystery-author', hint: 'keep',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-42--mystery.webp',
      mysteryTime: 100,
      foundImageUrl: '', foundPlayer: '',
    } as Tag
    const { client, objects } = clientWithObjects({
      'main/index-0.json': original, 'main/index.json': [original],
    })
    const newFound = 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-42--found.webp'
    const response = await (updateTag as any).call({
      getTags: async () => ({ success: true, data: [original] }),
      uploadTagImage: async () => ({
        success: true,
        data: {
          mysteryImageUrl: '', mysteryTime: 0,
          foundImageUrl: newFound, foundTime: 200,
        },
      }),
    }, client, { game: 'test', tagnumber: 42, folder: 'main', region: 'sfo2', foundImageUrl: newFound })
    expect(response.success).toBe(true)
    const stored = JSON.parse(objects.get('main/index.json')!)[0]
    expect(stored.mysteryImageUrl).toBe(original.mysteryImageUrl)
    expect(stored.mysteryTime).toBe(100)
    expect(stored.foundImageUrl).toBe(newFound)
    expect(response.data.mysteryImageUrl).toBe(original.mysteryImageUrl)
    expect(JSON.parse(objects.get('main/index-0.json')!).mysteryImageUrl).toBe(original.mysteryImageUrl)
  })

  test('metadata-only mystery edits preserve found information and update current pointer', async () => {
    const current = {
      ...tag(1700), hint: 'original', mysteryPlayer: 'mystery-rider',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-1700--mystery.webp',
      foundPlayer: 'finder', foundTime: 123, foundLocation: 'park',
      foundImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-1700--found.webp',
      gps: { lat: 1, long: 2, alt: 0 },
    } as Tag
    const { client, objects, send } = clientWithObjects({
      'main/index.json': [current],
      'main/index-0.json': current,
      'main/test-tag-1700--mystery.webp': tag(1700),
    })
    const response = await updateStoredTagMetadata(client, {
      game: 'test', tagnumber: 1700, hint: 'updated',
    })
    expect(response.success).toBe(true)
    expect(response.data?.foundPlayer).toBe('finder')
    expect(response.data?.gps).toEqual({ lat: 1, long: 2, alt: 0 })
    expect(JSON.parse(objects.get('main/index-0.json')!).hint).toBe('updated')
    expect(JSON.parse(objects.get('main/index.json')!)[0].foundImageUrl).toBe(current.foundImageUrl)
    expect(send.mock.calls.filter(([c]) => c instanceof CopyObjectCommand)).toHaveLength(1)
  })

  test('found metadata edit touches only the found image and preserves mystery fields', async () => {
    const original = {
      ...tag(88),
      mysteryPlayer: 'mystery-author',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-88--mystery.webp',
      hint: 'preserve this',
      foundPlayer: 'finder',
      foundLocation: 'old location',
      foundImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-88--found.webp',
    } as Tag
    const { client, send, objects } = clientWithObjects({
      'main/index-0.json': original,
      'main/index.json': [original],
      'main/test-tag-88--found.webp': tag(88),
    })
    const response = await updateStoredTagMetadata(client, {
      game: 'test', tagnumber: 88, foundLocation: '', gps: { lat: 0, long: 0, alt: 0 },
    })
    expect(response.success).toBe(true)
    const updated = JSON.parse(objects.get('main/index.json')!)[0]
    expect(updated.foundLocation).toBe('')
    expect(updated.hint).toBe('preserve this')
    expect(updated.mysteryImageUrl).toBe(original.mysteryImageUrl)
    const copies = send.mock.calls.filter(([cmd]) => cmd instanceof CopyObjectCommand)
    expect(copies).toHaveLength(1)
    expect(copies[0][0].input.Key).toBe('main/test-tag-88--found.webp')
    expect(JSON.parse(Buffer.from(copies[0][0].input.Metadata.data, 'base64').toString()).fl).toBe('')
  })

  test('metadata edits retain rounds published during image metadata copies', async () => {
    const first = {
      ...tag(12), hint: 'old',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-12--mystery.webp',
    } as Tag
    const next = { ...tag(13), hint: 'next round' } as Tag
    const { client, objects } = clientWithObjects({
      'main/index-0.json': first,
      'main/index.json': [first],
      'main/test-tag-12--mystery.webp': first,
    })
    const originalSend = client.send.bind(client)
    client.send = (async (cmd: any) => {
      if (cmd instanceof CopyObjectCommand) {
        objects.set('main/index.json', JSON.stringify([next, first]))
      }
      return originalSend(cmd)
    }) as any
    const response = await updateStoredTagMetadata(client, {
      game: 'test', tagnumber: 12, hint: 'corrected',
    })
    expect(response.success).toBe(true)
    const saved = JSON.parse(objects.get('main/index.json')!)
    expect(saved.map((t: Tag) => t.tagnumber)).toEqual([13, 12])
    expect(saved[0].hint).toBe('next round')
    expect(saved[1].hint).toBe('corrected')
    expect(JSON.parse(objects.get('main/index-0.json')!).tagnumber).toBe(13)
  })

  test('metadata edit never follows a stale mystery URL into another round', async () => {
    const damaged = {
      ...tag(100), hint: 'unchanged',
      mysteryImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-99--mystery.webp',
    } as Tag
    const { client, send, objects } = clientWithObjects({
      'main/index.json': [damaged],
      'main/index-0.json': damaged,
      'main/test-tag-99--mystery.webp': tag(99),
    })
    const response = await updateStoredTagMetadata(client, {
      game: 'test', tagnumber: 100, hint: 'should fail',
    })
    expect(response.success).toBe(false)
    expect(send.mock.calls.some(([cmd]) => cmd instanceof CopyObjectCommand)).toBe(false)
    expect(JSON.parse(objects.get('main/index.json')!)[0].hint).toBe('unchanged')
  })

  test('found-side repair updates one tag without losing mystery information', async () => {
    const current = { ...tag(2001), mysteryPlayer: 'active' } as Tag
    const prior = { ...tag(2000), mysteryPlayer: 'prior', hint: 'keep',
      foundImageUrl: '', foundPlayer: '' } as Tag
    const { client, objects } = clientWithObjects({
      'main/index-0.json': current,
      'main/index.json': [prior],
      'main/index-2.json': [current],
    })
    const response = await patchStoredTagFoundFields(client, {
      game: 'test', tagnumber: 2000, region: 'sfo2',
      foundPlayer: 'winner', foundImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-2000--found.webp',
    })
    expect(response.success).toBe(true)
    const repaired = JSON.parse(objects.get('main/index.json')!)[0]
    expect(repaired.mysteryPlayer).toBe('prior')
    expect(repaired.hint).toBe('keep')
    expect(repaired.foundPlayer).toBe('winner')
    expect(JSON.parse(objects.get('main/index-0.json')!).mysteryPlayer).toBe('active')
  })

  test('found repair replaces a stale queue URL but refuses conflicting main URL', async () => {
    const inQueue = {
      ...tag(12), mysteryPlayer: 'preserve',
      foundImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/queue/test-tag-12--found--abc.webp',
    } as Tag
    const target = 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-12--found.webp'
    const { client, objects } = clientWithObjects({
      'main/index-0.json': inQueue, 'main/index.json': [inQueue],
    })
    const repaired = await patchStoredTagFoundFields(client, { game: 'test', tagnumber: 12, foundImageUrl: target })
    expect(repaired.success).toBe(true)
    expect(JSON.parse(objects.get('main/index.json')!)[0].foundImageUrl).toBe(target)

    const conflicting = { ...inQueue, foundImageUrl: 'https://test-biketag.sfo2.cdn.digitaloceanspaces.com/main/test-tag-12--found.jpg' }
    const { client: other } = clientWithObjects({
      'main/index-0.json': conflicting, 'main/index.json': [conflicting],
    })
    const refused = await patchStoredTagFoundFields(other, { game: 'test', tagnumber: 12, foundImageUrl: target })
    expect(refused.success).toBe(false)
  })

  test('all tags omit duplicate pointer and limited reads load only newest page', async () => {
    const { client, send } = clientWithObjects({
      'main/index-0.json': tag(2001),
      'main/index.json': [tag(2000), tag(1)],
      'main/index-2.json': [tag(2001)],
    })
    const limited = await getTags(client, { game: 'test', region: 'nyc3', limit: 1 } as any)
    expect(limited.data.map(t => t.tagnumber)).toEqual([2001])
    expect(send.mock.calls.map(([command]) => command.input.Key)).toEqual([
      'main/index-0.json', 'main/index-2.json'
    ])
    send.mockClear()
    const all = await getTags(client, { game: 'test', region: 'nyc3' } as any)
    expect(all.data.map(t => t.tagnumber)).toEqual([2001, 2000, 1])
    expect(send.mock.calls).toHaveLength(3)
  })
})
