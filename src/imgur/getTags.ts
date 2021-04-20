// @ts-ignore
import { ImgurClient } from './imgurClient'
import { BikeTagApiResponse, TagData } from '../common/types'
import { getBikeTagNumberFromImage, getBikeTagFromImageSet } from './helpers'

export async function getTags(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData[]>> {
  /// TODO: Get the tag image hash for Reddit from the tagnumber provided
  /// TODO: Get the images associated with the tagnumber
  /// TODO: Implement data translation for Imgur image to TagData
  /// TODO: Wrap the response in a BikeTagApiResponse

  if (options.tagnumbers?.length && options.hash) {
    const albumInfo = await (client.getAlbum(options.hash) as any)
    const imagesData: TagData[] = albumInfo.data?.images?.filter(
      (image: any) =>
        options.tagnumbers.indexOf(getBikeTagNumberFromImage(image)) !== -1
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
      const tagData = getBikeTagFromImageSet(images[0], images[1], options)
      tagsData.push(tagData)
    })

    return {
      data: tagsData,
      success: true,
      source: 'imgur',
      status: 200,
    } as BikeTagApiResponse<TagData[]>
  }

  if (options.slugs?.length) {
    const tagsArray: TagData[] = []
    const imagePromises: Promise<TagData>[] = []
    let success = true
    const addToArray = (image: any) => {
      if (image?.data) tagsArray.push(image.data)
      success = image.success && success
    }
    options.slugs.forEach(async (slug: string) =>
      imagePromises.push(client.getImage(slug).then(addToArray))
    )

    return Promise.all(imagePromises).then((tags: TagData[]) => {
      return {
        data: tags,
        success,
        source: 'imgur',
        status: 200,
      } as BikeTagApiResponse<TagData[]>
    })
  }

  if (options.hash) {
    return (await (client.getAlbum(options.hash) as any)) as BikeTagApiResponse<
      TagData[]
    >
  }

  throw new Error('no method of retrieving tags provided')
}
