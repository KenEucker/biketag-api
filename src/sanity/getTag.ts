import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTag(
  client: SanityClient,
  slug?: string,
  tagnumber?: number,
  fields?: string[],
  ): Promise<BikeTagApiResponse<TagData>> {


  return ({}) as BikeTagApiResponse<TagData>;

  
}
