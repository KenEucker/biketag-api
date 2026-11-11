import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  type S3Client,
} from '@aws-sdk/client-s3'
import { getBikeTagFromS3ImageSet } from '../../../src/common/getters'
import { createTagObject } from '../../../src/common/data'
import type { S3ImageMeta } from '../../../src/common/types'
import {
  getFoundMetadata,
  getMysteryMetadata,
  getTagMetadata,
  loadIndex,
} from '../../../src/aws/helpers'
import { getQueue } from '../../../src/aws/getQueue'

const gps = { lat: 45.5231, long: -122.6765, alt: 12 }
const zeroGps = { lat: 0, long: 0, alt: 0 }
const foundTag = createTagObject({
  tagnumber: 99,
  game: 'test',
  playerId: 'test-player',
  foundPlayer: 'Finder',
  foundLocation: 'Park',
  foundTime: 1720000000,
  gps,
})
const mysteryTag = createTagObject({
  tagnumber: 100,
  game: 'test',
  playerId: 'test-player',
  mysteryPlayer: 'Finder',
  mysteryTime: 1720000100,
  hint: 'tree',
})
const mystery: S3ImageMeta = {
  url: 'https://example.org/mystery.webp',
  data: mysteryTag,
}

afterEach(() => vi.unstubAllGlobals())

describe('GPS reconstruction from S3 metadata', () => {
  for (const paired of [false, true]) {
    test.each([
      gps,
      { lat: 0, long: -122.6765, alt: 0 },
      { lat: 45.5231, long: 0, alt: -5 },
      zeroGps,
    ])(
      `preserves structured coordinates (paired=${paired}): %j`,
      (coordinates) => {
        const found: S3ImageMeta = {
          url: 'https://example.org/found.webp',
          data: { ...foundTag, gps: coordinates },
        }
        const tag = getBikeTagFromS3ImageSet(
          paired ? mystery : undefined,
          found
        )
        expect(tag.gps).toEqual(coordinates)
      }
    )
  }

  test('preserves GPS through the actual compact metadata codec', () => {
    const metadata = getFoundMetadata(foundTag)
    const found = {
      url: 'https://example.org/found.webp',
      data: getTagMetadata(metadata),
    }
    expect(getBikeTagFromS3ImageSet(mystery, found).gps).toEqual(gps)
  })

  test.each(['description', 'title'] as const)(
    'still reads GPS from a legacy found image %s',
    (field) => {
      const found: S3ImageMeta = {
        url: 'https://example.org/found.jpg',
        description: '#99 proof found at (Park) by Finder on [1/1/24@09:00:00]',
        [field]: '(45.5231, -122.6765)',
      }
      expect(getBikeTagFromS3ImageSet(undefined, found).gps).toEqual({
        ...gps,
        alt: 0,
      })
    }
  )

  test('still reads GPS from a legacy mystery title', () => {
    expect(
      getBikeTagFromS3ImageSet({
        url: 'https://example.org/mystery.jpg',
        description: '#100 tag (hint: tree) by Finder on [1/1/24@10:00:00]',
        title: '(45.5231, -122.6765)',
      }).gps
    ).toEqual({ ...gps, alt: 0 })
  })

  test('keeps missing found GPS at the default', () => {
    const { gps: _gps, ...withoutGps } = foundTag
    expect(
      getBikeTagFromS3ImageSet(undefined, {
        url: 'https://example.org/found.webp',
        data: withoutGps,
      }).gps
    ).toEqual(zeroGps)
  })

  test('keeps a new mystery location undisclosed', () => {
    expect(getBikeTagFromS3ImageSet(mystery).gps).toEqual(zeroGps)
  })
})

// All S3 operations stay in this map; no real client or credentials are used.
function storage(
  initial: Record<string, { Metadata: Record<string, string> }>
) {
  const objects = new Map<
    string,
    { Metadata?: Record<string, string>; Body?: unknown }
  >(Object.entries(initial))
  const send = vi.fn(async (command) => {
    const { Key, Prefix } = command.input
    if (command instanceof ListObjectsV2Command) {
      return {
        Contents: [...objects.keys()]
          .filter((key) => key.startsWith(Prefix))
          .map((Key) => ({ Key })),
      }
    }
    if (command instanceof HeadObjectCommand) {
      if (objects.has(Key)) return objects.get(Key)
      throw Object.assign(new Error('Not found'), {
        $metadata: { httpStatusCode: 404 },
      })
    }
    if (command instanceof PutObjectCommand) {
      objects.set(Key, {
        Metadata: command.input.Metadata,
        Body: command.input.Body,
      })
      return {}
    }
    if (command instanceof DeleteObjectCommand) {
      objects.delete(Key)
      return {}
    }
    throw new Error(`Unexpected storage operation: ${command.constructor.name}`)
  })
  return { client: { send } as unknown as S3Client, objects }
}

describe('GPS preservation when rebuilding stored indexes', () => {
  test('queue reindex and JPEG conversion preserve GPS in the WebP and saved index', async () => {
    const foundKey = 'queue/test-tag-99--found--abc123.jpg'
    const mysteryKey = 'queue/test-tag-100--mystery--abc123.webp'
    const { client, objects } = storage({
      [foundKey]: { Metadata: { data: getFoundMetadata(foundTag) } },
      [mysteryKey]: { Metadata: { data: getMysteryMetadata(mysteryTag) } },
    })
    const fetchMock = vi.fn(async () => new Response(new Uint8Array([1, 2, 3])))
    vi.stubGlobal('fetch', fetchMock)

    const response = await getQueue(client, {
      game: 'test',
      region: 'nyc3',
      reindex: true,
      resize: true,
      host: 'https://example.org',
    })

    expect(response.success).toBe(true)
    expect(response.data).toHaveLength(1)
    expect(response.data[0].gps).toEqual(gps)
    expect(fetchMock).toHaveBeenCalled()
    const converted = objects.get(foundKey.replace('.jpg', '.webp'))
    expect(getTagMetadata(converted?.Metadata?.data).gps).toEqual(gps)
    expect(objects.has(foundKey)).toBe(false)
    const index = JSON.parse(objects.get('queue/index.json')?.Body as string)
    expect(index[0].gps).toEqual(gps)
  })

  test('main reindex preserves GPS in the rebuilt and saved tag', async () => {
    const { client, objects } = storage({
      'main/test-tag-99--found.webp': {
        Metadata: { data: getFoundMetadata(foundTag) },
      },
      'main/test-tag-99--mystery.webp': {
        Metadata: {
          data: getMysteryMetadata({ ...mysteryTag, tagnumber: 99 }),
        },
      },
    })
    const tags = await loadIndex(
      client,
      'test-biketag',
      'main',
      'nyc3',
      false,
      true
    )
    expect(tags).toHaveLength(1)
    expect(tags[0].gps).toEqual(gps)
    const index = JSON.parse(objects.get('main/index.json')?.Body as string)
    expect(index[0].gps).toEqual(gps)
  })
})
