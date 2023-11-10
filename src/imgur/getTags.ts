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

  const albumInfo = await getGameAlbumFromCache(
    payload.hash,
    payload.cached ? cache : undefined,
    () => client.getAlbum(payload.hash)
  )

  if (payload.tagnumbers?.length) {
    albumImages = albumInfo.data?.images?.filter(
      (image: any) =>
        payload.tagnumbers.indexOf(getBikeTagNumberFromImage(image, cache)) !==
        -1
    )
  } else if (payload.slugs?.length) {
    const imagePromises: Promise<Tag>[] = []
    let success = true
    const addToArray = (image: any) => {
      if (image?.data) albumImages.push(image.data)
      success = image.success && success
    }
    payload.slugs.forEach(async (slug: string) =>
      imagePromises.push(client.getImage(slug).then(addToArray) as any)
    )

    albumImages = await Promise.all(imagePromises)
  } else {
    if (albumInfo.success) {
      albumImages = albumInfo.data?.images ?? []
    } else {
      success = false
      error = albumInfo.data
    }
  }

  const images = getGroupedImagesByTagnumber(albumImages, cache)
  const tags = getGroupedTagsByTagnumber(images, payload)

  return {
    data: sortTags(tags, payload.sort, payload.limit),
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
