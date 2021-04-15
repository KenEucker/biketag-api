import { BikeTagClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { BikeTagApiResponse } from '../common/types';

export async function deleteTag(
  client: BikeTagClient,
  imageHash: string
): Promise<BikeTagApiResponse<boolean>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return ((await client.request({ url, method: 'DELETE' })).data as unknown) as BikeTagApiResponse<boolean>;
}
