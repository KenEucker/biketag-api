import { SanityClient } from '@sanity/client';
import { Payload, BikeTagApiResponse } from '../common/types';

export interface UpdateTagPayload
  extends Pick<Payload, 'title' | 'description'> {
  slug: string;
}

export async function updateTag(
  client: SanityClient,
  payload: UpdateTagPayload | UpdateTagPayload[]
): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  return ({} as BikeTagApiResponse<boolean>)  
}
