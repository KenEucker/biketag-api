import type { ImgurClient } from 'imgur'
import {
  AvailableApis,
  BikeTagApiResponse,
  ImgurImage,
  TagData,
} from '../common/types'
const getBikeTagNumberFromImage = (a: any): any => {
  return { a }
}
const getBikeTagFromImgurImageSet = (a: any, b: any, c: any): any => {
  return { a, b, c }
}
const sortImgurImagesByTagNumber = (a: any): any => {
  return { a }
}

export async function getTag(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData>> {
  if (!options.hash) {
    throw new Error('no Imgur album hash set')
  }

  const albumInfo = await (client.getAlbum(options.hash) as any)
  let imagesData: ImgurImage[] = []

  if (options.tagnumber) {
    imagesData = albumInfo.data?.images?.filter(
      (image: any) => getBikeTagNumberFromImage(image) == options.tagnumber
    )
  } else if (
    !options.tagnumber &&
    options.slug === 'latest' &&
    albumInfo.data?.images?.length > 1
  ) {
    const sortedImages = sortImgurImagesByTagNumber(albumInfo.data.images)
    imagesData.push(sortedImages[0])

    if (sortedImages[1]) {
      const firstImageNumber = getBikeTagNumberFromImage(sortedImages[0])
      const secondImageNumber = getBikeTagNumberFromImage(sortedImages[1])
      if (firstImageNumber === secondImageNumber) {
        imagesData.push(sortedImages[1])
      }
    }
  }

  const groupedImages: any[] = []
  imagesData.forEach((image: any) => {
    const tagnumber = getBikeTagNumberFromImage(image)
    groupedImages[tagnumber] = groupedImages[tagnumber]
      ? groupedImages[tagnumber]
      : []
    groupedImages[tagnumber].push(image)
  })

  const tagsData: TagData[] = []
  groupedImages.forEach((images) => {
    tagsData.push(getBikeTagFromImgurImageSet(images[0], images[1], options))
  })

  return {
    data: tagsData[0],
    success: !!tagsData.length,
    source: AvailableApis[AvailableApis.imgur],
    status: 200,
  } as BikeTagApiResponse<TagData>
}
