import { BikeTagClient } from '../client';
import { Payload, BikeTagApiResponse, TagData } from '../common/types';
export declare function queueTagImage(client: BikeTagClient, payload: string | string[] | Payload | Payload[]): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]>;
