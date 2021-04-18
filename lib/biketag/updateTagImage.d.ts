import { BikeTagClient } from '../client';
import { Payload, BikeTagApiResponse } from '../common/types';
export interface UpdateTagImagePayload extends Pick<Payload, 'title' | 'description'> {
    slug: string;
}
export declare function updateTagImage(client: BikeTagClient, payload: UpdateTagImagePayload): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]>;
