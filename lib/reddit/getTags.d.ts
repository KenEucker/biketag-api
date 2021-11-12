import RedditClient from 'snoowrap';
import { BikeTagApiResponse, TagData } from '../common/types';
import { getTagsPayload } from '../common/payloads';
export declare function getTags(client: RedditClient, options: getTagsPayload): Promise<BikeTagApiResponse<TagData[]>>;
