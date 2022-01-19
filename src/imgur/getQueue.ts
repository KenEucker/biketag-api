import type { ImgurClient } from 'imgur'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getBikeTagFromImgurImageSet,
  getBikeTagNumberFromImage,
  isMysteryImage,
  isFoundImage,
  getPlayerFromText,
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
  const queuedTags: Tag[] = []

  if (images.length) {
    const playerGroupedTags = []

    images[highestTagnumber].forEach((i) => {
      const player = getPlayerFromText(i.description)
      playerGroupedTags[player] = playerGroupedTags[player] ?? []
      playerGroupedTags[player].push(i)
    })
    if (images[highestTagnumber - 1]) {
      images[highestTagnumber - 1].forEach((i) => {
        const player = getPlayerFromText(i.description)
        playerGroupedTags[player] = playerGroupedTags[player] ?? []
        playerGroupedTags[player].push(i)
      })
    }

    Object.keys(playerGroupedTags).forEach((player) => {
      const images = playerGroupedTags[player]
      if (images.length === 1) {
        queuedTags.push(
          getBikeTagFromImgurImageSet(undefined, images[0], payload)
        )
      } else if (images.length === 2) {
        const mysteryImage = isMysteryImage(images[0])
          ? images[0]
          : isMysteryImage(images[1])
          ? images[1]
          : undefined
        const foundImage = isFoundImage(images[1])
          ? images[1]
          : isFoundImage(images[0])
          ? images[0]
          : undefined
        queuedTags.push(
          getBikeTagFromImgurImageSet(mysteryImage, foundImage, payload)
        )
      } else {
        console.log('what do I do now?', images)
      }
    })
  }
  return {
    data: queuedTags,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
