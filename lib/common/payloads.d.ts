import { Game, RequireAtLeastOne, TagData } from './types';
export declare type getTagsPayload = {
    fields?: string[];
    slugs?: string[];
    subreddit?: string;
    time?: 'year' | 'hour' | 'day' | 'week' | 'month' | 'all';
    sort?: 'new' | 'relevance' | 'hot' | 'top' | 'comments';
    limit?: number;
    tagnumbers: number[];
    game: string;
};
export declare type deleteTagPayload = {
    slug?: string;
    tagnumber?: string;
    game?: string;
};
export declare type deleteTagsPayload = {
    slugs?: string[];
    tagnumbers: number[];
    tags?: Partial<TagData>[];
    game: string;
};
export declare type getTagPayload = {
    tagnumber: number;
    time?: 'all';
    sort?: 'new';
    limit?: number;
    subreddit?: string;
    slug: string;
    fields?: string[];
};
export declare type updateTagPayload = {
    tag: RequireAtLeastOne<TagData>;
    game: string;
};
export declare type uploadTagImagePayload = {
    tagnumber: number;
    type: 'found' | 'mystery' | 'queued';
    slug?: string;
    stream: ReadableStream;
};
export declare type getGameDataPayload = {
    slug: string;
    name: string;
    fields?: string[];
};
export declare type importTagPayload = Pick<TagData, 'discussionUrl' | 'mysteryImageUrl' | 'foundImageUrl' | 'mentionUrl' | 'shareUrl'> & Game;
