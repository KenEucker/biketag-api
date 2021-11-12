import type { ImgurClient } from 'imgur';
import { BikeTagApiResponse, TagData } from '../common/types';
export interface ImgurUploadPayload {
    imageHash: string;
    title: string;
    description: string;
}
export declare type UpdateTagPayload = Partial<TagData> & ImgurUploadPayload;
export declare function getUpdateTagPayloadFromTagData(tagData: UpdateTagPayload, mystery?: boolean): UpdateTagPayload;
export declare function updateTag(client: ImgurClient, payload: UpdateTagPayload | UpdateTagPayload[]): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]>;
