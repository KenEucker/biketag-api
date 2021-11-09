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
  deleteTagsPayload,
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
  createBikeTagCredentials,
  createImgurCredentials,
  createSanityCredentials,
  createRedditCredentials,
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
  private sanityConfig?: SanityCredentials
  private imgurConfig?: ImgurCredentials
  private redditConfig?: RedditCredentials
  private biketagConfig?: BikeTagCredentials

  constructor(readonly config: Credentials | BikeTagConfiguration) {
    super()

    this.mostAvailableApi = undefined

    this.setConfiguration(config ?? {})

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

  private getDefaultOptions(
    opts: any,
    optsType = 'tag',
    source = 'biketag'
  ): any {
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
        : opts ?? {}

    options.source = source

    switch (optsType) {
      case 'game':
        options.game = options.game ?? options.slug
        options.slug = options.slug ?? options.game?.toLowerCase() ?? undefined
        break

      case 'tag':
        /// Set the game in the options, defaulting to the configured game
        options.game = options.game
          ? options.game
          : (this.biketagConfig as Credentials).game

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

    switch (options.source) {
      case 'reddit':
        options.subreddit = options.subreddit ?? this.redditConfig.subreddit
        break
    }

    return options
  }

  private getDefaultAPI(
    opts: any = {},
    overloads: any = {},
    getOptionsDefault: string | undefined = undefined
  ) {
    const options = {
      ...this.getDefaultOptions(
        opts,
        getOptionsDefault,
        overloads.source ?? this.getMostAvailableAPI()
      ),
      ...overloads,
    }

    let client: any = null
    let api: any = null

    switch (options.source) {
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
      biketagConfig = this.biketagConfig
        ? createBikeTagCredentials(this.biketagConfig, biketagConfig)
        : biketagConfig
      imgurConfig = this.imgurConfig
        ? createImgurCredentials(this.imgurConfig, imgurConfig)
        : imgurConfig
      sanityConfig = this.sanityConfig
        ? createSanityCredentials(this.sanityConfig, sanityConfig)
        : sanityConfig
      redditConfig = this.redditConfig
        ? createRedditCredentials(this.redditConfig, redditConfig)
        : redditConfig
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
    payload: RequireAtLeastOne<getGameDataPayload> | string | undefined
  ): Promise<BikeTagApiResponse<GameData>> {
    const onlyApplicableOpts =
      typeof payload === 'string' ? { game: payload } : payload
    const { client, options, api } = this.getDefaultAPI(
      onlyApplicableOpts,
      { source: 'sanity' },
      'game'
    )

    return api.getGameData(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      }
    })
  }

  deleteTag(
    payload: deleteTagPayload | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.deleteTag

    switch (options.source) {
      case 'imgur':
        clientMethod = clientMethod.bind({ getTag: api.getTag })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      })
    })
  }

  deleteTags(
    payload: deleteTagsPayload | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.deleteTags

    switch (options.source) {
      case 'imgur':
        clientMethod = clientMethod.bind({ getTags: api.getTags })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      })
    })
  }

  getTag(
    payload: RequireAtLeastOne<getTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<TagData>> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.getTag

    switch (options.source) {
      case 'reddit':
        clientMethod = clientMethod.bind({
          images: this.images(this.imgurConfig),
        })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      }
    })
  }

  getTags(
    payload?: getTagsPayload | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<TagData[]>> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)
    let clientMethod = api.getTags

    switch (options.source) {
      case 'reddit':
        clientMethod = clientMethod.bind({
          images: this.images(this.imgurConfig),
        })
        break
    }

    return clientMethod(client, options).catch((e) => {
      return {
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      }
    })
  }

  updateTag(
    payload: updateTagPayload | updateTagPayload[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)

    return api.updateTag(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      })
    })
  }

  uploadTagImage(
    payload: uploadTagImagePayload | uploadTagImagePayload[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<any | any[]>> {
    const { client, options, api } = this.getDefaultAPI(payload, opts)

    return api.uploadTagImage(client, options).catch((e) => {
      return Promise.resolve({
        status: 500,
        data: null,
        error: e,
        success: false,
        source: options.source,
      })
    })
  }

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

  discussions(options: any = {}): RedditClient {
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
