// @ts-ignore
import { ImgurClient } from './imgurClient'
import { BikeTagApiResponse, TagData } from '../common/types'

export async function getTag(
  client: ImgurClient,
  options: any
): Promise<BikeTagApiResponse<TagData>> {
  /// TODO: Get the tag image hash for Reddit from the tagnumber provided
  /// TODO: Get the images associated with the tagnumber
  /// TODO: Implement data translation for Imgur image to TagData
  /// TODO: Wrap the response in a BikeTagApiResponse

  return (await (client.getImage(
    options.slug
  ) as any)) as BikeTagApiResponse<TagData>
}
