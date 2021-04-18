/// <reference types="node" />
import { Readable } from "stream";
export interface ImgurAccessToken {
    accessToken: string;
}
export interface ImgurClientId {
    clientId: string;
}
export interface ImgurCredentials extends ImgurAccessToken, ImgurClientId {
    clientSecret: string;
}
export interface SanityAccessToken {
    accessToken: string;
}
export interface SanityCredentials extends SanityAccessToken {
    projectId: string;
    dataset: string;
    apiVersion: string;
    useCdn: boolean;
    username: string;
    password: string;
}
export interface AccessToken {
    accessToken: string;
}
export interface ClientId {
    clientId: string;
}
export interface Login extends ClientId {
    username: string;
    password: string;
}
export declare type BikeTagCredentials = AccessToken | ClientId | Login;
export declare type Credentials = BikeTagCredentials & SanityCredentials & ImgurCredentials;
export interface BikeTagApiResponse<T = Record<string, unknown> | Record<string, unknown>[] | string | boolean> {
    data: T;
    status: number;
    success: boolean;
    source: "biketag" | "imgur" | "sanity";
}
export declare type geopoint = {
    lat: number;
    long: number;
    alt: number;
};
interface CommonData {
    slug: string;
    name: string;
}
export interface TagData extends CommonData {
    tagnumber: string;
    mysteryImage: string;
    mysteryImageUrl: string;
    game: string;
    player: string;
    hint: string;
    discussionUrl: string;
    foundLocation: string;
    gps: geopoint;
    foundImage: string;
    foundImageUrl: string;
}
export interface AlbumData extends CommonData {
    cover: string | null;
    cover_width: number | null;
    cover_height: number | null;
    images: TagData[];
    images_count: number;
}
export interface Payload {
    image?: string;
    base64?: string;
    type?: 'stream' | 'url' | 'base64';
    name?: string;
    title?: string;
    description?: string;
    album?: string;
    stream?: Readable;
    disable_audio?: '1' | '0';
}
export {};
