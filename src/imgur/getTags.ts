import type { ImgurClient } from 'imgur'
import { sortTags } from '../common/methods'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getBikeTagNumberFromImage,
  getBikeTagFromImgurImageSet,
} from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getTags(
  client: ImgurClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const tagsData: Tag[] = []
  let images: any[] = []

  const getGroupedImages = (ungroupedImages) => {
    const groupedImages: any[] = []

    ungroupedImages.forEach((image: any) => {
      const tagnumber = getBikeTagNumberFromImage(image)
      groupedImages[tagnumber] = groupedImages[tagnumber]
        ? groupedImages[tagnumber]
        : []
      groupedImages[tagnumber].push(image)
    })

    return groupedImages
  }

  if (payload.tagnumbers?.length && payload.hash) {
    const albumInfo = await (client.getAlbum(payload.hash) as any)
    const imagesData: Tag[] = albumInfo.data?.images?.filter(
      (image: any) =>
        payload.tagnumbers.indexOf(getBikeTagNumberFromImage(image)) !== -1
    )
    images = getGroupedImages(imagesData)
  } else if (payload.slugs?.length) {
    const imagesData: Tag[] = []
    const imagePromises: Promise<Tag>[] = []
    // TempComment
    let success = true
    const addToArray = (image: any) => {
      if (image?.data) imagesData.push(image.data)
      success = image.success && success
    }
    payload.slugs.forEach(async (slug: string) =>
      imagePromises.push(client.getImage(slug).then(addToArray) as any)
    )

    await Promise.all(imagePromises).then((allImages: any[]) => {
      images = getGroupedImages(allImages)
    })
  } else if (payload.hash) {
    const albumInfo = await client.getAlbum(payload.hash)
    const albumImages = albumInfo?.data?.images || []

    images = getGroupedImages(albumImages)
  }

  images.forEach((images) => {
    const tagData = getBikeTagFromImgurImageSet(images[0], images[1], payload)
    tagsData.push(tagData)
  })

  return {
    data: sortTags(tagsData, payload.sort),
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}

