import { BIKETAG_API_PREFIX } from './common/endpoints'
import {
  Credentials,
  Tag,
  Game,
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
  Player,
  Ambassador,
  Setting,
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
import ImgurClient from 'imgur'
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
  expressions: any = BikeTagExpressions
  getters: any = BikeTagGetters

  private fetcher: AxiosInstance
  private plainFetcher: AxiosInstance
  private cachedFetcher: AxiosInstance

  private mostAvailableApi: AvailableApis
  private biketagClient?: BikeTagGunClient
  private imgurClient?: ImgurClient
  private sanityClient?: SanityClient
  private redditClient?: RedditClient
  private twitterClient?: any
  private sanityConfig?: SanityCredentials
  private imgurConfig?: ImgurCredentials
  private redditConfig?: RedditCredentials
  private biketagConfig?: BikeTagCredentials
  private twitterConfig?: TwitterCredentials

  constructor(readonly configuration: Credentials | BikeTagConfiguration) {
    super()

    this.mostAvailableApi = undefined

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

  /// ****************************  Private Class Methods   ******************************** ///

  private getInitialPayload(
    opts: any,
    source: AvailableApis | string | undefined = this.getMostAvailableAPI()
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
        payload.source = this.getMostAvailableAPI()
        break

      default:
        payload.source = source
        break
    }

    return payload
  }

  private getDefaultOptions(
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
          options.queueHash ??
          options.hash ??
          this.imgurConfig.queueHash ??
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

    return { ...options, ...overrides }
  }

  private getAPI(
    opts: any,
    overrides: any = {},
    dataType: DataTypes = DataTypes.tag
  ) {
    const options = this.getDefaultOptions(
      this.getInitialPayload(opts),
      dataType,
      overrides
    )

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

  private getMostAvailableAPI(): AvailableApis {
    if (this.mostAvailableApi) {
      return this.mostAvailableApi
    }

    if (this.imgurConfig && this.imgurClient) {
      return (this.mostAvailableApi = AvailableApis.imgur)
    } else if (this.sanityConfig && this.sanityClient) {
      return (this.mostAvailableApi = AvailableApis.sanity)
    } else if (this.redditConfig && this.redditClient) {
      return (this.mostAvailableApi = AvailableApis.reddit)
    } else if (this.twitterConfig && this.twitterClient) {
      return (this.mostAvailableApi = AvailableApis.twitter)
    } else if (
      this.biketagConfig &&
      isBikeTagCredentials(this.biketagConfig) &&
      isBikeTagApiReady(this.biketagConfig)
    ) {
      return (this.mostAvailableApi = AvailableApis.biketag)
    }

    return null
  }

  private getPassthroughApiMethod(
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

  private getConfig(config?: BikeTagConfiguration): BikeTagConfiguration {
    return {
      biketag: config?.biketag ?? this.biketagConfig,
      sanity: config?.sanity ?? this.sanityConfig,
      imgur: config?.imgur ?? this.imgurConfig,
      reddit: config?.reddit ?? this.redditConfig,
      twitter: config?.twitter ?? this.twitterConfig,
    } as BikeTagConfiguration
  }

  private initializeClients(
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
    payload?: RequireAtLeastOne<getGamePayload> | string | undefined,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game>> {
    return this.getGame(payload, opts)
  }

  getGame(
    payload: RequireAtLeastOne<getGamePayload> | string | undefined,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game>> {
    const { client, options, api, source } = this.getAPI(
      payload,
      opts,
      DataTypes.game
    )
    const clientMethod = api.getGame

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
      throw new Error(`getGame ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Queue Methods   **************************************** ///

  queue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    return this.getQueue(payload, opts)
  }

  getQueue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { client, options, api, source } = this.getAPI(
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
      throw new Error(`getQueue ${Errors.NotImplemented} ${source}`)
    }
  }

  queueTagImage(
    payload?: RequireAtLeastOne<queueTagImagePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    /// take player information and a tag image (either found or mystery) and add it to the queue
    const { client, options, api, source } = this.getAPI(
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
    const { client, options, api, source } = this.getAPI(
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
  ): Promise<BikeTagApiResponse<Tag[]>> {
    /// TODO: determine if singular getTag or multiple getTags is intended
    return this.getTags(this.getInitialPayload(payload) as getTagsPayload, opts)
  }

  getTag(
    payload?: RequireAtLeastOne<getTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    const { client, options, api, source } = this.getAPI(payload, opts)
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
    const { client, options, api, source } = this.getAPI(payload, opts)
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
      throw new Error(`getTags ${Errors.NotImplemented} ${source}`)
    }
  }

  uploadTagImage(
    payload:
      | RequireAtLeastOne<uploadTagImagePayload>
      | RequireAtLeastOne<uploadTagImagePayload>[],
    opts?: Credentials
  ): Promise<BikeTagApiResponse<any | any[]>> {
    const { client, options, api, source } = this.getAPI(payload, opts)
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
      throw new Error(`uploadTagImage ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic update that accepts any data type
  updateTag(
    payload:
      | RequireAtLeastOne<updateTagPayload>
      | RequireAtLeastOne<updateTagPayload>[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    const { client, options, api, source } = this.getAPI(payload, opts)
    let clientMethod = api.updateTag

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTag: this.getPassthroughApiMethod(api.getTag, client),
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
      throw new Error(`updateTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic import that accepts any data type
  importTag(
    payload:
      | RequireAtLeastOne<importTagPayload>
      | RequireAtLeastOne<importTagPayload>[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { source } = this.getAPI(payload, opts)
    throw new Error(`updateTag ${Errors.NotImplemented} ${source}`)
  }

  /// TODO: change to generic delete that accepts any data type
  deleteTag(
    payload: RequireAtLeastOne<deleteTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api, source } = this.getAPI(payload, opts)
    let clientMethod = api.deleteTag

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = {
            getTag: this.getPassthroughApiMethod(api.getTag, client),
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
      throw new Error(`deleteTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /// TODO: change to generic delete that accepts any data type
  deleteTags(
    payload: RequireAtLeastOne<deleteTagsPayload> | number[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<any>> {
    const { client, options, api, source } = this.getAPI(payload, opts)
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
      throw new Error(`deleteTags ${Errors.NotImplemented} ${source}`)
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
  ): Promise<BikeTagApiResponse<Player[]>> {
    return this.getPlayers(
      this.getInitialPayload(payload) as getPlayersPayload,
      opts
    )
  }

  getPlayer(
    payload: RequireAtLeastOne<getPlayerPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Player>> {
    const { client, options, api } = this.getAPI(payload, opts)
    const clientMethod = api.getPlayer

    /// If the client adapter implements a direct way to retrieve a single player
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
    const { client, options, api, source } = this.getAPI(
      payload,
      opts,
      DataTypes.player
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
      throw new Error(`getPlayers ${Errors.NotImplemented} ${source}`)
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
  ): Promise<BikeTagApiResponse<Ambassador[]>> {
    return this.getAmbassadors(
      this.getInitialPayload(payload) as unknown as getAmbassadorsPayload,
      opts
    )
  }

  getAmbassador(
    payload: RequireAtLeastOne<getAmbassadorPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Ambassador>> {
    const { client, options, api } = this.getAPI(
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
          source: AvailableApis[options.source],
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
    const { client, options, api, source } = this.getAPI(
      payload,
      opts,
      DataTypes.ambassador
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
      throw new Error(`getAmbassadors ${Errors.NotImplemented} ${source}`)
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
  ): Promise<BikeTagApiResponse<Setting[]>> {
    return this.getSettings(
      this.getInitialPayload(payload) as unknown as getSettingsPayload,
      opts
    )
  }

  getSetting(
    payload: RequireAtLeastOne<getSettingPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting>> {
    const { client, options, api } = this.getAPI(
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
      this.getInitialPayload(payload) as unknown as getSettingsPayload,
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
    const { client, options, api, source } = this.getAPI(
      payload,
      opts,
      DataTypes.setting
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
      throw new Error(`getSettings ${Errors.NotImplemented} ${source}`)
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
