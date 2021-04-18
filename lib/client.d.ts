/// <reference types="node" />
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
import { Credentials, TagData, BikeTagApiResponse } from './common/types';
import { ImgurClient } from './imgurClient';
import { SanityClient, ClientConfig as SanityConfig } from '@sanity/client';
export declare class BikeTagClient extends EventEmitter {
    readonly credentials: Credentials;
    private fetcher;
    private mostAvailableApi;
    private imgurClient?;
    private imgurConfig?;
    private sanityClient?;
    private sanityConfig?;
    constructor(credentials: Credentials);
    private getMostAvailableAPI;
    getConfiguration(): {
        sanity: SanityConfig | undefined;
        imgur: any;
    };
    plainRequest(options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    request(options?: AxiosRequestConfig): Promise<AxiosResponse<string>>;
    getTag(options: number | string | any): Promise<BikeTagApiResponse<TagData>>;
    content(options?: any): SanityClient;
    images(options?: any): ImgurClient;
    data(): BikeTagClient;
}
