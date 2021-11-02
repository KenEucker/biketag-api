import type { ImgurClient } from 'imgur'
import { BikeTagApiResponse, TagData } from '../common/types'
import {
  getBikeTagNumberFromImage,
  getBikeTagFromImgurImageSet,
} from './helpers'

export async function getTag(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData>> {
  if (!options.hash) {
    throw new Error('no Imgur album hash set')
  }

  const albumInfo = await (client.getAlbum(options.hash) as any)
  const imagesData: TagData[] = albumInfo.data?.images?.filter(
    (image: any) => getBikeTagNumberFromImage(image) == options.tagnumber
  )

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
    success: true,
    source: 'imgur',
    status: 200,
  } as BikeTagApiResponse<TagData>
}
