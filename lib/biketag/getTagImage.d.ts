import { BikeTagClient } from '../client';
import { BikeTagApiResponse, TagData } from '../common/types';
export declare function getTagImage(client: BikeTagClient, imageHash: string): Promise<BikeTagApiResponse<TagData>>;
