import { describe, expect, test } from 'vitest'
import { getPlayerGroupingKey } from '../../../src/common/getters'
import {
  getGroupedTagsByPlayer,
  parseTagnumberFromQueueKey,
} from '../../../src/aws/helpers'
import { S3ImageMeta } from '../../../src/common/types'

describe('getPlayerGroupingKey', () => {
  test('groups by playerId from metadata even when display names differ', () => {
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
      title: `[${playerId}]`,
      data: {
        tagnumber: 99,
        playerId,
        foundPlayer: 'alice.bsky.social',
      },
    }

    expect(getPlayerGroupingKey(mystery)).toBe(playerId)
    expect(getPlayerGroupingKey(found)).toBe(playerId)
    expect(getPlayerGroupingKey(mystery)).toBe(getPlayerGroupingKey(found))
  })

  test('falls back to metadata player name when description is empty', () => {
    const image: S3ImageMeta = {
      description: '',
      data: { tagnumber: 100, mysteryPlayer: 'Bob' },
    }

    expect(getPlayerGroupingKey(image)).toBe('Bob')
  })
})

describe('getGroupedTagsByPlayer', () => {
  test('pairs mystery and found images for the same playerId', () => {
    const playerId = 'did:plc:shared-player'
    const groupedImages: S3ImageMeta[][] = []

    groupedImages[99] = [
      {
        description:
          '#99 proof found at (Park) by FinderName on [1/1/24@09:00:00]',
        title: `[${playerId}]`,
        url: 'https://example.com/found.webp',
        data: {
          tagnumber: 99,
          playerId,
          foundPlayer: 'FinderName',
          foundTime: 1,
          foundLocation: 'Park',
        },
      },
    ]

    groupedImages[100] = [
      {
        description:
          '#100 tag (hint: tree) by Different Display Name on [1/1/24@10:00:00]',
        title: `[${playerId}]`,
        url: 'https://example.com/mystery.webp',
        data: {
          tagnumber: 100,
          playerId,
          mysteryPlayer: 'Different Display Name',
          mysteryTime: 2,
          hint: 'tree',
        },
      },
    ]

    const tags = getGroupedTagsByPlayer(groupedImages, { game: 'test' })

    expect(tags).toHaveLength(1)
    expect(tags[0].playerId).toBe(playerId)
    expect(tags[0].mysteryImageUrl).toContain('mystery')
    expect(tags[0].foundImageUrl).toContain('found')
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
