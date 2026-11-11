import { describe, expect, test, vi } from 'vitest'
import type { ImgurClient } from 'imgur'
import { HttpStatusCode } from '../../../src/common/enums'
import { getTags } from '../../../src/imgur/getTags'

const foundImage = {
  id: 'found-image',
  title: '',
  description: '#10 proof found at (Park) by Finder on [1/1/24@09:00:00]',
  datetime: 1704100000,
  link: 'https://imgur.com/found-image.jpg',
}

const mysteryImage = {
  id: 'mystery-image',
  title: '',
  description: '#10 tag (hint: tree) by Host on [1/1/24@10:00:00]',
  datetime: 1704103600,
  link: 'https://imgur.com/mystery-image.jpg',
}

describe('biketag.images.getTags', () => {
  test('resolves image data for requested slugs without fetching the album', async () => {
    const client = {
      getAlbum: vi.fn(),
      getImage: vi.fn(async (slug: string) => ({
        headers: {},
        status: 200,
        success: true,
        data: slug === 'found-image' ? foundImage : mysteryImage,
      })),
    }

    const response = await getTags(client as unknown as ImgurClient, {
      game: 'test',
      hash: 'album-hash',
      slugs: ['found-image', 'mystery-image'],
    })

    expect(client.getAlbum).not.toHaveBeenCalled()
    expect(client.getImage).toHaveBeenCalledTimes(2)
    expect(response.success).toBe(true)
    expect(response.status).toBe(HttpStatusCode.Ok)
    expect(response.data).toHaveLength(1)
    expect(response.data[0]).toMatchObject({
      tagnumber: 10,
      foundPlayer: 'Finder',
      mysteryPlayer: 'Host',
      foundImageUrl: foundImage.link,
      mysteryImageUrl: mysteryImage.link,
    })
  })

  test('returns a failed response when an image slug cannot be resolved', async () => {
    const client = {
      getAlbum: vi.fn(),
      getImage: vi.fn(async () => ({
        headers: {},
        status: 404,
        success: false,
        data: {} as any,
      })),
    }

    const response = await getTags(client as unknown as ImgurClient, {
      game: 'test',
      slugs: ['missing-image'],
    })

    expect(response.success).toBe(false)
    expect(response.status).toBe(HttpStatusCode.BadRequest)
    expect(response.error).toBe('failed to fetch image missing-image')
    expect(response.data).toEqual([])
  })
})
