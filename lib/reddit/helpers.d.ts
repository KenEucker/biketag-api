import { TagData } from '../common/types';
import { Submission } from 'snoowrap/dist/snoowrap.d';
import ImgurClient from 'imgur';
export declare function getBikeTagsFromRedditPosts(posts: Submission[], imageClient: ImgurClient): Promise<any[]>;
export declare function getBikeTagInformationFromRedditData(redditPostData: any): Promise<TagData>;
