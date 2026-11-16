import { describe, expect, test, vi } from 'vitest'
import { BikeTagClient } from '../../src/client'
import { AvailableApis } from '../../src/common/enums'
import {
  getGameImageSource,
  isSanityCredentials,
  isSanityApiReady,
  isImgurCredentials,
  isAWSCredentials,
  isAWSApiReady,
} from '../../src/common/methods'
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

  getAdapterState() {
    return {
      sanity: !!this.sanityClient,
      imgur: !!this.imgurClient,
      aws: !!this.awsClient,
    }
  }
}

describe('game context', () => {
  test('configures the canonical slug while preserving display metadata', () => {
    const client = new TestBikeTagClient({ game: 'portland' })
    client.setGameContext(game({ name: 'Portland', slug: 'portland' }))
    expect(client.config().biketag.game).toBe('portland')
    expect(client.gameContext?.game.name).toBe('Portland')
  })

  test('passes only the signing payload with the configured game', async () => {
    const client = new TestBikeTagClient({
      game: 'portland',
      host: 'https://portland.biketag.dev/api',
    })
    client.setGameContext(game({ name: 'Portland', slug: 'portland' }))
    const adapter = vi.fn(async (config: any) => ({
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data: 'signed-url',
    }))
    client.fetcher.defaults.adapter = adapter
    const response = await client.fetchSignedUrl({
      key: 'queue/portland-tag-1393--found--c3328c.jpg',
      bucket: 'portland-biketag',
      p_id: 'test-player',
      contentType: 'image/jpeg',
    }, { source: 'biketag' } as any)
    expect(response.success).toBe(true)
    const body = JSON.parse(adapter.mock.calls[0][0].data)
    expect(body.game).toBe('portland')
    expect(body).not.toHaveProperty('source')
    expect(body).not.toHaveProperty('cached')
  })

  test('does not initialize adapters from empty environment credentials', () => {
    const client = new TestBikeTagClient({
      game: 'portland',
      host: 'http://portland.localhost:7200/.netlify/functions',
      cached: true,
      verbose: true,
      clientKey: null,
      clientToken: null,
      aws: { accessKeyId: null, secretAccessKey: null },
      imgur: { clientId: null, rapidApiKey: null },
      sanity: { projectId: '', dataset: '' },
    } as any)

    expect(client.getAdapterState()).toEqual({
      sanity: false,
      imgur: false,
      aws: false,
    })
    client.setGameContext(game({
      name: 'portland',
      awsRegion: 'nyc3',
      settings: { 'data::aws': 'true' },
    }))
    expect(client.gameContext?.imageSource).toBe(AvailableApis.aws)
    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
    expect(client.getDefaultDataSource('getGame')).toBe(AvailableApis.biketag)
    expect(client.getAdapterState()).toEqual({
      sanity: false,
      imgur: false,
      aws: false,
    })
  })

  test('retains credentials across additive configuration and reinitialization', () => {
    const client = new TestBikeTagClient({
      game: 'portland',
      aws: { accessKeyId: 'aws-key', secretAccessKey: 'aws-secret', region: 'nyc3' },
    } as any)
    expect(client.getAdapterState().aws).toBe(true)

    client.config({ aws: { region: 'sfo3' } } as any, false, true)
    expect(client.getAdapterState().aws).toBe(true)
    expect((client.config() as any).aws.accessKeyId).toBe('aws-key')
    expect((client.config() as any).aws.region).toBe('sfo3')

    client.config({ sanity: { projectId: '', dataset: '' } } as any, false, true)
    expect(client.getAdapterState()).toEqual({
      sanity: false,
      imgur: false,
      aws: true,
    })
  })

  test('does not select Sanity for tags when Sanity is configured but AWS is unavailable', () => {
    const client = new TestBikeTagClient({
      game: 'portland',
      sanity: { projectId: 'project', dataset: 'production' },
    } as any)
    client.setGameContext(game({
      name: 'portland',
      awsRegion: 'nyc3',
      settings: { 'data::aws': 'true' },
    }))
    expect(client.getDefaultDataSource('getGame')).toBe(AvailableApis.sanity)
    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
  })

  test('preserves explicitly requested tag source', () => {
    const client = new TestBikeTagClient({ game: 'portland' })
    expect(client.options({ game: 'portland', source: AvailableApis.biketag }).source)
      .toBe(AvailableApis.biketag)
  })

  test('rejects empty or null provider credentials', () => {
    expect(isSanityCredentials({ projectId: '', dataset: '' } as any)).toBe(false)
    expect(isSanityApiReady({ projectId: '', dataset: '', apiVersion: '2021-10-21' } as any)).toBe(0)
    expect(isImgurCredentials({ clientId: null, clientSecret: null } as any)).toBe(false)
    expect(isAWSCredentials({ accessKeyId: null } as any)).toBe(false)
    expect(isAWSApiReady({ accessKeyId: null, secretAccessKey: null } as any)).toBe(0)
  })

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

  test('prefers Sanity for game metadata when Sanity credentials exist', () => {
    const client = new TestBikeTagClient({
      game: 'test',
      sanity: { projectId: 'project', dataset: 'production' },
    } as any)
    expect(client.getDefaultDataSource('getGame')).toBe(AvailableApis.sanity)
  })

  test('does not use unrelated provider credentials for an AWS game', () => {
    const client = new TestBikeTagClient({
      game: 'test',
      clientId: 'imgur-client',
      clientSecret: 'imgur-secret',
    })
    client.setGameContext(game({ awsRegion: 'nyc3', settings: { 'data::aws': 'true' } }))
    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
  })

  test('uses BikeTag API for reads when no game context has been loaded', () => {
    const client = new TestBikeTagClient({ game: 'test' })
    expect(client.getDefaultDataSource('getTags')).toBe(AvailableApis.biketag)
    expect(client.getDefaultDataSource('getGame')).toBe(AvailableApis.biketag)
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

describe('BikeTag HTTP authorization', () => {
  test.each(['request', 'cachedRequest'] as const)(
    '%s sends credential-free requests without an Authorization header',
    async (method) => {
      const client = new BikeTagClient({
        game: 'portland',
        host: 'https://biketag.org/api',
        cached: method === 'cachedRequest',
        clientKey: null,
        clientToken: null,
      } as any)
      const adapter = vi.fn(async (config: any) => ({
        data: { ok: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }))

      const response = await client[method]({
        url: 'https://biketag.org/api/games/portland',
        method: 'GET',
        adapter,
      })

      expect(response.status).toBe(200)
      expect(adapter).toHaveBeenCalledOnce()
      const requestConfig = adapter.mock.calls[0][0]
      expect(requestConfig.headers.get('Authorization')).toBeUndefined()
    }
  )

  test('preserves the Authorization header for a configured valid JWT', async () => {
    const token = [
      'eyJhbGciOiJub25lIn0',
      'eyJleHAiOjQxMDI0NDQ4MDB9',
      'signature',
    ].join('.')
    const client = new BikeTagClient({
      game: 'portland',
      clientToken: token,
    } as any)
    const adapter = vi.fn(async (config: any) => ({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }))

    await client.request({ url: 'https://biketag.org/api/games/portland', adapter })
    expect(adapter).toHaveBeenCalledOnce()
    expect(adapter.mock.calls[0][0].headers.get('Authorization')).toBe(`JWT ${token}`)
  })
})

