import type { ImgurClient } from 'imgur'
import { sortTags } from '../common/methods'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getBikeTagNumberFromImage,
  getGroupedImagesByTagnumber,
  getGroupedTagsByTagnumber,
} from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getTags(
  client: ImgurClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  let albumImages: any[] = []
  let error
  let success = true

  //
  if (payload.tagnumbers?.length) {
    const albumInfo = await (client.getAlbum(payload.hash) as any)
    albumImages = albumInfo.data?.images?.filter(
      (image: any) =>
        payload.tagnumbers.indexOf(getBikeTagNumberFromImage(image)) !== -1
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
    const albumInfo = await client.getAlbum(payload.hash)
    if (albumInfo.success) {
      albumImages = albumInfo.data.images ?? []
    } else {
      success = false
      error = albumInfo.data
    }
  }

  const images = getGroupedImagesByTagnumber(albumImages)
  const tags = getGroupedTagsByTagnumber(images, payload)

  return {
    data: sortTags(tags, payload.sort, payload.limit),
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
