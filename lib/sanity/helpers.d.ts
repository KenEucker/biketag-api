import { SanityClient } from '@sanity/client';
export declare function constructTagFromSanityObject(data: any, fields?: string[]): any;
export declare function constructObjectIdFromSlug(slug: string): string;
export declare function constructSanityObjectFromTag(client: SanityClient, data: any, fields?: string[]): Promise<any>;
export declare function constructGameFromSanityObject(data: any, fields?: string[]): any;
export declare function constructSanityFieldsQuery(fields?: string[], type?: string): any;
