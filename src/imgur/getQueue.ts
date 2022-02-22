import type { ImgurClient } from 'imgur'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getGroupedImagesByTagnumber, getGroupedTagsByPlayer } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { sortTags } from '../common/methods'

export async function getQueue(
  client: ImgurClient,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!payload.queuehash) {
    const game = await this.getGame(payload.game)
    if (game.data) {
      payload.queuehash = game.data.queuehash
    }
  }

  const albumInfo = await client.getAlbum(payload.queuehash)
  const images = getGroupedImagesByTagnumber(albumInfo?.data?.images)
  const queuedTags = getGroupedTagsByPlayer(images, payload)
  return {
    data: sortTags(queuedTags, 'relevance'),
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
