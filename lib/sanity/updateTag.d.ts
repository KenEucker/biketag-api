import { SanityClient } from '@sanity/client';
import { Payload, BikeTagApiResponse } from '../common/types';
export interface UpdateTagPayload extends Pick<Payload, 'title' | 'description'> {
    slug: string;
}
export declare function updateTag(client: SanityClient): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]>;
