import type { ImgurClient } from 'imgur';
import { BikeTagApiResponse, TagData } from '../common/types';
export interface ImgurUploadPayload {
    image: string;
    title?: string;
    description?: string;
    type?: string;
    hash?: string;
    album?: string;
}
export declare type UploadTagImagePayload = Partial<TagData> & ImgurUploadPayload;
export declare function getUploadTagImagePayloadFromTagData(tagData: UploadTagImagePayload, mystery?: boolean): ImgurUploadPayload;
export declare function uploadTagImage(client: ImgurClient, payload: UploadTagImagePayload | UploadTagImagePayload[]): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]>;
