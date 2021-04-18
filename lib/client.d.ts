/// <reference types="node" />
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
import { Credentials, TagData, BikeTagApiResponse, ImgurCredentials, BikeTagCredentials } from './common/types';
import { ImgurClient } from './imgurClient';
import { SanityClient, ClientConfig as SanityConfig } from '@sanity/client';
export declare class BikeTagClient extends EventEmitter {
    readonly credentials: Credentials;
    private fetcher;
    private plainFetcher;
    private cachedFetcher;
    private mostAvailableApi;
    private imgurClient?;
    private sanityClient?;
    private sanityConfig?;
    private imgurConfig?;
    private biketagConfig?;
    constructor(credentials: Credentials);
    private getDefaultAPI;
    private getMostAvailableAPI;
    getConfiguration(): {
        sanity: void | SanityConfig | undefined;
        imgur: void | ImgurCredentials | undefined;
        biketag: void | BikeTagCredentials | undefined;
    };
    plainRequest(options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    cachedRequest(options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    request(options?: AxiosRequestConfig): Promise<AxiosResponse<string>>;
    getTag(opts: number | string | any): Promise<BikeTagApiResponse<TagData>>;
    content(options?: any): SanityClient;
    images(options?: any): typeof ImgurClient;
    data(): BikeTagClient;
}
