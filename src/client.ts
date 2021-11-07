import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { EventEmitter } from 'events'
// import { getAuthorizationHeader } from './getAuthorizationHeader'
import { BIKETAG_API_PREFIX } from './common/endpoints'
import {
  Credentials,
  TagData,
  GameData,
  BikeTagApiResponse,
  ImgurCredentials,
  SanityCredentials,
  RedditCredentials,
  RequireAtLeastOne,
  BikeTagCredentials,
  BikeTagConfiguration,
  PartialBikeTagConfiguration,
} from './common/types'
import {
  getTagPayload,
  getTagsPayload,
  updateTagPayload,
  getGameDataPayload,
  uploadTagImagePayload,
  deleteTagPayload,
} from './common/payloads'
import {
  constructTagNumberSlug,
  assignBikeTagConfiguration,
  isImgurCredentials,
  isRedditCredentials,
  isSanityCredentials,
  isBikeTagCredentials,
  isBikeTagApiReady,
  isSanityApiReady,
  isImgurApiReady,
  isRedditApiReady,
} from './common/methods'
import { setup } from 'axios-cache-adapter'

import * as BikeTagExpressions from './common/expressions'
import * as BikeTagGetters from './common/getters'
import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'
import * as redditApi from './reddit'

import RedditClient from 'snoowrap'
import ImgurClient from 'imgur'
import sanityClient, { SanityClient } from '@sanity/client'

const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)'
export class BikeTagClient extends EventEmitter {
  expressions: any = BikeTagExpressions
  getters: any = BikeTagGetters

  private fetcher: AxiosInstance
  private plainFetcher: AxiosInstance
  private cachedFetcher: AxiosInstance

  private mostAvailableApi:
    | 'imgur'
    | 'sanity'
    | 'reddit'
    | 'biketag'
    | undefined
  private imgurClient?: ImgurClient
  private sanityClient?: SanityClient
  private redditClient?: RedditClient
  private sanityConfig?: SanityCredentials | undefined
  private imgurConfig?: ImgurCredentials | undefined
  private redditConfig?: RedditCredentials | undefined
  private biketagConfig?: Credentials | undefined

  constructor(readonly config: Credentials | BikeTagConfiguration) {
    super()

    this.mostAvailableApi = undefined

    this.setConfiguration(config)

    if (this.imgurConfig) {
      this.imgurClient = new ImgurClient(this.imgurConfig)
    }

    if (this.sanityConfig) {
      this.sanityClient = sanityClient(this.sanityConfig)
    }

    if (this.redditConfig) {
      this.redditClient = new RedditClient(this.redditConfig)
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

  private getDefaultOptions(opts: any, optsType = 'tag'): any {
    /// If the options passed in was a string, set it as the slug
    const options =
      typeof opts === 'string'
        ? { slug: opts }
        : typeof opts === 'number' && optsType === 'tag'
        ? { tagnumber: opts }
        : Array.isArray(opts) && optsType === 'tag'
        ? { tagnumbers: opts }
        : Array.isArray(opts)
        ? { payload: opts }
        : opts

    /// Set the game in the options, defaulting to the configured game
    options.game = options.game
      ? options.game
      : (this.biketagConfig as Credentials).game

    switch (optsType) {
      case 'game':
        options.game = options.game ?? options.slug
        options.slug = options.slug ?? options.game.toLowerCase()
        break

      case 'tag':
        /// Set the album hash, if present (Imgur specific)
        if (this.imgurConfig?.hash) {
          options.hash = options.hash ?? this.imgurConfig.hash
        }

        if (!options.slug) {
          if (options.tagnumber && typeof options.tagnumber !== 'undefined') {
            options.slug = constructTagNumberSlug(
              options.tagnumber,
              options.game
            )
          } else {
            options.slug = 'latest'
          }
        }

        /// Explicitely set the number if we happen to have the slug but not the tagnumber
        if (!options.tagnumber) {
          if (options.slug !== 'latest') {
            options.tagnumber = BikeTagGetters.getTagnumberFromSlug(
              options.slug
            )
          }
        }
        break
    }

    return options
  }

  private getDefaultAPI(
    opts: any = {},
    overloads: any = {},
    getOptionsDefault: string | undefined = undefined
  ): any {
    const options = {
      ...this.getDefaultOptions(opts, getOptionsDefault),
      ...overloads,
    }
    const availableAPI = options.source
      ? options.source
      : this.getMostAvailableAPI()

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
      case 'reddit':
        client = this.redditClient
        api = redditApi
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
      source: availableAPI,
    }
  }

  private getMostAvailableAPI(): string {
    if (this.mostAvailableApi) {
      return this.mostAvailableApi
    }

    if (
      this.biketagConfig &&
      isBikeTagCredentials(this.biketagConfig) &&
      isBikeTagApiReady(this.biketagConfig)
    ) {
      return (this.mostAvailableApi = 'biketag')
    } else if (
      this.imgurConfig &&
      isImgurCredentials(this.imgurConfig) &&
      isImgurApiReady(this.imgurConfig)
    ) {
      return (this.mostAvailableApi = 'imgur')
    } else if (
      this.sanityConfig &&
      isSanityCredentials(this.sanityConfig) &&
      isSanityApiReady(this.sanityConfig)
    ) {
      return (this.mostAvailableApi = 'sanity')
    } else if (
      this.redditConfig &&
      isRedditCredentials(this.redditConfig) &&
      isRedditApiReady(this.redditConfig)
    ) {
      return (this.mostAvailableApi = 'reddit')
    }

    return ''
  }

  setConfiguration(
    config: Credentials | BikeTagConfiguration | PartialBikeTagConfiguration,
    overwrite = true
  ): BikeTagConfiguration {
    const parsedConfig = assignBikeTagConfiguration(
      config as BikeTagConfiguration
    )

    let biketagConfig = (parsedConfig as BikeTagConfiguration).biketag
    let imgurConfig = (parsedConfig as BikeTagConfiguration).imgur
    let sanityConfig = (parsedConfig as BikeTagConfiguration).sanity
    let redditConfig = (parsedConfig as BikeTagConfiguration).reddit

    if (!overwrite) {
      biketagConfig = { ...this.biketagConfig, ...biketagConfig }
      imgurConfig = { ...this.imgurConfig, ...imgurConfig }
      sanityConfig = { ...this.sanityConfig, ...sanityConfig }
      redditConfig = { ...this.redditConfig, ...redditConfig }
    }

    this.biketagConfig = biketagConfig
    this.imgurConfig = imgurConfig
    this.sanityConfig = sanityConfig
    this.redditConfig = redditConfig

    return this.getConfiguration()
  }

  getConfiguration(): BikeTagConfiguration {
    return {
      biketag: this.biketagConfig,
      sanity: this.sanityConfig,
      imgur: this.imgurConfig,
      reddit: this.redditConfig,
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

  getGameData(
    payload: RequireAtLeastOne<getGameDataPayload> | string
  ): Promise<BikeTagApiResponse<GameData>> {
    const onlyApplicableOpts = {
      ...(typeof payload === 'string' ? { game: payload } : payload),
      source: 'sanity',
    }
    const { client, options, api, source } = this.getDefaultAPI(
      onlyApplicableOpts,
      {},
      'game'
    )

    return api.getGameData(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      }
    })
  }

  deleteTag(
    payload: deleteTagPayload | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api, source } = this.getDefaultAPI(payload, opts)

    return api.deleteTag(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      })
    })
  }

  // /// TODO: this should be for getting an album
  // getArchive(options: ArchiveOptions): Promise<BikeTagApiResponse<ArchiveData>> {
  //   return getArchive(this, options)
  // }

  getTag(
    payload: RequireAtLeastOne<getTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api, source } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.getTag

    switch (source) {
      case 'reddit':
        clientMethod = clientMethod.bind({images: this.images(this.imgurConfig) })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      }
    })
  }

  getTags(
    payload?: getTagsPayload | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<TagData[]>> {
    const { client, options, api, source } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.getTags

    switch (source) {
      case 'reddit':
        clientMethod = clientMethod.bind({images: this.images(this.imgurConfig) })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      }
    })
  }

  updateTag(
    payload: updateTagPayload | updateTagPayload[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    const { client, options, api, source } = this.getDefaultAPI(payload, opts)

    return api.updateTag(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      })
    })
  }

  uploadTagImage(
    payload: uploadTagImagePayload | uploadTagImagePayload[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<any | any[]>> {
    const { client, options, api, source } = this.getDefaultAPI(payload, opts)

    return api.uploadTagImage(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source,
      })
    })
  }

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

  reddit(options: any = {}): RedditClient {
    if (isRedditCredentials(options)) {
      return new RedditClient(options)
    }

    throw new Error('options are invalid for creating an imgur client')
  }

  data(): BikeTagClient {
    return this
  }
}

export type { BikeTagCredentials, BikeTagConfiguration }
