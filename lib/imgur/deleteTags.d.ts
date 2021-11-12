import ImgurClient from 'imgur';
import { deleteTagsPayload } from '../common/payloads';
import { BikeTagApiResponse } from '../common/types';
export declare function deleteTag(client: ImgurClient, payload: deleteTagsPayload): Promise<BikeTagApiResponse<any>>;
