import { describe, expect, test, vi } from 'vitest'
import { fetchSignedUrl } from '../../../src/biketag/fetchSignedUrl'

describe('biketag fetchSignedUrl', () => {
  test('sends the lowercase game slug when configured game uses its display name', async () => {
    const request = vi.fn().mockResolvedValue({ status: 200, data: 'signed-url' })
    const response = await fetchSignedUrl(
      { request } as any,
      {
        host: 'https://portland.biketag.dev/api',
        game: 'Portland',
        bucket: 'portland-biketag',
        key: 'queue/portland-tag-1393--found--c3328c.jpg',
        p_id: 'player-id',
        contentType: 'image/jpeg',
      }
    )

    expect(response.success).toBe(true)
    expect(request).toHaveBeenCalledOnce()
    expect(request.mock.calls[0][0].url).toBe('https://portland.biketag.dev/api/token')
    expect(request.mock.calls[0][0].data.game).toBe('portland')
    expect(request.mock.calls[0][0].data.key).toBe('queue/portland-tag-1393--found--c3328c.jpg')
  })

  test('does not change already normalized game slugs', async () => {
    const request = vi.fn().mockResolvedValue({ status: 200, data: 'signed-url' })
    await fetchSignedUrl(
      { request } as any,
      {
        host: 'https://portland.biketag.dev/api',
        game: 'portland',
        bucket: 'portland-biketag',
        key: 'queue/portland-tag-1393--found--c3328c.jpg',
        p_id: 'player-id',
        contentType: 'image/jpeg',
      }
    )
    expect(request.mock.calls[0][0].data.game).toBe('portland')
  })
})
