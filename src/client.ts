import { BIKETAG_API_PREFIX } from './common/endpoints'
import { Game, Tag, Player, Ambassador, Setting } from './common/schema'
import {
  Credentials,
  BikeTagApiResponse,
  ImgurCredentials,
  SanityCredentials,
  RedditCredentials,
  RequireAtLeastOne,
  BikeTagCredentials,
  BikeTagConfiguration,
  PartialBikeTagConfiguration,
  TwitterCredentials,
  BikeTagGunClient,
  BikeTagGameState,
  ApiOptions,
} from './common/types'
import {
  AvailableApis,
  DataTypes,
  Errors,
  HttpStatusCode,
} from './common/enums'
import {
  getTagPayload,
  getTagsPayload,
  updateTagPayload,
  getGamePayload,
  uploadTagImagePayload,
  deleteTagPayload,
  deleteTagsPayload,
  importTagPayload,
  getPlayersPayload,
  getPlayerPayload,
  getSettingPayload,
  getAmbassadorPayload,
  getAmbassadorsPayload,
  getSettingsPayload,
  getQueuePayload,
  queueTagImagePayload,
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
  createTwitterCredentials,
  isTwitterCredentials,
  isTwitterApiReady,
} from './common/methods'

import * as BikeTagExpressions from './common/expressions'
import * as BikeTagGetters from './common/getters'
import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'
import * as redditApi from './reddit'
import * as twitterApi from './twitter'

import RedditClient from 'snoowrap'
import ImgurClient from 'imanagur'
import sanityClient, { SanityClient } from '@sanity/client'
import TwitterClient from 'twitter-v2'
import Gun from 'gun/gun'

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { EventEmitter } from 'events'
import { setup } from 'axios-cache-adapter'
import { isEqual } from 'lodash'

export const USERAGENT =
  'biketag-api (https://github.com/keneucker/biketag-api)'
export class BikeTagClient extends EventEmitter {
  static expressions = BikeTagExpressions
  static getters = BikeTagGetters

  protected fetcher: AxiosInstance
  protected plainFetcher: AxiosInstance
  protected cachedFetcher: AxiosInstance

  protected biketagClient?: BikeTagGunClient
  protected imgurClient?: ImgurClient
  protected sanityClient?: SanityClient
  protected redditClient?: RedditClient
  protected twitterClient?: any
  protected sanityConfig?: SanityCredentials
  protected imgurConfig?: ImgurCredentials
  protected redditConfig?: RedditCredentials
  protected biketagConfig?: BikeTagCredentials
  protected twitterConfig?: TwitterCredentials

  constructor(readonly configuration: Credentials | BikeTagConfiguration) {
    super()

    const initConfig = this.config(configuration ?? {}, true, true)
    this.initializeClients(initConfig)

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

  /// ****************************  protected Class Methods   ******************************** ///

  protected getInitialPayload(
    opts: any,
    source?: AvailableApis | string,
    method?: string
  ): ApiOptions {
    const optsIsArray = Array.isArray(opts)
    let payload: any = {}

    switch (typeof opts) {
      case 'object':
        if (optsIsArray && opts.length) {
          if (typeof opts[0] === 'string') {
            payload.slugs = opts
          } else if (typeof opts[0] === 'number') {
            payload.tagnumbers = opts
          } else {
            payload.payload = opts
          }
        } else {
          payload = opts
        }
        break

      case 'string':
        payload.slugs = optsIsArray ? opts : [opts]
        break

      case 'number':
        payload.tagnumbers = optsIsArray ? opts : [opts]
        break

      default:
        payload = {}
        break
    }

    switch (typeof source) {
      case 'string':
        payload.source = AvailableApis[source]
        break

      case 'undefined':
        payload.source = this.getMostAvailableClient(method)
        break

      default:
        payload.source = source
        break
    }

    return payload
  }

  protected getDefaultOptions(
    options: ApiOptions,
    dataType: DataTypes = DataTypes.tag,
    overrides: any = {}
  ): ApiOptions {
    /// Data defaults
    switch (dataType) {
      case DataTypes.game:
        options.game = options.game ?? options.slug ?? this.biketagConfig?.game
        options.slug = options.slug ?? options.game?.toLowerCase() ?? undefined
        break

      case DataTypes.player:
        options.game = options.game ? options.game : this.biketagConfig?.game
        break

      case DataTypes.tag:
        /// Set the game in the options, defaulting to the configured game
        options.game = options.game ? options.game : this.biketagConfig?.game

        if (!options.slug && !options.slugs) {
          if (typeof options.tagnumber !== 'undefined') {
            options.slug = constructTagNumberSlug(
              options.tagnumber,
              options.game
            )
          } else if (typeof options.tagnumbers === 'undefined') {
            options.slug = 'current'
          }
        }

        if (!options.tagnumber) {
          if (options.tagnumbers?.length === 1) {
            options.tagnumber = options.tagnumbers[0]
          } else if (options.slug && options.slug !== 'current') {
            options.tagnumber = BikeTagGetters.getTagnumberFromSlug(
              options.slug
            )
          }
        }
        break
      case DataTypes.queue:
        options.hash =
          options.queuehash ??
          options.hash ??
          this.imgurConfig.queuehash ??
          this.imgurConfig.hash
        break
    }

    if (overrides.source) {
      options.source = AvailableApis[overrides.source]
      delete overrides.source
    }

    /// Source defaults
    switch (options.source) {
      case AvailableApis.imgur:
        options.hash = options.hash ?? this.imgurConfig.hash
        break
      case AvailableApis.reddit:
        options.subreddit = options.subreddit ?? this.redditConfig.subreddit
        break
      case AvailableApis.twitter:
        options.account = options.account ?? this.twitterConfig.account
        break
    }

    /// default option for interfaces is to return the data from the response
    options.concise =
      typeof options.concise !== 'undefined' ? options.concise : true

    return { ...options, ...overrides }
  }

  protected getClientAdapter(
    opts: any,
    overrides: any = {},
    dataType: DataTypes = DataTypes.tag,
    method?: string
  ): any {
    const options = this.options(opts, dataType, overrides, method)

    let client: any = null
    let api: any = null

    switch (options.source) {
      case AvailableApis.sanity:
        client = this.sanityClient
        api = sanityApi
        break
      case AvailableApis.imgur:
        client = this.imgurClient
        api = imgurApi
        break
      case AvailableApis.reddit:
        client = this.redditClient
        api = redditApi
        break
      case AvailableApis.twitter:
        client = this.twitterClient
        api = twitterApi
        break
      default:
      case AvailableApis.biketag:
        client = this.biketagClient
        api = biketagApi
        break
    }

    return {
      client,
      api,
      options,
      source: AvailableApis[options.source],
    }
  }

  protected getMostAvailableClient(method?: string): AvailableApis {
    if (
      this.imgurConfig &&
      this.imgurClient &&
      (!method || !!imgurApi[method])
    ) {
      return AvailableApis.imgur
    } else if (
      this.sanityConfig &&
      this.sanityClient &&
      (!method || !!sanityApi[method])
    ) {
      return AvailableApis.sanity
    } else if (
      this.redditConfig &&
      this.redditClient &&
      (!method || !!redditApi[method])
    ) {
      return AvailableApis.reddit
    } else if (
      this.twitterConfig &&
      this.twitterClient &&
      (!method || !!twitterApi[method])
    ) {
      return AvailableApis.twitter
    } else if (
      this.biketagConfig &&
      isBikeTagCredentials(this.biketagConfig) &&
      isBikeTagApiReady(this.biketagConfig) &&
      (!method || !!biketagApi[method])
    ) {
      return AvailableApis.biketag
    }
    // const sanityApiAvailability =
    //   this.sanityConfig && this.sanityClient && (!method || !!sanityApi[method])
    //     ? isSanityApiReady(this.sanityConfig)
    //     : 0
    // const imgurApiAvailability =
    //   this.imgurConfig && this.imgurClient && (!method || !!imgurApi[method])
    //     ? isImgurApiReady(this.imgurConfig)
    //     : 0
    // const redditApiAvailability =
    //   this.redditConfig && this.redditClient && (!method || !!redditApi[method])
    //     ? isRedditApiReady(this.redditConfig)
    //     : 0
    // const twitterApiAvailability =
    //   this.twitterConfig &&
    //   this.twitterClient &&
    //   (!method || !!twitterApi[method])
    //     ? isTwitterApiReady(this.twitterConfig)
    //     : 0
    // const bikeTagApiAvilability =
    //   this.biketagConfig &&
    //   isBikeTagCredentials(this.biketagConfig) &&
    //   isBikeTagApiReady(this.biketagConfig) &&
    //   (!method || !!biketagApi[method])
    //     ? isBikeTagApiReady(this.biketagConfig)
    //     : 0

    return null
  }

  protected getPassthroughApiMethod(
    method: any,
    client:
      | RedditClient
      | ImgurClient
      | BikeTagClient
      | SanityClient
      | TwitterClient
  ): any {
    return (opts) => {
      return method(
        client,
        this.getDefaultOptions(this.getInitialPayload(opts))
      )
    }
  }

  protected getConfig(config?: BikeTagConfiguration): BikeTagConfiguration {
    return {
      biketag: config?.biketag ?? this.biketagConfig,
      sanity: config?.sanity ?? this.sanityConfig,
      imgur: config?.imgur ?? this.imgurConfig,
      reddit: config?.reddit ?? this.redditConfig,
      twitter: config?.twitter ?? this.twitterConfig,
    } as BikeTagConfiguration
  }

  protected initializeClients(
    config?: BikeTagConfiguration
  ): BikeTagConfiguration {
    config = config ?? this.config()

    if (config.biketag && isBikeTagCredentials(config.biketag)) {
      this.biketagClient = new Gun<BikeTagGameState>(config.biketag)
    }
    if (
      config.imgur &&
      isImgurCredentials(config.imgur) &&
      isImgurApiReady(config.imgur)
    ) {
      this.imgurClient = new ImgurClient(config.imgur)
    }
    if (
      config.sanity &&
      isSanityCredentials(config.sanity) &&
      isSanityApiReady(config.sanity)
    ) {
      this.sanityClient = sanityClient(config.sanity)
    }
    if (
      config.reddit &&
      isRedditCredentials(config.reddit) &&
      isRedditApiReady(config.reddit)
    ) {
      this.redditClient = new RedditClient(config.reddit)
    }
    if (
      config.twitter &&
      isTwitterCredentials(config.twitter) &&
      isTwitterApiReady(config.twitter)
    ) {
      this.twitterClient = new TwitterClient(config.twitter)
    }

    return config
  }

  /// ****************************  Generic Methods   ************************************** ///

  options(
    opts: any = {},
    dataType?: DataTypes,
    overrides: any = {},
    method?: string
  ): ApiOptions {
    return this.getDefaultOptions(
      this.getInitialPayload(opts, undefined, method),
      dataType,
      overrides
    )
  }

  config(
    config?: Credentials | BikeTagConfiguration | PartialBikeTagConfiguration,
    overwrite = true,
    reInitialize = false
  ): BikeTagConfiguration {
    if (config) {
      const parsedConfig = assignBikeTagConfiguration(
        config as BikeTagConfiguration
      )

      const initClientConfig = (
        type: AvailableApis,
        parsedConfig: BikeTagConfiguration,
        overwrite = true
      ) => {
        const configName = `${AvailableApis[type]}Config`
        const config = parsedConfig[AvailableApis[type]]
        let createCredentialsMethod: any = createBikeTagCredentials

        switch (type) {
          case AvailableApis.imgur:
            createCredentialsMethod = createImgurCredentials
            break
          case AvailableApis.reddit:
            createCredentialsMethod = createRedditCredentials
            break
          case AvailableApis.sanity:
            createCredentialsMethod = createSanityCredentials
            break
          case AvailableApis.twitter:
            createCredentialsMethod = createTwitterCredentials
            break
        }

        return !overwrite && this[configName] && config
          ? createCredentialsMethod(config, this[configName])
          : config ?? this[configName]
      }

      const biketagConfig = initClientConfig(
        AvailableApis.biketag,
        parsedConfig,
        overwrite
      )
      const imgurConfig = initClientConfig(
        AvailableApis.imgur,
        parsedConfig,
        overwrite
      )
      const sanityConfig = initClientConfig(
        AvailableApis.sanity,
        parsedConfig,
        overwrite
      )
      const redditConfig = initClientConfig(
        AvailableApis.reddit,
        parsedConfig,
        overwrite
      )
      const twitterConfig = initClientConfig(
        AvailableApis.twitter,
        parsedConfig,
        overwrite
      )

      if (reInitialize) {
        const initializeConfig: BikeTagConfiguration = {
          biketag: undefined,
          imgur: undefined,
          reddit: undefined,
          sanity: undefined,
          twitter: undefined,
        }

        if (!isEqual(this.imgurConfig, imgurConfig)) {
          initializeConfig.imgur = imgurConfig
        }
        if (!isEqual(this.redditConfig, redditConfig)) {
          initializeConfig.reddit = redditConfig
        }
        if (!isEqual(this.sanityConfig, sanityConfig)) {
          initializeConfig.sanity = sanityConfig
        }
        if (!isEqual(this.twitterConfig, twitterConfig)) {
          initializeConfig.twitter = twitterConfig
        }

        this.initializeClients(initializeConfig)
      }

      this.biketagConfig = biketagConfig
      this.imgurConfig = imgurConfig
      this.sanityConfig = sanityConfig
      this.redditConfig = redditConfig
      this.twitterConfig = twitterConfig
    }

    return this.getConfig()
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

  /// ****************************  Game Data Methods   ************************************ ///

  game(
    payload?: RequireAtLeastOne<getGamePayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game> | Game> {
    const options = this.options(payload, DataTypes.game, opts, 'getGame')
    return this.getGame(options as getGamePayload, opts).then((r) => {
      return options.concise ? r.data : r
    })
  }

  getGame(
    payload?: RequireAtLeastOne<getGamePayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.game,
      'getGame'
    )
    const clientMethod = api.getGame

    if (clientMethod) {
      return clientMethod(client, options)
        .then((retrievedGameResponse) => {
          if (retrievedGameResponse.success && retrievedGameResponse.data) {
            /// Set the most important game data (hash, subreddit, etc)
            this.config({
              game: retrievedGameResponse.data.name,
              imgur: {
                hash: retrievedGameResponse.data.mainhash,
                queuehash: retrievedGameResponse.data.queuehash,
              },
              reddit: {
                subreddit: retrievedGameResponse.data.subreddit,
              },
              twitter: {
                account: retrievedGameResponse.data.twitter,
              },
            })
          }
          return retrievedGameResponse
        })
        .catch((e) => {
          return {
            status: HttpStatusCode.InternalServerError,
            data: null,
            error: e,
            success: false,
            source,
          }
        })
    } else {
      return Promise.reject(`getGame ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Queue Data Methods   *********************************** ///

  queue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]> | Tag[]> {
    const options = this.options(payload, DataTypes.queue, opts, 'getQueue')
    return this.getQueue(options as getQueuePayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  getQueue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.queue
    )
    const clientMethod = api.getQueue

    /// If the client adapter implements the method
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    } else {
      return Promise.reject(`getQueue ${Errors.NotImplemented} ${source}`)
    }
  }

  queueTagImage(
    payload?: RequireAtLeastOne<queueTagImagePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    /// take player information and a tag image (either found or mystery) and add it to the queue
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.queue
    )
    const clientMethod = api.queueTagImage

    /// If the client adapter implements the method
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    } else {
      throw `queueTagImage ${Errors.NotImplemented} ${source}`
    }
  }

  submitQueuedTag(
    payload?: RequireAtLeastOne<queueTagImagePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    /// using the player information and the tag number, send the submit tag request to the biketag server
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.queue
    )
    const clientMethod = api.submitQueuedTag

    /// If the client adapter implements the method
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    } else {
      throw `submitQueuedTag ${Errors.NotImplemented} ${source}`
    }
  }

  /// ****************************  Tag Data Methods   ************************************ ///

  tags(
    payload?:
      | RequireAtLeastOne<getTagPayload>
      | RequireAtLeastOne<getTagsPayload>
      | number
      | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]> | Tag[]> {
    const options = this.options(payload, DataTypes.tag, opts, 'getTags')
    return this.getTags(options as getTagsPayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  getTag(
    payload?: RequireAtLeastOne<getTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    let clientMethod = api.getTag

    /// If the client adapter implements a direct way to retrieve a single tag
    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.reddit:
          clientMethod = clientMethod.bind({
            images: this.images({ ...this.imgurConfig, ...opts }),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getTags(options as getTagsPayload, opts).then((r) => {
      return {
        data: r.data?.length ? r.data[0] : null,
        status: r.status,
        source: r.source,
        success: r.success,
      }
    })
  }

  getTags(
    payload?: RequireAtLeastOne<getTagsPayload> | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      undefined,
      'getTags'
    )
    let clientMethod = api.getTags

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.reddit:
          clientMethod = clientMethod.bind({
            images: this.images({ ...this.imgurConfig, ...opts }),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    } else {
      return Promise.reject(`getTags ${Errors.NotImplemented} ${source}`)
    }
  }

  uploadTagImage(
    payload:
      | RequireAtLeastOne<uploadTagImagePayload>
      | RequireAtLeastOne<uploadTagImagePayload>[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<any | any[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    const clientMethod = api.uploadTagImage

    /// If the client adapter implements the method
    if (clientMethod) {
      return api.uploadTagImage(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`uploadTagImage ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic update that accepts any data type
  updateTag(
    payload:
      | RequireAtLeastOne<updateTagPayload>
      | RequireAtLeastOne<updateTagPayload>[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    let clientMethod = api.updateTag

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
            uploadTagImage: this.getPassthroughApiMethod(
              api.uploadTagImage,
              client
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updateTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic import that accepts any data type
  importTag(
    payload:
      | RequireAtLeastOne<importTagPayload>
      | RequireAtLeastOne<importTagPayload>[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { source } = this.getClientAdapter(payload, opts)
    return Promise.reject(`updateTag ${Errors.NotImplemented} ${source}`)
  }

  /// TODO: change to generic delete that accepts any data type
  deleteTag(
    payload: RequireAtLeastOne<deleteTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    let clientMethod = api.deleteTag

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = {
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          }
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`deleteTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic delete that accepts any data type
  deleteTags(
    payload: RequireAtLeastOne<deleteTagsPayload> | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.tag,
      'deleteTags'
    )
    let clientMethod = api.deleteTags

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`deleteTags ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Player Data Methods   ********************************** ///

  players(
    payload?:
      | RequireAtLeastOne<getPlayerPayload>
      | RequireAtLeastOne<getPlayersPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Player[]> | Player[]> {
    const options = this.options(payload, DataTypes.player, opts, 'getPlayers')
    return this.getPlayers(options as getPlayersPayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  getPlayer(
    payload: RequireAtLeastOne<getPlayerPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Player>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    const clientMethod = api.getPlayer

    /// If the client adapter implements a direct way to retrieve a single player
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getPlayers(
      this.getInitialPayload(payload) as getPlayersPayload,
      opts
    ).then((r) => {
      return {
        data: r.data?.length ? r.data[0] : null,
        status: r.status,
        source: r.source,
        success: r.success,
      }
    })
  }

  getPlayers(
    payload?: RequireAtLeastOne<getPlayersPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Player[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.player,
      'getPlayers'
    )
    let clientMethod = api.getPlayers

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getPlayers ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Ambassador Data Methods   ****************************** ///

  ambassadors(
    payload?:
      | RequireAtLeastOne<getAmbassadorPayload>
      | RequireAtLeastOne<getAmbassadorsPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Ambassador[]> | Ambassador[]> {
    const options = this.options(
      payload,
      DataTypes.game,
      opts,
      'getAmbassadors'
    )
    return this.getAmbassadors(options as getAmbassadorsPayload, opts).then(
      (r) => (options.concise ? r.data : r)
    )
  }

  getAmbassador(
    payload: RequireAtLeastOne<getAmbassadorPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Ambassador>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.ambassador
    )
    const clientMethod = api.getAmbassador

    /// If the client adapter implements a direct way to retrieve a single ambassador
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getAmbassadors(
      this.getInitialPayload(payload) as getAmbassadorsPayload,
      opts
    ).then((r) => {
      return {
        data: r.data?.length ? r.data[0] : null,
        status: r.status,
        source: r.source,
        success: r.success,
      }
    })
  }

  getAmbassadors(
    payload?: RequireAtLeastOne<getAmbassadorsPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Ambassador[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.ambassador,
      'getAmbassadors'
    )
    let clientMethod = api.getAmbassadors

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getAmbassadors ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Setting Data Methods   ********************************* ///

  settings(
    payload?:
      | RequireAtLeastOne<getSettingPayload>
      | RequireAtLeastOne<getSettingsPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting[]> | Setting[]> {
    const options = this.options(payload, DataTypes.game, opts, 'getSettings')
    return this.getSettings(options as getSettingsPayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  getSetting(
    payload: RequireAtLeastOne<getSettingPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting>> {
    const { client, options, api } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.setting
    )
    const clientMethod = api.getSetting

    /// If the client adapter implements a direct way to retrieve a single setting
    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source: AvailableApis[options.source],
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getSettings(
      this.getInitialPayload(
        payload,
        undefined,
        'getSettings'
      ) as unknown as getSettingsPayload,
      opts
    ).then((r) => {
      return {
        data: r.data?.length ? r.data[0] : null,
        status: r.status,
        source: r.source,
        success: r.success,
      }
    })
  }

  getSettings(
    payload?: RequireAtLeastOne<getSettingsPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.setting,
      'getSettings'
    )
    const clientMethod = api.getSettings

    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getSettings ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Client Instance Methods   ****************************** ///

  /// Data provided by Gun Client
  data(opts: any = {}): BikeTagGunClient {
    const options = opts ?? this.biketagConfig

    if (isBikeTagCredentials(options)) {
      if (options.game) {
        return this.biketagClient.get(
          options.game
        ) as unknown as BikeTagGunClient
      } else {
        return new Gun<BikeTagGameState>(options)
      }
    }

    /// Always return a valid gun client, because we can
    return new Gun<BikeTagGameState>(options)
  }

  /// Content powered by Sanity IO Client
  content(opts: any = {}): SanityClient {
    const options = opts ?? this.sanityConfig

    if (isSanityCredentials(options)) {
      return sanityClient(options)
    }

    throw new Error('options are invalid for creating a sanity client')
  }

  /// Images powered by Imgur Client
  images(opts: any = {}): ImgurClient {
    const options = opts ?? this.imgurConfig
    if (isImgurCredentials(options)) {
      return new ImgurClient(options)
    }

    throw new Error('options are invalid for creating an imgur client')
  }

  /// Discussions powered by RedditClient
  discussions(opts: any = {}): RedditClient {
    const options = opts ?? this.redditConfig
    if (isRedditCredentials(options)) {
      /// TODO: Always return the context of a given game subreddit?
      return new RedditClient(options)
    }

    throw new Error('options are invalid for creating an imgur client')
  }

  /// Mentions powered by TwitterClient
  mentions(opts: any = {}): TwitterClient {
    const options = opts ?? this.twitterConfig
    if (isTwitterCredentials(options)) {
      return new TwitterClient(options)
    }

    throw new Error('options are invalid for creating an twitter client')
  }
}

export type { BikeTagCredentials, BikeTagConfiguration }
