import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse } from '../common/types';

export async function deleteTag(
  client: SanityClient,
  slug?: string,
  tagnumber?: number,
): Promise<BikeTagApiResponse<boolean>> {
  return ({}) as BikeTagApiResponse<boolean>;
}
