import { describe, expect, test } from 'vitest'
import { getBikeTagFromS3ImageSet } from '../../../src/common/getters'
import {
  getGroupedTagsByPlayer,
  getQueueImageGroupKey,
  parseTagnumberFromQueueKey,
} from '../../../src/aws/helpers'
import { S3ImageMeta } from '../../../src/common/types'

describe('getQueueImageGroupKey', () => {
  test('uses playerId for mystery images and foundPlayer for proof images', () => {
    const playerId = 'did:plc:abc123'

    expect(
      getQueueImageGroupKey({
        description: '#100 tag (hint: tree) by Alice on [1/1/24@10:00:00]',
        data: {
          tagnumber: 100,
          playerId,
          mysteryPlayer: 'Alice',
          mysteryTime: 1,
          hint: 'tree',
        },
      })
    ).toBe('Alice')

    expect(
      getQueueImageGroupKey({
        description:
          '#99 proof found at (Park) by alice.bsky.social on [1/1/24@09:00:00]',
        data: {
          tagnumber: 99,
          foundPlayer: 'alice.bsky.social',
          foundTime: 1,
          foundLocation: 'Park',
        },
      })
    ).toBe('alice.bsky.social')
  })
})

describe('getGroupedTagsByPlayer', () => {
  test('pairs mystery and found images when submitter names match', () => {
    const playerId = 'did:plc:shared-player'
    const submitter = 'Ken Eucker'
    const groupedImages: S3ImageMeta[][] = []

    groupedImages[99] = [
      {
        description: `#99 proof found at (Park) by ${submitter} on [1/1/24@09:00:00]`,
        url: 'https://example.com/found.webp',
        data: {
          tagnumber: 99,
          foundPlayer: submitter,
          foundTime: 1,
          foundLocation: 'Park',
        },
      },
    ]

    groupedImages[100] = [
      {
        description: `#100 tag (hint: tree) by ${submitter} on [1/1/24@10:00:00]`,
        title: `[${playerId}]`,
        url: 'https://example.com/mystery.webp',
        data: {
          tagnumber: 100,
          playerId,
          mysteryPlayer: submitter,
          mysteryTime: 2,
          hint: 'tree',
        },
      },
    ]

    const tags = getGroupedTagsByPlayer(groupedImages, { game: 'test' })

    expect(tags).toHaveLength(1)
    expect(tags[0].playerId).toBe(playerId)
    expect(tags[0].mysteryPlayer).toBe(submitter)
    expect(tags[0].foundPlayer).toBe(submitter)
  })

  test('pairs mystery and found images when playerId links different display names', () => {
    const playerId = 'did:plc:shared-player'
    const groupedImages: S3ImageMeta[][] = []

    groupedImages[99] = [
      {
        url: 'https://example.com/found.webp',
        data: {
          tagnumber: 99,
          playerId,
          foundPlayer: 'alice.bsky.social',
          foundTime: 1,
          foundLocation: 'Park',
        },
      },
    ]

    groupedImages[100] = [
      {
        url: 'https://example.com/mystery.webp',
        data: {
          tagnumber: 100,
          playerId,
          mysteryPlayer: 'Alice',
          mysteryTime: 2,
          hint: 'tree',
        },
      },
    ]

    const tags = getGroupedTagsByPlayer(groupedImages, { game: 'test' })

    expect(tags).toHaveLength(1)
    expect(tags[0].playerId).toBe(playerId)
    expect(tags[0].mysteryPlayer).toBe('Alice')
    expect(tags[0].foundPlayer).toBe('alice.bsky.social')
  })
})

describe('getBikeTagFromS3ImageSet', () => {
  test('reads playerId from found-only image metadata', () => {
    const playerId = 'did:plc:mystery-player'

    const tag = getBikeTagFromS3ImageSet(undefined, {
      url: 'https://example.com/found.webp',
      data: {
        tagnumber: 99,
        playerId,
        foundPlayer: 'Finder',
        foundTime: 1,
        foundLocation: 'Park',
      },
    })

    expect(tag.playerId).toBe(playerId)
    expect(tag.foundPlayer).toBe('Finder')
  })

  test('prefers mystery playerId when both images are present', () => {
    const mysteryPlayerId = 'did:plc:mystery'
    const legacyFoundPlayerId = 'did:plc:legacy-copy'

    const tag = getBikeTagFromS3ImageSet(
      {
        url: 'https://example.com/mystery.webp',
        data: {
          tagnumber: 100,
          playerId: mysteryPlayerId,
          mysteryPlayer: 'Mystery Host',
          mysteryTime: 2,
          hint: 'tree',
        },
      },
      {
        url: 'https://example.com/found.webp',
        data: {
          tagnumber: 99,
          playerId: legacyFoundPlayerId,
          foundPlayer: 'Finder',
          foundTime: 1,
          foundLocation: 'Park',
        },
      },
      { game: 'test' }
    )

    expect(tag.playerId).toBe(mysteryPlayerId)
  })
})

describe('parseTagnumberFromQueueKey', () => {
  test('extracts tagnumber from queue object keys', () => {
    expect(
      parseTagnumberFromQueueKey('queue/portland-tag-100--mystery--a1b2c3.webp')
    ).toBe(100)
    expect(
      parseTagnumberFromQueueKey('queue/portland-tag-99--found--d4e5f6.webp')
    ).toBe(99)
  })
})
