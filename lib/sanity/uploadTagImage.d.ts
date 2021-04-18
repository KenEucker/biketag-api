import { SanityClient } from '@sanity/client';
import { Payload, BikeTagApiResponse, TagData } from '../common/types';
export declare function uploadTagImage(client: SanityClient, payload: string | string[] | Payload | Payload[]): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]>;
