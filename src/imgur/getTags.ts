import type { ImgurClient } from 'imgur'
import { getGameAlbumFromCache, sortTags } from '../common/methods'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getBikeTagNumberFromImage,
  getGroupedImagesByTagnumber,
  getGroupedTagsByTagnumber,
} from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import TinyCache from 'tinycache'

export async function getTags(
  client: ImgurClient,
  payload: getTagsPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag[]>> {
  let albumImages: any[] = []
  let error
  let success = true

  if (payload.slugs?.length && !payload.tagnumbers?.length) {
    const imageResponses = await Promise.all(
      payload.slugs.map((slug) => client.getImage(slug))
    )
    const failedImageIndex = imageResponses.findIndex(
      (imageResponse) => !imageResponse.success
    )

    success = failedImageIndex === -1
    error =
      failedImageIndex === -1
        ? undefined
        : `failed to fetch image ${payload.slugs[failedImageIndex]}`
    albumImages = imageResponses.flatMap((imageResponse) =>
      imageResponse.success && imageResponse.data ? [imageResponse.data] : []
    )
  } else {
    const albumInfo = await getGameAlbumFromCache(
      payload.hash,
      cache,
      () => client.getAlbum(payload.hash),
      payload.cached
    )

    if (payload.tagnumbers?.length) {
      albumImages = albumInfo.data?.images?.filter(
        (image: any) =>
          payload.tagnumbers.indexOf(
            getBikeTagNumberFromImage(image, cache)
          ) !== -1
      )
    } else {
      if (albumInfo.success) {
        albumImages = albumInfo.data?.images ?? []
      } else {
        success = false
        error = albumInfo.data
      }
    }
  }

  const images = getGroupedImagesByTagnumber(albumImages, cache)
  const tags = getGroupedTagsByTagnumber(images, payload)

  return {
    data: sortTags(tags, payload.sort, payload.limit, payload.time),
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
