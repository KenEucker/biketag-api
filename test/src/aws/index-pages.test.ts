import { describe, expect, test, vi } from 'vitest'
import { GetObjectCommand, PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import { Readable } from 'node:stream'
import { getTag } from '../../../src/aws/getTag'
import { getTags } from '../../../src/aws/getTags'
import { saveIndex, getMainIndexPage, getMainIndexKey } from '../../../src/aws/helpers'
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

  test('all tags omit duplicate pointer and limited reads load only newest page', async () => {
    const { client, send } = clientWithObjects({
      'main/index-0.json': [tag(2001)],
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
