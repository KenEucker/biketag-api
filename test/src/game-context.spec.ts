import { describe, expect, test, vi } from 'vitest'
import { BikeTagClient } from '../../src/client'
import { AvailableApis } from '../../src/common/enums'
import { getGameImageSource } from '../../src/common/methods'
import { getGame } from '../../src/biketag/getGame'
import type { Game } from '../../src/common/schema'

const game = (overrides: Partial<Game> = {}): Game =>
  ({
    name: 'test',
    slug: 'test',
    settings: {},
    ...overrides,
  }) as Game

class TestBikeTagClient extends BikeTagClient {
  getDefaultDataSource(method: string) {
    return this.getMostAvailableClient(method)
  }
}

describe('game context', () => {
  test('resolves AWS when AWS is enabled and a region is configured', () => {
    expect(
      getGameImageSource(
        game({ awsRegion: 'nyc3', settings: { 'data::aws': 'true' } })
      )
    ).toBe(AvailableApis.aws)
  })

  test('resolves Imgur when a main album hash is configured', () => {
    expect(getGameImageSource(game({ mainhash: 'album-hash' }))).toBe(
      AvailableApis.imgur
    )
  })

  test('prefers AWS when both AWS and an Imgur hash are configured', () => {
    expect(
      getGameImageSource(
        game({
          awsRegion: 'nyc3',
          mainhash: 'album-hash',
          settings: { 'data::aws': 'true' },
        })
      )
    ).toBe(AvailableApis.aws)
  })

  test('does not infer a provider when game metadata does not identify one', () => {
    expect(getGameImageSource(game())).toBeUndefined()
  })

  test('stores the game context and uses the BikeTag API when storage credentials are absent', () => {
    const client = new TestBikeTagClient({ game: 'test' })
    const context = client.setGameContext(
      game({ awsRegion: 'nyc3', settings: { 'data::aws': 'true' } })
    )

    expect(client.gameContext).toEqual(context)
    expect(context.imageSource).toBe(AvailableApis.aws)
    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
  })

  test('uses the configured AWS adapter when AWS credentials are available', () => {
    const client = new TestBikeTagClient({
      game: 'test',
      accessKeyId: 'aws-key',
      secretAccessKey: 'aws-secret',
      region: 'nyc3',
    })
    client.setGameContext(
      game({ awsRegion: 'nyc3', settings: { 'data::aws': 'true' } })
    )

    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.aws)
  })

  test('uses the BikeTag API when an Imgur game has no Imgur credentials', () => {
    const client = new TestBikeTagClient({ game: 'test' })
    client.setGameContext(game({ mainhash: 'album-hash' }))

    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
  })

  test('uses Imgur when an Imgur game has Imgur credentials', () => {
    const client = new TestBikeTagClient({
      game: 'test',
      clientId: 'imgur-client',
      clientSecret: 'imgur-secret',
    })
    client.setGameContext(game({ mainhash: 'album-hash' }))

    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.imgur)
  })

  test('does not use the storage provider to retrieve game metadata', () => {
    const client = new TestBikeTagClient({ game: 'test' })
    client.setGameContext(
      game({ awsRegion: 'nyc3', settings: { 'data::aws': 'true' } })
    )

    expect(client.getDefaultDataSource('getGame')).toBe(AvailableApis.biketag)
  })
})

describe('BikeTag getGame()', () => {
  test('treats an HTTP 200 response as successful', async () => {
    const client = {
      cachedRequest: vi.fn().mockResolvedValue({
        status: 200,
        statusText: 'OK',
        data: [],
      }),
      request: vi.fn(),
    }

    const response = await getGame(client as any, {
      game: 'test',
      cached: true,
    } as any)

    expect(response.success).toBe(true)
    expect(response.status).toBe(200)
  })

  test('preserves a non-200 response status as a failure', async () => {
    const client = {
      cachedRequest: vi.fn().mockResolvedValue({
        status: 404,
        statusText: 'Not Found',
        data: null,
      }),
      request: vi.fn(),
    }

    const response = await getGame(client as any, {
      game: 'test',
      cached: true,
    } as any)

    expect(response.success).toBe(false)
    expect(response.status).toBe(404)
    expect(response.error).toBe('Not Found')
  })
})
