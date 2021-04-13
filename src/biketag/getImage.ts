import { BikeTagClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { BikeTagApiResponse, ImageData } from '../common/types';

export async function getImage(
  client: BikeTagClient,
  imageHash: string
): Promise<BikeTagApiResponse<ImageData>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client.request(url).json()) as BikeTagApiResponse<ImageData>;
}
