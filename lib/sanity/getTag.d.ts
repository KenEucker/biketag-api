import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, TagData } from '../common/types';
export declare function getTag(client: SanityClient, options: any): Promise<BikeTagApiResponse<TagData>>;
