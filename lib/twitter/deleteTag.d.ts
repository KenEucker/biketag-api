import ImgurClient from 'imgur';
import { deleteTagPayload } from '../common/payloads';
import { BikeTagApiResponse } from '../common/types';
export declare function deleteTag(client: ImgurClient, payload: deleteTagPayload): Promise<BikeTagApiResponse<any>>;
