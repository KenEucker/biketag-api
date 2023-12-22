import type { ImgurClient } from 'imgur'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getGroupedImagesByTagnumber, getGroupedTagsByPlayer } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGameAlbumFromCache, sortTags } from '../common/methods'
import TinyCache from 'tinycache'

export async function getQueue(
  client: ImgurClient,
  payload: getQueuePayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!payload.queuehash) {
    const game = await this.getGame(payload.game)
    if (game.data) {
      payload.queuehash = game.data.queuehash
    }
  }
  const albumInfo = await getGameAlbumFromCache(
    payload.queuehash,
    cache,
    () => client.getAlbum(payload.queuehash),
    payload.cached
  )

  const images = getGroupedImagesByTagnumber(albumInfo?.data?.images, cache)
  const queuedTags = getGroupedTagsByPlayer(images, payload)

  return {
    data: sortTags(queuedTags, 'relevance'),
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
