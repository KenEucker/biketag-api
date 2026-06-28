import { describe, expect, test } from 'vitest'
import {
  getBikeTagFromS3ImageSet,
  getFoundPlayerIdentity,
  getMysteryPlayerIdentity,
  getQueueSubmitterKey,
} from '../../../src/common/getters'
import {
  getGroupedTagsByPlayer,
  parseTagnumberFromQueueKey,
} from '../../../src/aws/helpers'
import { S3ImageMeta } from '../../../src/common/types'

describe('getMysteryPlayerIdentity', () => {
  test('uses playerId for mystery images', () => {
    const playerId = 'did:plc:abc123'

    expect(
      getMysteryPlayerIdentity({
        playerId,
        mysteryPlayer: 'Alice',
      })
    ).toBe(playerId)
  })
})

describe('getFoundPlayerIdentity', () => {
  test('uses foundPlayer and ignores playerId', () => {
    expect(
      getFoundPlayerIdentity({
        playerId: 'did:plc:abc123',
        foundPlayer: 'alice.bsky.social',
      })
    ).toBe('alice.bsky.social')
  })
})

describe('getQueueSubmitterKey', () => {
  test('uses playerId for mystery uploads and foundPlayer for proof uploads', () => {
    const playerId = 'did:plc:abc123'

    const mystery: S3ImageMeta = {
      description: '#100 tag (hint: tree) by Alice on [1/1/24@10:00:00]',
      title: `[${playerId}]`,
      data: {
        tagnumber: 100,
        playerId,
        mysteryPlayer: 'Alice',
      },
    }

    const found: S3ImageMeta = {
      description:
        '#99 proof found at (Park) by alice.bsky.social on [1/1/24@09:00:00]',
      data: {
        tagnumber: 99,
        foundPlayer: 'alice.bsky.social',
        foundTime: 1,
        foundLocation: 'Park',
      },
    }

    expect(getQueueSubmitterKey(mystery)).toBe(playerId)
    expect(getQueueSubmitterKey(found)).toBe('alice.bsky.social')
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
    expect(tags[0].mysteryImageUrl).toContain('mystery')
    expect(tags[0].foundImageUrl).toContain('found')
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
