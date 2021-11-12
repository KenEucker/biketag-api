import type { ImgurClient } from 'imgur'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import {
  getBikeTagNumberFromImage,
  getBikeTagFromImgurImageSet,
} from './helpers'

export async function getTags(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData[]>> {
  const tagsData: TagData[] = []
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

  if (options.tagnumbers?.length && options.hash) {
    const albumInfo = await (client.getAlbum(options.hash) as any)
    const imagesData: TagData[] = albumInfo.data?.images?.filter(
      (image: any) =>
        options.tagnumbers.indexOf(getBikeTagNumberFromImage(image)) !== -1
    )
    images = getGroupedImages(imagesData)
  } else if (options.slugs?.length) {
    const imagesData: TagData[] = []
    const imagePromises: Promise<TagData>[] = []
    let success = true
    const addToArray = (image: any) => {
      if (image?.data) imagesData.push(image.data)
      success = image.success && success
    }
    options.slugs.forEach(async (slug: string) =>
      imagePromises.push(client.getImage(slug).then(addToArray) as any)
    )

    await Promise.all(imagePromises).then((allImages: any[]) => {
      images = getGroupedImages(allImages)
    })
  } else if (options.hash) {
    const albumInfo = await client.getAlbum(options.hash)
    const albumImages = albumInfo?.data?.images || []

    images = getGroupedImages(albumImages)
  }

  images.forEach((images) => {
    const tagData = getBikeTagFromImgurImageSet(images[0], images[1], options)
    tagsData.push(tagData)
  })

  return {
    data: tagsData,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: 200,
  }
}
