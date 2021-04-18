import { BikeTagClient } from '../client';
import { BikeTagApiResponse } from '../common/types';
export declare function deleteTag(client: BikeTagClient, imageHash: string): Promise<BikeTagApiResponse<boolean>>;
