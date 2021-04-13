import { ImgurClient } from 'imgur';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTag(
  client: ImgurClient,
  imageHash: string
): Promise<BikeTagApiResponse<TagData>> {
  /// TODO: Implement data translation for Imgur image to ImageData and wrap the response in a BikeTagApiResponse
  return client.getImage(imageHash)
}
