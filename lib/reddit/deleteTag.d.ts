import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse } from '../common/types';
export declare function deleteTag(client: SanityClient): Promise<BikeTagApiResponse<boolean>>;
