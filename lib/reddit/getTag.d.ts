import RedditClient from 'snoowrap';
import { BikeTagApiResponse, TagData } from '../common/types';
import { getTagPayload } from '../common/payloads';
export declare function getTag(client: RedditClient, options: getTagPayload): Promise<BikeTagApiResponse<TagData | undefined>>;
