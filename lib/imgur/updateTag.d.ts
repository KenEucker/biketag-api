import { ImgurClient } from './imgurClient';
import { Payload, BikeTagApiResponse } from '../common/types';
export interface UpdateTagPayload extends Pick<Payload, 'title' | 'description'> {
    imageHash: string;
}
export declare function updateTag(client: ImgurClient, payload: UpdateTagPayload | UpdateTagPayload[]): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]>;
