import type { ImgurClient } from 'imanagur'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getBikeTagFromImgurImageSet,
  getBikeTagNumberFromImage,
} from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'

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
  let highestTagnumber = 0

  const getGroupedImages = (ungroupedImages = []) => {
    const groupedImages: any[] = []

    ungroupedImages.forEach((image: any) => {
      const tagnumber = getBikeTagNumberFromImage(image)
      highestTagnumber =
        tagnumber > highestTagnumber ? tagnumber : highestTagnumber

      groupedImages[tagnumber] = groupedImages[tagnumber]
        ? groupedImages[tagnumber]
        : []
      groupedImages[tagnumber].push(image)
    })

    return groupedImages
  }

  const albumInfo = await client.getAlbum(payload.queuehash)
  const images = getGroupedImages(albumInfo?.data?.images)
  let queuedTags: Tag[] = []

  if (images.length) {
    queuedTags = images[highestTagnumber].reduce((o, i) => {
      o.push(getBikeTagFromImgurImageSet(undefined, i, { game: payload.game }))
      return o
    }, [])
  }
  return {
    data: queuedTags,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
