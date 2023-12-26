import {
  Game,
  Tag,
  Player,
  Ambassador,
  Setting,
  Achievement,
} from './common/schema'
import {
  Credentials,
  BikeTagApiResponse,
  ImgurCredentials,
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
  importTagPayload,
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
} from './common/payloads'
import {
  constructTagNumberSlug,
  assignBikeTagConfiguration,
  isImgurCredentials,
  isSanityCredentials,
  isBikeTagCredentials,
  isBikeTagApiReady,
  isSanityApiReady,
  isImgurApiReady,
  createBikeTagCredentials,
  createImgurCredentials,
  createSanityCredentials,
} from './common/methods'
import {
  createGameObject,
  createTagObject,
  createPlayerObject,
} from './common/data'

import * as BikeTagExpressions from './common/expressions'
import * as BikeTagGetters from './common/getters'
import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'

import ImgurClient from 'imgur'
import sanityClient, { SanityClient } from '@sanity/client'

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { EventEmitter } from 'events'
import { setup } from 'axios-cache-adapter'
import { isEqual } from 'lodash'
import { getAuthorizationHeader, getClaims } from './common/auth'
import TinyCache from 'tinycache'

const apiCache = new TinyCache()

// export const USERAGENT =
//   'biketag-api (https://github.com/keneucker/biketag-api)'
export class BikeTagClient extends EventEmitter {
  static expressions = BikeTagExpressions
  static getters = BikeTagGetters
  static createGameObject = createGameObject
  static createTagObject = createTagObject
  static createPlayerObject = createPlayerObject

  protected fetcher: AxiosInstance
  protected plainFetcher: AxiosInstance
  protected cachedFetcher: AxiosInstance

  protected imgurClient?: ImgurClient
  protected sanityClient?: SanityClient
  protected sanityConfig?: SanityCredentials
  protected imgurConfig?: ImgurCredentials
  protected biketagConfig?: BikeTagCredentials

  constructor(readonly configuration: Credentials | BikeTagConfiguration) {
    super()

    const initConfig = this.config(configuration ?? {}, true, true)
    this.initializeClients(initConfig)
    const headers = {
      // 'user-agent': USERAGENT,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials': true,
    }

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
      headers,
      responseType,
    })
    this.fetcher.interceptors.request.use(
      authenticationInterceptor,
      (e: Error) => Promise.reject(e)
    )

    this.cachedFetcher = setup({
      cache: {
        maxAge: 15 * 60 * 1000,
        exclude: {
          // Only exclude PUT, PATCH and DELETE methods from cache
          methods: ['put', 'patch', 'delete'],
        },
        // Attempt reading stale cache data when response status is either 4xx or 5xx
        readOnError: (error) => {
          return error.response.status >= 400 && error.response.status < 600
        },
        // Deactivate `clearOnStale` option so that we can actually read stale cache data
        clearOnStale: false,
      },
      headers,
      responseType,
    })
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

  protected getDefaultOptions(
    options: ApiOptions,
    dataType: DataTypes = DataTypes.tag,
    overrides: any = {},
    method?: string
  ): ApiOptions {
    /// Data defaults
    switch (dataType) {
      case DataTypes.game:
        options.game = options.game ?? options.slug ?? this.biketagConfig?.game
        options.slug = options.slug ?? options.game?.toLowerCase() ?? undefined
        break

      case DataTypes.player:
        options.game = options.game ? options.game : this.biketagConfig?.game

        if (method === 'updatePlayer' || method === 'updatePlayers') {
          delete options.game
        }
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
              options.slug,
              undefined,
              apiCache
            )
          }
        }
        break
      case DataTypes.queue:
        options.game = options.game ? options.game : this.biketagConfig?.game
        options.queuehash = options.queuehash ?? this.imgurConfig?.queuehash
        options.archivehash =
          options.archivehash ?? this.imgurConfig?.archivehash
        break
    }

    if (typeof overrides.source !== 'undefined') {
      options.source = overrides.source
    }

    /// Source defaults
    switch (options.source) {
      case AvailableApis.imgur:
        options.hash = options.hash ?? this.imgurConfig.hash
        options.queuehash = options.queuehash ?? this.imgurConfig.queuehash
        options.archivehash =
          options.archivehash ?? this.imgurConfig.archivehash
        break
    }

    /// Host defaults
    options.host = options.host ?? this.biketagConfig?.host
    options.cached = options.cached ?? this.biketagConfig?.cached

    /// default option for interfaces is to return the data from the response
    options.concise =
      typeof options.concise !== 'undefined' ? options.concise : true

    return { ...options, ...overrides }
  }

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
      case AvailableApis.imgur:
        client = this.imgurClient
        api = imgurApi
        break
      default:
      case AvailableApis.biketag:
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        client = this
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

  protected getPassthroughApiMethod(
    method: any,
    client: ImgurClient | BikeTagClient | SanityClient,
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

  protected getConfig(config?: BikeTagConfiguration): BikeTagConfiguration {
    return {
      biketag: config?.biketag ?? this.biketagConfig,
      sanity: config?.sanity ?? this.sanityConfig,
      imgur: config?.imgur ?? this.imgurConfig,
    } as BikeTagConfiguration
  }

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
      config.sanity &&
      isSanityCredentials(config.sanity) &&
      isSanityApiReady(config.sanity)
    ) {
      this.sanityClient = sanityClient(config.sanity)
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
      overrides,
      method
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
          case AvailableApis.sanity:
            createCredentialsMethod = createSanityCredentials
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

      if (reInitialize) {
        const initializeConfig: BikeTagConfiguration = {
          biketag: undefined,
          imgur: undefined,
          sanity: undefined,
        }

        if (!isEqual(this.imgurConfig, imgurConfig)) {
          initializeConfig.imgur = imgurConfig
        }
        if (!isEqual(this.sanityConfig, sanityConfig)) {
          initializeConfig.sanity = sanityConfig
        }

        this.initializeClients(initializeConfig)
      }

      this.biketagConfig = biketagConfig
      this.imgurConfig = imgurConfig
      this.sanityConfig = sanityConfig
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

  submitQueuedTag(
    payload?: RequireAtLeastOne<queueTagPayload>,
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
          error: e.code ?? e,
          success: false,
          source,
        }
      })
    } else {
      throw `submitQueuedTag ${Errors.NotImplemented} ${source}`
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
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`uploadTagImage ${Errors.NotImplemented} ${source}`)
    }
  }

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

  importTag(
    payload: RequireAtLeastOne<importTagPayload>,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Tag>> {
    const { source } = this.getClientAdapter(payload, opts)
    return Promise.reject(`updateTag ${Errors.NotImplemented} ${source}`)
  }

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
        payload,
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
        payload,
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
          error: e.code ?? e,
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
          error: e.code ?? e,
          success: false,
          source,
        })
      })
    } else {
      return Promise.reject(`getSettings ${Errors.NotImplemented} ${source}`)
    }
  }

  /// ****************************  Achievement Data Methods   ********************************* ///

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
      DataTypes.game,
      opts,
      'getAchievements'
    )
    return this.getAchievements(options as getAchievementsPayload, opts).then(
      (r) => (options.concise ? r.data : r)
    )
  }

  getAchievement(
    payload: RequireAtLeastOne<getAchievementsPayload> | string,
    opts?: RequireAtLeastOne<Credentials>
  ): Promise<BikeTagApiResponse<Achievement>> {
    const { client, options, api } = this.getClientAdapter(
      payload,
      opts,
      DataTypes.setting
    )
    const clientMethod = api.getAchievement

    /// If the client adapter implements a direct way to retrieve a single setting
    if (clientMethod) {
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
        payload,
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
    const clientMethod = api.getAchievements

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
      return Promise.reject(
        `getAchievements ${Errors.NotImplemented} ${source}`
      )
    }
  }

  /// ****************************  Client Instance Methods   ****************************** ///

  /// Data provided by Gun Client
  // data(opts: any = {}): BikeTagGunClient {
  //   const options = opts ?? this.biketagConfig

  //   if (isBikeTagCredentials(options)) {
  //     if (options.game) {
  //       return this.biketagClient.get(
  //         options.game
  //       ) as unknown as BikeTagGunClient
  //     } else {
  //       return new Gun<BikeTagGameState>(options)
  //     }
  //   }

  //   /// Always return a valid gun client, because we can
  //   return new Gun<BikeTagGameState>(options)
  // }

  /// Content powered by Sanity IO Client
  content(opts?: any): SanityClient {
    const options = opts ?? this.sanityConfig

    if (isSanityCredentials(options)) {
      return sanityClient(options)
    }

    throw new Error('options are invalid for creating a sanity client')
  }

  /// Images powered by Imgur Client
  images(opts?: any): ImgurClient {
    const options = opts ?? this.imgurConfig
    if (isImgurCredentials(options)) {
      return new ImgurClient(options)
    }

    throw new Error('options are invalid for creating an Imgur client')
  }
}

export type { BikeTagCredentials, BikeTagConfiguration }
