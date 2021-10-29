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
import {
  getTagPayload,
  getTagsPayload,
  updateTagPayload,
} from './common/payloads'
import {
  constructTagNumberSlug,
  assignBikeTagConfiguration,
  isImgurCredentials,
  isSanityCredentials,
  isBikeTagCredentials,
} from './common/methods'
import { setup } from 'axios-cache-adapter'

import * as BikeTagExpressions from './common/expressions'
import * as BikeTagGetters from './common/getters'
import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'

import ImgurClient from 'imgur'
import sanityClient, {
  SanityClient,
  ClientConfig as SanityConfig,
} from '@sanity/client'

const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)'

import { BikeTagCredentials, BikeTagConfiguration } from './common/types'
export class BikeTagClient extends EventEmitter {
  expressions: any = BikeTagExpressions
  getters: any = BikeTagGetters

  private fetcher: AxiosInstance
  private plainFetcher: AxiosInstance
  private cachedFetcher: AxiosInstance

  private mostAvailableApi: 'imgur' | 'sanity' | 'biketag' | undefined
  private imgurClient?: ImgurClient
  private sanityClient?: SanityClient
  private sanityConfig?: SanityConfig | undefined
  private imgurConfig?: ImgurCredentials | undefined
  private biketagConfig?: Credentials | undefined

  constructor(readonly config: Credentials | BikeTagConfiguration) {
    super()

    this.mostAvailableApi = undefined

    config = assignBikeTagConfiguration(config as BikeTagConfiguration)

    this.biketagConfig = (config as BikeTagConfiguration).biketag
    this.imgurConfig = (config as BikeTagConfiguration).imgur
    this.sanityConfig = (config as BikeTagConfiguration).sanity

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

  private getDefaultOptions(opts: any): any {
    /// If the options passed in was a string, set it as the slug
    const options =
      typeof opts === 'string'
        ? { slug: opts }
        : typeof opts === 'number'
        ? { tagnumber: opts }
        : opts

    /// Set the game in the options, defaulting to the configured game
    options.game = options.game
      ? options.game
      : (this.biketagConfig as Credentials).game

    /// Set the album hash, if present (Imgur specific)
    options.hash = options.hash
      ? options.hash
      : (this.biketagConfig as Credentials).hash

    /// Explicitely set the request fields to the specified TagDataFields
    options.fields = options.fields ? options.fields : tagDataFields

    /// Explicitely set the slug from the tagnumber or to 'latest'
    if (!options.slug) {
      if (options.tagnumber && typeof options.tagnumber !== 'undefined') {
        options.slug = constructTagNumberSlug(options.tagnumber, options.game)
      } else {
        options.slug = 'latest'
      }
    }

    /// Explicitely set the number if we happen to have the slug but not the tagnumber
    if (options.tagnumber === undefined) {
      if (options.slug !== 'latest') {
        options.tagnumber = BikeTagGetters.getTagnumberFromSlug(options.slug)
        console.log({ options })
      }
    }

    return options
  }

  private getDefaultAPI(options: any = {}, getDefaultOptions = true): any {
    const availableAPI = options.source
      ? options.source
      : this.getMostAvailableAPI()
    const outOptions = getDefaultOptions
      ? this.getDefaultOptions(options)
      : options

    let client: any = null
    let api: any = null

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
      options: outOptions,
    }
  }

  private getMostAvailableAPI(): string {
    if (this.mostAvailableApi) {
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

  getTag(payload: getTagPayload): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api } = this.getDefaultAPI(payload)

    return api.getTag(client, options)
  }

  getTags(payload: getTagsPayload): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api } = this.getDefaultAPI(payload)

    return api.getTags(client, options)
  }

  updateTag(
    payload: updateTagPayload | updateTagPayload[]
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    const { client, options, api } = this.getDefaultAPI(payload)

    return api.updateTag(client, options)
  }

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

  images(options: any = {}): ImgurClient {
    if (isImgurCredentials(options)) {
      return new ImgurClient(options)
    }

    throw new Error('options are invalid for creating an imgur client')
  }

  data(): BikeTagClient {
    return this
  }
}

export type { BikeTagCredentials, BikeTagConfiguration }
