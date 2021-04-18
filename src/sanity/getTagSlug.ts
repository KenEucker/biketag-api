import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTagSlug(
  client: SanityClient,
  game: string,
  tagnumber?: number,
  slug?: string,
): Promise<BikeTagApiResponse<TagData>> {


  return ({}) as BikeTagApiResponse<TagData>;

  
}