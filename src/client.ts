import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { EventEmitter } from 'events'
// import { getAuthorizationHeader } from './getAuthorizationHeader'
import { BIKETAG_API_PREFIX } from './common/endpoints'
import {
  Credentials,
  TagData,
  BikeTagApiResponse,
  ImgurCredentials,
} from './common/types'
import { tagDataFields } from './common/data'
import { getTagOptions, getTagsOptions } from './common/options'
import {
  constructTagNumberSlug,
  assignImgurCredentials,
  assignSanityCredentials,
  assignBikeTagCredentials,
  isImgurCredentials,
  isSanityCredentials,
  isBikeTagCredentials,
} from './common/methods'
import { setup } from 'axios-cache-adapter'

import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'

// @ts-ignore
import { ImgurClient } from './imgurClient'
import sanityClient, {
  SanityClient,
  ClientConfig as SanityConfig,
} from '@sanity/client'

const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)'

export { BikeTagCredentials } from './common/types'
export type BikeTagConfiguration = {
  biketag: Credentials
  sanity: SanityConfig
  imgur: ImgurCredentials
}
export class BikeTagClient extends EventEmitter {
  private fetcher: AxiosInstance
  private plainFetcher: AxiosInstance
  private cachedFetcher: AxiosInstance
  private mostAvailableApi: string
  private imgurClient?: typeof ImgurClient
  private sanityClient?: SanityClient
  private sanityConfig?: SanityConfig | void
  private imgurConfig?: ImgurCredentials | void
  private biketagConfig?: Credentials | void

  constructor(readonly credentials: Credentials) {
    super()

    this.mostAvailableApi = ''
    this.biketagConfig = assignBikeTagCredentials(credentials)
    this.imgurConfig = assignImgurCredentials(credentials)
    this.sanityConfig = assignSanityCredentials(credentials)

    if (this.imgurConfig) {
      this.imgurClient = new ImgurClient(this.imgurConfig)
    }

    if (this.sanityConfig) {
      this.sanityClient = sanityClient(this.sanityConfig)
    }

    /// Configure separate fetching strategies: plain, authed (default), cached (authed)
    this.plainFetcher = axios.create({
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
    })

    this.fetcher = axios.create({
      baseURL: BIKETAG_API_PREFIX,
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
    })

    this.cachedFetcher = setup({
      baseURL: BIKETAG_API_PREFIX,
      cache: {
        maxAge: 15 * 60 * 1000,
        exclude: {
          // Only exclude PUT, PATCH and DELETE methods from cache
          methods: ['put', 'patch', 'delete'],
        },
      },
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
    })
  }

  private getDefaultAPI(options: any): any {
    const availableAPI = options.source
      ? options.source
      : this.getMostAvailableAPI()
    let client: any = null
    let api: any = null

    options = typeof options === 'string' ? { slug: options } : options
    options =
      typeof options === 'number'
        ? {
            slug: constructTagNumberSlug(
              options,
              (this.credentials as Credentials).game
            ),
          }
        : options
    options.game = options.game ? options.game : this.credentials.game
    options.fields = options.fields ? options.fields : tagDataFields

    if (!options.slug) {
      if (options.tagnumber && typeof options.tagnumber !== 'undefined') {
        options.slug = constructTagNumberSlug(options.tagnumber, options.game)
      } else {
        options.slug = 'latest'
      }
    }

    switch (availableAPI) {
      case 'sanity':
        client = this.sanityClient
        api = sanityApi
        break
      case 'imgur':
        client = this.imgurClient
        api = imgurApi
        break
      default:
      case 'biketag':
        client = api = biketagApi
        break
    }

    return {
      client,
      api,
      options,
    }
  }

  private getMostAvailableAPI(): string {
    if (this.mostAvailableApi.length) {
      return this.mostAvailableApi
    }

    if (this.biketagConfig && isBikeTagCredentials(this.biketagConfig)) {
      return (this.mostAvailableApi = 'biketag')
    } else if (this.imgurConfig) {
      return (this.mostAvailableApi = 'imgur')
    } else if (this.sanityConfig) {
      return (this.mostAvailableApi = 'sanity')
    }

    return ''
  }

  getConfiguration(): BikeTagConfiguration {
    return {
      biketag: this.biketagConfig,
      sanity: this.sanityConfig,
      imgur: this.imgurConfig,
    } as BikeTagConfiguration
  }

  plainRequest(options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.plainFetcher(options)
  }

  cachedRequest(options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.cachedFetcher(options)
  }

  request(options: AxiosRequestConfig = {}): Promise<AxiosResponse<string>> {
    return this.fetcher(options)
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

  getTag(opts: getTagOptions): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api } = this.getDefaultAPI(opts)

    return api.getTag(client, options)
  }

  getTags(opts: getTagsOptions): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api } = this.getDefaultAPI(opts)

    return api.getTags(client, options)
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

  content(options: any = {}): SanityClient {
    if (isSanityCredentials(options)) {
      return sanityClient(options)
    }

    throw new Error('options are invalid for creating a sanity client')
  }

  images(options: any = {}): typeof ImgurClient {
    if (isImgurCredentials(options)) {
      return new ImgurClient(options)
    }

    throw new Error('options are invalid for creating an imgur client')
  }

  data(): BikeTagClient {
    return this
  }
}
