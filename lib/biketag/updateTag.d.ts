import { BikeTagClient } from '../client';
import { Payload, BikeTagApiResponse } from '../common/types';
export interface UpdateTagPayload extends Pick<Payload, 'title' | 'description'> {
    slug: string;
}
export declare function updateTag(client: BikeTagClient, payload: UpdateTagPayload): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]>;
