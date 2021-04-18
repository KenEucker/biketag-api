import axios from 'axios';
import { EventEmitter } from 'events';
// import { getAuthorizationHeader } from './getAuthorizationHeader'
import { BIKETAG_API_PREFIX } from './common/endpoints';
import { tagDataFields } from './common/data';
import { constructTagNumberSlug, isImgurCredentials, isSanityCredentials, isBikeTagCredentials } from './common/methods';
import * as sanityApi from './sanity';
import * as imgurApi from './imgur';
import * as biketagApi from './biketag';
// @ts-ignore
import { ImgurClient } from './imgurClient';
import sanityClient from '@sanity/client';
const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)';
export class BikeTagClient extends EventEmitter {
    constructor(credentials) {
        super();
        this.credentials = credentials;
        this.mostAvailableApi = "";
        this.biketagConfig = isBikeTagCredentials(credentials) ? credentials : undefined;
        this.imgurConfig = isImgurCredentials(credentials) ? credentials : undefined;
        this.sanityConfig = isSanityCredentials(credentials) ? credentials : undefined;
        if (this.imgurConfig) {
            this.imgurClient = new ImgurClient(this.imgurConfig);
        }
        if (this.sanityConfig) {
            this.sanityClient = sanityClient(this.sanityConfig);
        }
        this.fetcher = axios.create({
            baseURL: BIKETAG_API_PREFIX,
            headers: {
                'user-agent': USERAGENT,
            },
            responseType: 'json',
            // hooks: {
            //   beforeRequest: [
            //     async (options: any) => {
            //       options.headers['authorization'] = await getAuthorizationHeader(
            //         this
            //       )
            //     },
            //   ],
            // },
        });
    }
    getDefaultAPI(options) {
        const availableAPI = options.forceAPI ? options.forceAPI : this.getMostAvailableAPI();
        let client = null;
        let api = null;
        options = typeof options === 'string' ? { slug: options } : options;
        options = typeof options === 'number' ? { slug: constructTagNumberSlug(options) } : options;
        options.slug = options.slug ? options.slug : constructTagNumberSlug(options.tagnumber, options.game);
        options.fields = options.fields ? options.fields : tagDataFields;
        switch (availableAPI) {
            case "sanity":
                client = this.sanityClient;
                api = sanityApi;
                break;
            case "imgur":
                client = this.imgurClient;
                api = imgurApi;
                break;
            default:
            case "biketag":
                client = api = biketagApi;
                break;
        }
        return {
            client, api, options
        };
    }
    getMostAvailableAPI() {
        if (this.mostAvailableApi.length) {
            return this.mostAvailableApi;
        }
        if (this.biketagConfig) {
            return this.mostAvailableApi = "biketag";
        }
        else if (this.imgurConfig) {
            return this.mostAvailableApi = "imgur";
        }
        else if (this.sanityConfig) {
            return this.mostAvailableApi = "sanity";
        }
        return "";
    }
    getConfiguration() {
        return {
            sanity: this.sanityConfig,
            imgur: this.imgurConfig,
            biketag: this.biketagConfig,
        };
    }
    plainRequest(options = {}) {
        return this.fetcher(options).then(response => response.data);
    }
    request(options = {}) {
        return this.fetcher(options);
    }
    // deleteImage(imageHash: string): Promise<BikeTagApiResponse<boolean>> {
    //   switch (this.getMostAvailableAPI()) {
    //     case "imgur":
    //       return imgur.deleteImage(this, imageHash)
    //     break
    //   }
    // }
    // /// TODO: this should be for getting an album
    // getArchive(options: ArchiveOptions): Promise<BikeTagApiResponse<ArchiveData>> {
    //   return getArchive(this, options)
    // }
    getTag(opts) {
        const { client, options, api } = this.getDefaultAPI(opts);
        return api.getTag(client, options);
    }
    // updateImage(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return updateImage(this, payload)
    // }
    // upload(
    //   payload: string | string[] | Payload | Payload[]
    // ): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
    //   return upload(this, payload)
    // }
    // getBikeTag(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   switch (this.getMostAvailableAPI()) {
    //     case "imgur":
    //       return getBikeTag(this, payload)
    //       break
    //     case "sanity":
    //       return 
    //   }
    // }
    // getBikeTagMysteryImage(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return getBikeTagMysteryImage(this, payload)
    // }
    // getBikeTagFoundImage(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return getBikeTagFoundImage(this, payload)
    // }
    // queueBikeTagFoundImage(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return queueBikeTagFoundImage(this, payload)
    // }
    // queueBikeTagMysteryImage(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return queueBikeTagMysteryImage(this, payload)
    // }
    // getQueuedImages(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return getQueuedImages(this, payload)
    // }
    // getQueue(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return getQueue(this, payload)
    // }
    // completeBikeTagRound(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return completeBikeTagRound(this, payload)
    // }
    // getBikeTagRound(
    //   payload: UpdateImagePayload | UpdateImagePayload[]
    // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    //   return getBikeTagRound(this, payload)
    // }
    content(options = {}) {
        if (isSanityCredentials(options)) {
            return sanityClient(options);
        }
        throw new Error('options are invalid for creating a sanity client');
    }
    images(options = {}) {
        if (isImgurCredentials(options)) {
            return new ImgurClient(options);
        }
        throw new Error('options are invalid for creating an imgur client');
    }
    data() {
        return this;
    }
}
//# sourceMappingURL=client.js.map