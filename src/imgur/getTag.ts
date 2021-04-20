// @ts-ignore
import { ImgurClient } from './imgurClient'
import { BikeTagApiResponse, TagData } from '../common/types'
import { getBikeTagNumberFromImage, getBikeTagFromImageSet } from './helpers'

export async function getTag(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData>> {
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
    tagsData.push(getBikeTagFromImageSet(images[0], images[1], options))
  })

  return {
    data: tagsData[0],
    success: true,
    source: 'imgur',
    status: 200,
  } as BikeTagApiResponse<TagData>
}
