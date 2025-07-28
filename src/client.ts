import {
  Game,
  Tag,
  Player,
  Ambassador,
  Setting,
  Achievement,
  Stat,
} from './common/schema'
import type {
  Credentials,
  BikeTagApiResponse,
  ImgurCredentials,
  AWSCredentials,
  SanityCredentials,
  RequireAtLeastOne,
  BikeTagCredentials,
  BikeTagConfiguration,
  PartialBikeTagConfiguration,
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
  updateGamePayload,
  getGamePayload,
  uploadTagImagePayload,
  deleteTagPayload,
  deleteTagsPayload,
  getPlayersPayload,
  getPlayerPayload,
  getSettingPayload,
  getAmbassadorPayload,
  getAmbassadorsPayload,
  getSettingsPayload,
  getQueuePayload,
  queueTagPayload,
  archiveTagPayload,
  getAchievementsPayload,
  getStatPayload,
  getStatsPayload,
  updateStatPayload,
  fetchSignedUrlPayload,
} from './common/payloads'
import {
  constructTagNumberSlug,
  assignBikeTagConfiguration,
  isImgurCredentials,
  isSanityCredentials,
  isAWSCredentials,
  isBikeTagCredentials,
  isBikeTagApiReady,
  isAWSApiReady,
  isSanityApiReady,
  isImgurApiReady,
  createBikeTagCredentials,
  createImgurCredentials,
  createAWSCredentials,
  createSanityCredentials,
} from './common/methods'
import {
  createGameObject,
  createTagObject,
  createPlayerObject,
} from './common/data'

import * as BikeTagExpressions from './common/expressions'
import * as BikeTagGetters from './common/getters'
import * as awsApi from './aws'
import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'

import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { ImgurClient } from 'imgur'
import { createClient, SanityClient } from '@sanity/client'

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { type AxiosCacheInstance, setupCache } from 'axios-cache-interceptor'
import { dequal } from 'dequal'
import { getAuthorizationHeader, getClaims } from './common/auth'
import TinyCache from 'tinycache'

const apiCache = new TinyCache()

// export const USERAGENT =
//   'biketag-api (https://github.com/keneucker/biketag-api)'
export class BikeTagClient {
  static expressions = BikeTagExpressions
  static getters = BikeTagGetters
  static createGameObject = createGameObject
  static createTagObject = createTagObject
  static createPlayerObject = createPlayerObject

  protected fetcher: AxiosInstance
  protected plainFetcher: AxiosInstance
  protected cachedFetcher: AxiosCacheInstance

  protected imgurClient?: ImgurClient
  protected sanityClient?: SanityClient
  protected awsClient?: S3Client
  protected awsConfig?: AWSCredentials
  protected sanityConfig?: SanityCredentials
  protected imgurConfig?: ImgurCredentials
  protected biketagConfig?: BikeTagCredentials

  constructor(
    readonly configuration: Credentials | PartialBikeTagConfiguration
  ) {
    this.config(configuration ?? {}, true, true)

    // headers['user-agent'] =
    //   typeof window !== 'undefined' ? undefined : USERAGENT
    const responseType = 'json'

    /// Configure separate fetching strategies: plain, authed (default), cached (authed)
    this.plainFetcher = axios.create({
      responseType,
    })

    const authenticationInterceptor = async (config) => {
      config.headers = config.headers ? config.headers : {}
      config.headers.authorization = await getAuthorizationHeader(this)
      return config
    }

    this.fetcher = axios.create({
      responseType,
    })
    this.fetcher.interceptors.request.use(
      authenticationInterceptor,
      (e: Error) => Promise.reject(e)
    )

    this.cachedFetcher = setupCache(
      axios.create({
        responseType,
      }),
      {
        ttl: 15 * 60 * 1000,
        methods: ['get', 'head'],
        staleIfError: true,
      }
    )

    this.cachedFetcher.interceptors.request.use(
      authenticationInterceptor,
      (e: Error) => Promise.reject(e)
    )
  }

  /// ****************************  protected Class Methods   ******************************** ///

  /**
   * Returns a normalized object of the payload and options for the API request from a variety of input types.
   *
   * @param opts - The options passed in from the request
   * @param source - The source type to use for the request
   * @param method - The method requested of the BikeTag API
   * @returns The API options payload object
   */
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

  /**
   * Applies defaults and overrides to an API options object based on the data
   * type being requested.
   *
   * @param options - Existing API options
   * @param dataType - The type of data the request is for
   * @param overrides - Optional values that override configuration defaults
   * @param method - Name of the method requesting options
   * @returns Normalized API options
   */
  protected getDefaultOptions(
    options: ApiOptions,
    dataType: DataTypes = DataTypes.tag,
    overrides: Partial<
      Pick<ApiOptions, 'source' | 'region' | 'host' | 'cached' | 'concise'>
    > = {},
    method?: string
  ): ApiOptions {
    // Data defaults as before...
    switch (dataType) {
      case DataTypes.game:
        options.game = options.game ?? options.slug ?? this.biketagConfig?.game
        options.slug = options.slug ?? options.game?.toLowerCase() ?? undefined
        break
      case DataTypes.achievement:
      case DataTypes.setting:
      case DataTypes.stat:
        options.game = options.game ?? options.slug ?? this.biketagConfig?.game
        break
      case DataTypes.player:
        options.game = options.game ?? this.biketagConfig?.game
        if (method === 'getPlayers') {
          options.names =
            options.names ?? (options.name ? [options.name] : undefined)
        }
        if (method === 'updatePlayer' || method === 'updatePlayers') {
          options.game = undefined
        }
        break
      case DataTypes.tag:
        options.game = options.game ?? this.biketagConfig?.game
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
              options.slug,
              undefined,
              apiCache
            )
          }
        }
        break
      case DataTypes.queue:
        options.game = options.game ?? this.biketagConfig?.game
        options.queuehash = options.queuehash ?? this.imgurConfig?.queuehash
        options.archivehash =
          options.archivehash ?? this.imgurConfig?.archivehash
        break
    }

    // Clean overrides:
    const cleanedOverrides = Object.fromEntries(
      Object.entries(overrides).filter(([_, v]) => v !== undefined)
    )

    if (
      typeof cleanedOverrides.source === 'string' &&
      cleanedOverrides.source.length
    ) {
      options.source = cleanedOverrides.source
    }

    switch (options.source) {
      case AvailableApis.imgur:
        options.hash = options.hash ?? this.imgurConfig?.hash
        options.queuehash = options.queuehash ?? this.imgurConfig?.queuehash
        options.archivehash =
          options.archivehash ?? this.imgurConfig?.archivehash
        break
      case AvailableApis.aws:
        options.region = options.region ?? this.awsConfig?.region
        break
    }

    options.host = options.host ?? this.biketagConfig?.host
    options.cached = options.cached ?? this.biketagConfig?.cached
    options.concise =
      typeof options.concise !== 'undefined' ? options.concise : true

    // SAFER: mutate options in-place instead of returning a spread
    Object.entries(cleanedOverrides).forEach(([key, value]) => {
      options[key] = value
    })

    return options
  }

  /**
   * Determines which API client and adapter should handle a request based on
   * provided options.
   *
   * @param payload - Incoming payload or options
   * @param overrides - Optional configuration overrides
   * @param dataType - Type of data being requested
   * @param method - Name of the method being invoked
   * @returns Client, api adapter and normalized options
   */
  protected getClientAdapter(
    payload: any,
    overrides: any = {},
    dataType: DataTypes = DataTypes.tag,
    method?: string
  ): any {
    const options = this.options(payload, dataType, overrides, method)

    let client: any = null
    let api: any = null

    switch (options.source) {
      case AvailableApis.sanity:
        client = this.sanityClient
        api = sanityApi
        break
      case AvailableApis.aws:
        client = this.awsClient
        api = awsApi
        break
      case AvailableApis.imgur:
        client = this.imgurClient
        api = imgurApi
        break
      default:
      case AvailableApis.biketag:
        client = this
        options.source = 'biketag'
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

  /**
   * Determines which API is currently capable of handling a particular method.
   *
   * @param method - Method name to check for availability
   * @returns The most appropriate API source or null if none are available
   */
  protected getMostAvailableClient(method?: string): AvailableApis {
    if (
      this.imgurConfig &&
      this.imgurClient &&
      (!method || !!imgurApi[method])
    ) {
      return AvailableApis.imgur
    } else if (
      this.awsConfig &&
      this.awsClient &&
      (!method || !!awsApi[method])
    ) {
      return AvailableApis.aws
    } else if (
      this.sanityConfig &&
      this.sanityClient &&
      (!method || !!sanityApi[method])
    ) {
      return AvailableApis.sanity
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
    // const bikeTagApiAvilability =
    //   this.biketagConfig &&
    //   isBikeTagCredentials(this.biketagConfig) &&
    //   isBikeTagApiReady(this.biketagConfig) &&
    //   (!method || !!biketagApi[method])
    //     ? isBikeTagApiReady(this.biketagConfig)
    //     : 0

    return null
  }

  /**
   * Creates a wrapper that forwards a call to another API method while
   * normalizing payload and options for that method.
   *
   * @param method - Method to invoke on the underlying API
   * @param client - Client instance used to execute the method
   * @param dataType - Data type of the request
   * @param binding - Optional binding context for the method
   * @returns A callable function that forwards arguments to the target method
   */
  protected getPassthroughApiMethod(
    method: any,
    client: ImgurClient | BikeTagClient | SanityClient | S3Client,
    dataType: DataTypes = DataTypes.tag,
    binding?: any
  ): any {
    const getPayload = this.getInitialPayload.bind(this)
    const getOptions = this.getDefaultOptions.bind(this)

    return function (opts, cache) {
      return method.bind(binding)(
        client,
        getOptions(getPayload(opts), dataType),
        cache
      )
    }
  }

  /**
   * Retrieves the current configuration with any supplied overrides and a list
   * of available API clients.
   *
   * @param config - Optional partial configuration to merge with defaults
   * @returns Complete configuration information
   */
  protected getConfig(config?: BikeTagConfiguration): BikeTagConfiguration {
    const availableApis = []
    if (this.awsClient) {
      availableApis.push(AvailableApis.aws)
    }
    if (this.imgurClient) {
      availableApis.push(AvailableApis.imgur)
    }
    if (this.sanityClient) {
      availableApis.push(AvailableApis.sanity)
    }

    return {
      aws: config?.aws ?? this.awsConfig,
      biketag: config?.biketag ?? this.biketagConfig,
      sanity: config?.sanity ?? this.sanityConfig,
      imgur: config?.imgur ?? this.imgurConfig,
      availableApis,
    } as BikeTagConfiguration
  }

  /**
   * Instantiates API client wrappers based on the provided configuration.
   *
   * @param config - Configuration describing credentials for each API
   * @returns The configuration used to initialize the clients
   */
  protected initializeClients(
    config?: BikeTagConfiguration
  ): BikeTagConfiguration {
    config = config ?? this.config()

    if (
      config.imgur &&
      isImgurCredentials(config.imgur) &&
      isImgurApiReady(config.imgur)
    ) {
      this.imgurClient = new ImgurClient(config.imgur)
    }
    if (
      config.aws &&
      isAWSCredentials(config.aws) &&
      isAWSApiReady(config.aws)
    ) {
      this.awsClient = new S3Client({
        credentials: config.aws,
        ...config.aws,
      } as S3ClientConfig)
    }
    if (
      config.sanity &&
      isSanityCredentials(config.sanity) &&
      isSanityApiReady(config.sanity)
    ) {
      this.sanityClient = createClient(config.sanity)
    }

    return config
  }

  /// ****************************  Generic Methods   ************************************** ///

  /**
   * Helper for generating normalized API options from arbitrary input.
   *
   * @param opts - Incoming payload or options
   * @param dataType - Optional data type the request targets
   * @param overrides - Optional overrides for configuration values
   * @param method - Name of the calling method
   * @returns Normalized API options
   */
  options(
    opts: any = {},
    dataType?: DataTypes,
    overrides: any = {},
    method?: string
  ): ApiOptions {
    return this.getDefaultOptions(
      this.getInitialPayload(opts, undefined, method),
      dataType,
      overrides,
      method
    )
  }

  /**
   * Updates the client configuration and optionally reinitializes API clients.
   *
   * @param config - Partial configuration or credentials to merge
   * @param overwrite - When true, new values overwrite existing ones
   * @param reInitialize - Recreate underlying API clients when true
   * @returns The resulting configuration
   */
  config(
    config?:
      | Partial<Credentials>
      | Partial<BikeTagConfiguration>
      | PartialBikeTagConfiguration,
    overwrite = false,
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
        const conf = parsedConfig[AvailableApis[type]]
        let createCredentialsMethod: any = createBikeTagCredentials

        switch (type) {
          case AvailableApis.imgur:
            createCredentialsMethod = createImgurCredentials
            break
          case AvailableApis.aws:
            createCredentialsMethod = createAWSCredentials
            break
          case AvailableApis.sanity:
            createCredentialsMethod = createSanityCredentials
            break
        }

        return !overwrite && this[configName] && conf
          ? createCredentialsMethod(conf, this[configName])
          : (conf ?? this[configName])
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
      const awsConfig = initClientConfig(
        AvailableApis.aws,
        parsedConfig,
        overwrite
      )

      if (reInitialize) {
        const initializeConfig: BikeTagConfiguration = {
          biketag: undefined,
          aws: undefined,
          imgur: undefined,
          sanity: undefined,
        }

        if (!dequal(this.imgurConfig, imgurConfig)) {
          initializeConfig.imgur = imgurConfig
        }
        if (!dequal(this.sanityConfig, sanityConfig)) {
          initializeConfig.sanity = sanityConfig
        }
        if (!dequal(this.awsConfig, awsConfig)) {
          initializeConfig.aws = awsConfig
        }

        this.initializeClients(initializeConfig)
      }

      this.biketagConfig = biketagConfig
      this.imgurConfig = imgurConfig
      this.sanityConfig = sanityConfig
      this.awsConfig = awsConfig
    }

    return this.getConfig()
  }

  /**
   * Performs a request using an Axios instance without authentication or cache.
   *
   * @param options - Axios request options
   * @returns The Axios response promise
   */
  plainRequest(options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.plainFetcher(options)
  }

  /**
   * Performs a request using the caching Axios instance.
   *
   * @param options - Axios request options
   * @returns The Axios response promise
   */
  cachedRequest(options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.cachedFetcher(options)
  }

  /**
   * Performs an authenticated request using the main Axios instance.
   * Normalizes GET requests so payload data becomes query parameters.
   *
   * @param options - Axios request options
   * @returns The Axios response promise
   */
  request(options: AxiosRequestConfig = {}): Promise<AxiosResponse<string>> {
    const method = options.method ? options.method.toUpperCase() : 'GET'

    // If method is GET (or null/undefined/default) and `data` is present
    if (method === 'GET' && options.data) {
      options.params = {
        ...(options.params || {}),
        ...(typeof options.data === 'object'
          ? options.data
          : { data: options.data }),
      }
      options.data = undefined
    }
    return this.fetcher(options)
  }

  /// ****************************  Authentication Methods   ******************************* ///

  /**
   * Requests a signed URL from the configured API for direct uploads.
   *
   * @param payload - Data describing the object to upload
   * @param opts - Optional credentials overriding default configuration
   */
  fetchSignedUrl(
    payload: fetchSignedUrlPayload,
    opts?: RequireAtLeastOne<Credentials>
  ) {
    const { client, api, source } = this.getClientAdapter(
      payload,
      opts,
      undefined,
      'fetchSignedUrl'
    )
    const clientMethod = api.fetchSignedUrl

    if (clientMethod) {
      return clientMethod(client, payload)
    } else {
      return Promise.reject(`fetchSignedUrl ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Retrieves credential claims using an authorization header.
   *
   * @param authorization - Optional bearer token to decode
   * @returns Decoded credential claims
   */
  fetchCredentials(authorization?: string) {
    return getClaims(this, authorization)
  }

  /// ****************************  Game Data Methods   ************************************ ///

  /**
   * Retrieves BikeTag `Game` data based on the provided payload and options
   *
   * @param payload - The getGamePayload for retrieving BikeTag `Game` data
   * @param opts - Credentials and other options for retrieving BikeTag `Game` data
   * @returns A promise that resolves to a BikeTag `Game` object
   */
  game(
    payload?: RequireAtLeastOne<getGamePayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game> | Game> {
    const options = this.options(payload, DataTypes.game, opts, 'getGame')
    return this.getGame(options as getGamePayload, opts).then((r) => {
      return options.concise ? r.data : r
    })
  }

  /**
   * Retrieves a single BikeTag `Game` from the configured API.
   *
   * @param payload - Options identifying the game
   * @param opts - Optional credentials for the request
   * @returns A response containing the game data
   */
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
      return clientMethod(client, options, apiCache)
        .then((retrievedGameResponse) => {
          if (retrievedGameResponse.success && retrievedGameResponse.data) {
            /// Set the most important game data (hash, etc)
            this.config(
              {
                game: retrievedGameResponse.data.name,
                imgur: {
                  hash: retrievedGameResponse.data.mainhash,
                  queuehash: retrievedGameResponse.data.queuehash,
                  archivehash: retrievedGameResponse.data.archivehash,
                },
              },
              false
            )
          }
          return retrievedGameResponse
        })
        .catch((e) => {
          return {
            status: HttpStatusCode.InternalServerError,
            data: null,
            error: e.code ?? e,
            success: false,
            source,
          }
        })
    } else {
      return Promise.reject(`getGame ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Retrieves all BikeTag `Game` entries regardless of game name provided.
   *
   * @param payload - The getGamePayload for retrieving BikeTag `Game` data
   * @param opts - Credentials and other options for retrieving BikeTag `Game` data
   * @returns A promise that resolves to an array of `Game` objects
   */
  getAllGames(
    payload?: RequireAtLeastOne<getGamePayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Game[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.game,
      'getGame'
    )
    const clientMethod = api.getGame
    /// If we remove the game we are looking for, we get ALL games
    options.game = undefined
    options.name = undefined
    options.slug = undefined

    if (clientMethod) {
      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    } else {
      return Promise.reject(`getAllGames ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Updates BikeTag `Game` data based on the provided payload.
   *
   * @param payload - The updateGamePayload containing new game data
   * @param opts - Credentials and other options for updating the game
   * @returns A promise that resolves to success status
   */
  updateGame(
    payload: RequireAtLeastOne<updateGamePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    let clientMethod = api.updateGame

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
        /// TODO: invalidate cache
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updateGame ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Queue Data Methods   *********************************** ///

  /**
   * Retrieves BikeTag `Tag` from the queue for a given game
   *
   * @param payload - The getQueuePayload for retrieving BikeTag `Tag` data
   * @param opts - Credentials and other options for retrieving BikeTag `Tag` data
   * @returns A promise that resolves to a BikeTag `Tag` object
   */
  queue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]> | Tag[]> {
    const options = this.options(payload, DataTypes.queue, opts, 'getQueue')
    return this.getQueue(options as getQueuePayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  /**
   * Retrieves the current queue of tags awaiting approval.
   *
   * @param payload - Options for retrieving queued tags
   * @param opts - Credentials for the request
   * @returns A response containing queued tags
   */
  getQueue(
    payload?: RequireAtLeastOne<getQueuePayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.queue
    )
    let clientMethod = api.getQueue

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
            getTags: this.getPassthroughApiMethod(
              api.getTags,
              client,
              DataTypes.queue
            ),
          })
          break
      }

      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    } else {
      return Promise.reject(`getQueue ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Queues a new tag image to be approved by game moderators.
   *
   * @param payload - Tag information and image data to queue
   * @param opts - Credentials for the request
   * @returns A response containing the queued tag
   */
  queueTag(
    payload?: RequireAtLeastOne<queueTagPayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    /// take player information and a tag image (either found or mystery) and add it to the queue
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.queue
    )
    let clientMethod = api.queueTag

    switch (options.source) {
      case AvailableApis.aws: {
        const getTags = this.getPassthroughApiMethod(api.getTags, client)
        const uploadTagImage = this.getPassthroughApiMethod(
          api.uploadTagImage,
          client,
          DataTypes.tag,
          {
            plainFetcher: this.plainFetcher,
            fetchSignedUrl: this.getPassthroughApiMethod(
              biketagApi.fetchSignedUrl,
              this
            ),
          }
        )
        clientMethod = clientMethod.bind({
          getQueue: this.getPassthroughApiMethod(api.getQueue, client),
          getTags,
          biketagUpdate: this.getPassthroughApiMethod(
            biketagApi.updateTag,
            this
          ),
          updateTag: this.getPassthroughApiMethod(
            api.updateTag,
            client,
            DataTypes.tag,
            {
              getTags,
              uploadTagImage,
            }
          ),
          uploadTagImage,
        })
        break
      }
      case AvailableApis.imgur:
        clientMethod = clientMethod.bind({
          getQueue: this.getPassthroughApiMethod(api.getQueue, client),
          getTags: this.getPassthroughApiMethod(api.getTags, client),
        })
        break
    }

    /// If the client adapter implements the method

    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    } else {
      throw `queueTag ${Errors.NotImplemented} ${source}`
    }
  }

  /// ****************************  Tag Data Methods   ************************************ ///

  /**
   * Retrieves BikeTags based on the provided payload and options for a given game
   *
   * @param payload - The getTagPayload for retrieving tags
   * @param opts - Credentials and other options for retrieving tags
   * @returns A promise that resolves to an array of tags
   */
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

  /**
   * Retrieves a single BikeTag for a given game
   *
   * @param payload - The getTagPayload for retrieving a tag
   * @param opts - Credentials and other options for retrieving a tag
   * @returns A promise that resolves to a `BikeTagApiResponse` object containing the tag data.
   */
  getTag(
    payload?: RequireAtLeastOne<getTagPayload> | number,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    const clientMethod = api.getTag

    /// If the client adapter implements a direct way to retrieve a single tag
    if (clientMethod) {
      // switch (options.source) {

      // }

      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
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

  /**
   * Retrieves BikeTags based on the provided payload and options for a given game
   *
   * @param payload - The getTagsPayload for retrieving tags
   * @param opts - Credentials and other options for retrieving tags
   * @returns A promise that resolves to an array of tags
   */
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
    const clientMethod = api.getTags

    if (clientMethod) {
      // switch (options.source) {
      // case AvailableApis.reddit:
      //   clientMethod = clientMethod.bind({
      //     images: this.images({ ...this.imgurConfig, ...opts }),
      //   })
      //   break
      // }

      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    } else {
      return Promise.reject(`getTags ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Uploads a tag image (mystery or found) for a game.
   *
   * @param payload - The uploadTagImagePayload or array of payloads
   * @param opts - Credentials for image upload
   * @returns A promise that resolves when upload completes
   */
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
    let clientMethod = api.uploadTagImage

    /// If the client adapter implements the method
    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.aws:
          clientMethod = clientMethod.bind({
            plainFetcher: this.plainFetcher,
            fetchSignedUrl: this.getPassthroughApiMethod(
              biketagApi.fetchSignedUrl,
              this
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`uploadTagImage ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Updates an existing tag for a game.
   *
   * @param payload - The updateTagPayload containing updates
   * @param opts - Credentials and other options for update
   * @returns A promise that resolves to success status
   */
  updateTag(
    payload: RequireAtLeastOne<updateTagPayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean>> {
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
        case AvailableApis.aws:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
            uploadTagImage: this.getPassthroughApiMethod(
              api.uploadTagImage,
              client,
              DataTypes.tag,
              {
                plainFetcher: this.plainFetcher,
                fetchSignedUrl: this.getPassthroughApiMethod(
                  biketagApi.fetchSignedUrl,
                  this
                ),
              }
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updateTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Archives a tag in a game.
   *
   * @param payload - The archiveTagPayload identifying the tag
   * @param opts - Credentials for archiving
   * @returns A promise that resolves to success status
   */
  archiveTag(
    payload: RequireAtLeastOne<archiveTagPayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<boolean>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts
    )
    const clientMethod = api.archiveTag

    if (clientMethod) {
      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`archiveTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Deletes a single tag for a game.
   *
   * @param payload - The deleteTagPayload identifying the tag
   * @param opts - Credentials for deletion
   * @returns A promise that resolves when deletion completes
   */
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
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`deleteTag ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Deletes multiple tags for a game.
   *
   * @param payload - The deleteTagsPayload identifying tags
   * @param opts - Credentials for deletion
   * @returns A promise that resolves when deletions complete
   */
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
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`deleteTags ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Player Data Methods   ********************************** ///

  /**
   * Retrieves BikeTag `Player` records for a game.
   *
   * @param payload - The getPlayerPayload or getPlayersPayload
   * @param opts - Credentials and other options for player retrieval
   * @returns A promise that resolves to array of players
   */
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

  /**
   * Retrieves a single player from the configured API.
   *
   * @param payload - Player identifier
   * @param opts - Credentials for the request
   * @returns The player information
   */
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
      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getPlayers(
      this.getInitialPayload(
        options,
        undefined,
        'getPlayers'
      ) as getPlayersPayload,
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

  /**
   * Retrieves multiple players from the configured API.
   *
   * @param payload - Filtering options or player names
   * @param opts - Credentials for the request
   * @returns A response containing player data
   */
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

      return clientMethod(client, options, apiCache).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getPlayers ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Updates a player record for a game.
   *
   * @param payload - The getPlayersPayload or player names
   * @param opts - Credentials and other options for update
   * @returns A promise that resolves to array of updated players
   */
  updatePlayer(
    payload?: RequireAtLeastOne<getPlayersPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Player[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.player,
      'updatePlayer'
    )
    let clientMethod = api.updatePlayer

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.imgur:
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(api.getTags, client),
          })
          break
      }

      return clientMethod(client, options, apiCache).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updatePlayer ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Ambassador Data Methods   ****************************** ///

  /**
   * Retrieves BikeTag `Ambassador` records for a game.
   *
   * @param payload - The getAmbassadorPayload or getAmbassadorsPayload
   * @param opts - Credentials and other options for retrieval
   * @returns A promise that resolves to array of ambassadors
   */
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
      DataTypes.ambassador,
      opts,
      'getAmbassadors'
    )
    return this.getAmbassadors(options as getAmbassadorsPayload, opts).then(
      (r) => (options.concise ? r.data : r)
    )
  }

  /**
   * Retrieves a single ambassador.
   *
   * @param payload - Ambassador identifier
   * @param opts - Credentials for the request
   * @returns Ambassador information
   */
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
      return clientMethod(client, options, apiCache).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getAmbassadors(
      this.getInitialPayload(
        options,
        undefined,
        'getAmbassadors'
      ) as getAmbassadorsPayload,
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

  /**
   * Retrieves multiple ambassadors.
   *
   * @param payload - Ambassador filter or identifiers
   * @param opts - Credentials for the request
   * @returns A response containing ambassadors
   */
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
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
      }

      return clientMethod(client, options, apiCache).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getAmbassadors ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Setting Data Methods   ********************************* ///

  /**
   * Retrieves BikeTag `Setting` records for a game.
   *
   * @param payload - The getSettingPayload or getSettingsPayload
   * @param opts - Credentials and other options for retrieval
   * @returns A promise that resolves to array of settings
   */
  settings(
    payload?:
      | RequireAtLeastOne<getSettingPayload>
      | RequireAtLeastOne<getSettingsPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting[]> | Setting[]> {
    const options = this.options(
      payload,
      DataTypes.setting,
      opts,
      'getSettings'
    )
    return this.getSettings(options as getSettingsPayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  /**
   * Retrieves a single application setting.
   *
   * @param payload - Setting identifier
   * @param opts - Credentials for the request
   * @returns The requested setting
   */
  getSetting(
    payload: RequireAtLeastOne<getSettingPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Setting>> {
    const { client, options, api } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.setting
    )
    let clientMethod = api.getSetting

    /// If the client adapter implements a direct way to retrieve a single setting
    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.sanity:
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source: AvailableApis[options.source],
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getSettings(
      this.getInitialPayload(
        options,
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

  /**
   * Retrieves multiple application settings.
   *
   * @param payload - Setting identifiers or filters
   * @param opts - Credentials for the request
   * @returns A response containing settings
   */
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
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getSettings ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Stats Data Methods   ********************************* ///

  /**
   * Retrieves BikeTag `Stat` records for a game.
   *
   * @param payload - The getStatPayload or getStatsPayload
   * @param opts - Credentials and other options for retrieval
   * @returns A promise that resolves to array of stats
   */
  stats(
    payload?:
      | RequireAtLeastOne<getStatPayload>
      | RequireAtLeastOne<getStatsPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Stat[]> | Stat[]> {
    const options = this.options(payload, DataTypes.stat, opts, 'getStats')
    return this.getStats(options as getStatsPayload, opts).then((r) =>
      options.concise ? r.data : r
    )
  }

  /**
   * Retrieves a single stat entry.
   *
   * @param payload - Stat identifier
   * @param opts - Credentials for the request
   * @returns The stat data
   */
  getStat(
    payload: RequireAtLeastOne<getStatPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Stat>> {
    const { client, options, api } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.stat
    )
    let clientMethod = api.getStat

    /// If the client adapter implements a direct way to retrieve a single stat
    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.sanity:
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source: AvailableApis[options.source],
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getStats(
      this.getInitialPayload(
        options,
        undefined,
        'getStats'
      ) as unknown as getStatsPayload,
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

  /**
   * Retrieves multiple stat entries from the API.
   *
   * @param payload - Stat identifiers or filters
   * @param opts - Credentials for the request
   * @returns A response containing stats
   */
  getStats(
    payload?: RequireAtLeastOne<getStatsPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Stat[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.stat,
      'getStats'
    )
    let clientMethod = api.getStats

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.aws: {
          clientMethod = clientMethod.bind({
            getTags: this.getPassthroughApiMethod(
              api.getTags,
              client,
              DataTypes.tag
            ),
            getPlayers: this.getPassthroughApiMethod(
              api.getPlayers,
              client,
              DataTypes.player
            ),
          })
          break
        }
        case AvailableApis.sanity: {
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
        }
        case AvailableApis.imgur: {
          const getTags = this.getPassthroughApiMethod(
            api.getTags,
            client,
            DataTypes.tag
          )
          clientMethod = clientMethod.bind({
            getTags,
            getPlayers: this.getPassthroughApiMethod(
              api.getPlayers,
              client,
              DataTypes.player,
              { getTags }
            ),
          })
          break
        }
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getStats ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Updates a single stat entry.
   *
   * @param payload - Stat update data
   * @param opts - Credentials for the request
   * @returns Updated stat information
   */
  updateStat(
    payload?: RequireAtLeastOne<updateStatPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Stat[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.stat,
      'updateStat'
    )
    const clientMethod = api.updateStat

    if (clientMethod) {
      return clientMethod(client, options, apiCache).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updateStat ${Errors.NotImplemented} ${source}`)
    }
  }

  /**
   * Updates one or more `Stat` records for a game.
   *
   * @param payload - The updateStatPayload or array of payloads
   * @param opts - Credentials for updating stats
   * @returns A promise that resolves to array of updated stats
   */
  updateStats(
    payload?: RequireAtLeastOne<updateStatPayload[]> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Stat[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.stat,
      'updateStats'
    )
    let clientMethod = api.updateStats

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.sanity:
          clientMethod = clientMethod.bind({
            updateStat: this.getPassthroughApiMethod(api.updateStat, client),
          })
          break
      }

      return clientMethod(client, options, apiCache).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`updateStats ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Achievement Data Methods   ********************************* ///

  /**
   * Retrieves BikeTag `Achievement` records for a game.
   *
   * @param payload - The getAchievementsPayload or achievement names
   * @param opts - Credentials and other options for retrieval
   * @returns A promise that resolves to array of achievements
   */
  achievements(
    payload?:
      | RequireAtLeastOne<getAchievementsPayload>
      | RequireAtLeastOne<getAchievementsPayload>
      | string
      | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Achievement[]> | Achievement[]> {
    const options = this.options(
      payload,
      DataTypes.achievement,
      opts,
      'getAchievements'
    )
    return this.getAchievements(options as getAchievementsPayload, opts).then(
      (r) => (options.concise ? r.data : r)
    )
  }

  /**
   * Retrieves a single achievement.
   *
   * @param payload - Achievement identifier
   * @param opts - Credentials for the request
   * @returns The achievement data
   */
  getAchievement(
    payload: RequireAtLeastOne<getAchievementsPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Achievement>> {
    const { client, options, api } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.achievement
    )
    let clientMethod = api.getAchievement

    /// If the client adapter implements a direct way to retrieve a single achievement
    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.sanity:
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return {
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source: AvailableApis[options.source],
        }
      })
    }

    /// Else, use the get all and filter method
    return this.getAchievements(
      this.getInitialPayload(
        options,
        undefined,
        'getAchievements'
      ) as unknown as getAchievementsPayload,
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

  /**
   * Retrieves multiple achievements.
   *
   * @param payload - Achievement identifiers or filters
   * @param opts - Credentials for the request
   * @returns A response containing achievements
   */
  getAchievements(
    payload?: RequireAtLeastOne<getAchievementsPayload> | string[],
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Achievement[]>> {
    const { client, options, api, source } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.achievement,
      'getAchievements'
    )
    let clientMethod = api.getAchievements

    if (clientMethod) {
      switch (options.source) {
        case AvailableApis.sanity:
          clientMethod = clientMethod.bind({
            getGame: this.getPassthroughApiMethod(
              api.getGame,
              client,
              DataTypes.game
            ),
          })
          break
      }

      return clientMethod(client, options).catch((e) => {
        return Promise.resolve({
          status: HttpStatusCode.InternalServerError,
          data: null,
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(
        `getAchievements ${Errors.NotImplemented} ${source}`
      )
    }
  }

  /// ****************************  Client Instance Methods   ****************************** ///

  /**
   * Instantiates and returns a configured S3Client instance.
   *
   * @param opts - Configuration or credentials for the S3 client
   * @returns A S3Client instance
   */
  objects(opts: any = {}): S3Client {
    const options = opts ?? this.awsConfig

    if (isAWSCredentials(options)) {
      return new S3Client(options)
    }

    throw new Error('options are invalid for creating an aws-sdk/s3 client')
  }

  /**
   * Instantiates and returns a configured SanityClient instance.
   *
   * @param opts - Configuration or credentials for the Sanity client
   * @returns A SanityClient instance
   */
  content(opts?: any): SanityClient {
    const options = opts ?? this.sanityConfig

    if (isSanityCredentials(options)) {
      return createClient(options)
    }

    throw new Error('options are invalid for creating a sanity client')
  }

  /**
   * Instantiates and returns a configured ImgurClient instance.
   *
   * @param opts - Configuration or credentials for the Imgur client
   * @returns An ImgurClient instance
   */
  images(opts?: any): ImgurClient {
    const options = opts ?? this.imgurConfig
    if (isImgurCredentials(options)) {
      return new ImgurClient(options)
    }

    throw new Error('options are invalid for creating an Imgur client')
  }
}

export type { BikeTagCredentials, BikeTagConfiguration }
