import type { ImgurClient } from 'imgur';
import { BikeTagApiResponse, TagData } from '../common/types';
export declare function getTag(client: ImgurClient, options: any): Promise<BikeTagApiResponse<TagData>>;
