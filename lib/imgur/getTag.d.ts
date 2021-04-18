import { ImgurClient } from './imgurClient';
import { BikeTagApiResponse, TagData } from '../common/types';
export declare function getTag(client: ImgurClient, options: any): Promise<BikeTagApiResponse<TagData>>;
