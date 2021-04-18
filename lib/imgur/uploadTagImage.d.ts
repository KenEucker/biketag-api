import { Payload, BikeTagApiResponse, TagData } from '../common/types';
export declare function uploadTagImage(payload: string | string[] | Payload | Payload[]): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]>;
