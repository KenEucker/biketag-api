import { SanityClient } from '@sanity/client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTag(
  client: SanityClient,
  imageHash: string
): Promise<BikeTagApiResponse<TagData>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client.request(url).json()) as BikeTagApiResponse<TagData>;
}
