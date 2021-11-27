import {
  AccessToken,
  ClientKey,
  ClientPeers,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurClientId,
  ImgurCredentials,
  RedditCredentials,
  RedditClientId,
  RedditRefreshToken,
  SanityCredentials,
  SanityProjectId,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
  CommonData,
  TwitterCredentials,
  Tag,
} from './types'
import FormData from 'form-data'
import TinyCache from 'tinycache'
import { USERAGENT } from '../client'

export const putCacheIfExists = (
  key: string,
  value: any,
  cache?: typeof TinyCache
): void => {
  if (cache) cache.put(key, value)
}

export const getCacheIfExists = (
  key: string,
  cache?: typeof TinyCache
): any => {
  if (cache) return cache.get(key)

  return null
}

export const isBase64 = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.base64 !== 'undefined'
}

export const isImageUrl = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return true
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string'
}

export const isStream = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.stream !== 'undefined'
}

export const createForm = (payload: string | Payload): FormData => {
  const form = new FormData()

  if (typeof payload === 'string') {
    form.append('image', payload)
    return form
  }

  for (const [key, value] of Object.entries(payload)) {
    const supportedUploadObjectTypes = ['base64', 'stream']
    if (supportedUploadObjectTypes.indexOf(key) !== -1) {
      if (supportedUploadObjectTypes.indexOf(payload.type as string) !== -1) {
        form.append(key, payload)
      }
    } else {
      form.append(key, value)
    }
  }
  return form
}

export const hasAccessToken = (arg: unknown): arg is AccessToken => {
  return (arg as AccessToken).accessToken !== undefined
}

export const hasClientKey = (arg: unknown): arg is ClientKey => {
  return (arg as ClientKey).clientKey !== undefined
}

export const hasSanityAccessToken = (
  arg: unknown
): arg is SanityAccessToken => {
  return (arg as SanityAccessToken).token !== undefined
}

export const hasSanityProjectId = (arg: unknown): arg is SanityProjectId => {
  return (arg as SanityProjectId).projectId !== undefined
}

export const hasImgurAccessToken = (arg: unknown): arg is ImgurAccessToken => {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export const hasImgurClientId = (arg: unknown): arg is ImgurClientId => {
  return (arg as ImgurClientId).clientId !== undefined
}

export const constructTagNumberSlug = (number: number, game = ''): string => {
  return `${game}-tag-${number}`
}

export const isImgurCredentials = (credentials: ImgurCredentials): boolean => {
  return (
    credentials?.clientId !== undefined ||
    credentials?.clientSecret !== undefined ||
    (credentials?.clientId !== undefined && credentials?.hash !== undefined)
  )
}

export const isImgurApiReady = (credentials: ImgurCredentials): boolean => {
  return credentials?.clientId !== undefined
}

export const hasRedditClientId = (arg: unknown): arg is RedditClientId => {
  return (arg as RedditClientId).clientId !== undefined
}

export const hasRedditRefreshToken = (
  arg: unknown
): arg is RedditRefreshToken => {
  return (arg as RedditRefreshToken).refreshToken !== undefined
}

export const isRedditCredentials = (
  credentials: RedditCredentials
): boolean => {
  return (
    credentials?.clientId !== undefined ||
    (credentials?.username !== undefined && credentials.password !== undefined)
  )
}

export const isRedditApiReady = (credentials: RedditCredentials): boolean => {
  return (
    credentials?.userAgent !== undefined &&
    credentials?.clientId !== undefined &&
    ((credentials?.clientSecret !== undefined &&
      credentials?.refreshToken !== undefined) ||
      (credentials?.username !== undefined &&
        credentials?.password !== undefined))
  )
}

export const isSanityCredentials = (
  credentials: SanityCredentials
): boolean => {
  return credentials?.projectId !== undefined
}

export const isSanityApiReady = (credentials: SanityCredentials): boolean => {
  return (
    credentials.projectId !== undefined &&
    credentials.dataset !== undefined &&
    credentials.token !== undefined &&
    credentials.apiVersion !== undefined
  )
}

export const isBikeTagCredentials = (
  credentials: BikeTagCredentials | Credentials
): boolean => {
  return (
    (credentials as CommonData)?.game !== undefined ||
    (credentials as ClientPeers)?.peers !== undefined ||
    ((credentials as ClientKey)?.clientToken !== undefined &&
      (credentials as ClientKey)?.clientKey !== undefined)
  )
}

export const isBikeTagApiReady = (
  credentials: BikeTagCredentials | Credentials
): boolean => {
  return (
    (credentials as ClientKey).clientToken !== undefined &&
    (credentials as ClientKey).clientKey !== undefined
  )
}

export const isBikeTagConfiguration = (
  credentials: BikeTagConfiguration
): boolean => {
  return (
    credentials.biketag !== undefined ||
    credentials.sanity !== undefined ||
    credentials.reddit !== undefined ||
    credentials.imgur !== undefined ||
    credentials.twitter !== undefined
  )
}

export const isTwitterCredentials = (
  credentials: TwitterCredentials | Credentials
): boolean => {
  return (
    credentials?.bearer_token !== undefined ||
    (credentials?.consumer_key !== undefined &&
      credentials?.consumer_secret !== undefined) ||
    (credentials?.access_token_key !== undefined &&
      credentials?.access_token_secret !== undefined)
  )
}

export const isTwitterApiReady = (
  credentials: TwitterCredentials | Credentials
): boolean => {
  return (
    credentials?.bearer_token !== undefined ||
    (credentials.consumer_secret !== undefined &&
      credentials.consumer_key !== undefined) ||
    (credentials?.access_token_key !== undefined &&
      credentials?.access_token_secret !== undefined)
  )
}

export const isTwitterConfiguration = (
  credentials: TwitterCredentials
): boolean => {
  return (
    credentials?.bearer_token !== undefined ||
    credentials?.consumer_key !== undefined ||
    credentials?.access_token_key !== undefined ||
    (credentials?.account !== undefined &&
      credentials?.consumer_key !== undefined &&
      credentials.consumer_secret !== undefined)
  )
}

export const createTwitterCredentials = (
  credentials: Partial<TwitterCredentials>,
  defaults: Partial<TwitterCredentials> = {}
): TwitterCredentials => {
  return {
    account: credentials.account ?? defaults.account,
    bearer_token: credentials.bearer_token ?? defaults.bearer_token,
    consumer_key: credentials.consumer_key ?? defaults.consumer_key,
    consumer_secret: credentials.consumer_secret ?? defaults.consumer_secret,
    access_token_key: credentials.access_token_key ?? defaults.access_token_key,
    access_token_secret:
      credentials.access_token_secret ?? defaults.access_token_secret,
  }
}

export const assignTwitterCredentials = (
  credentials: TwitterCredentials
): TwitterCredentials => {
  const twitterCredentials = isTwitterCredentials(
    credentials as TwitterCredentials
  )
    ? createTwitterCredentials(credentials)
    : undefined

  return twitterCredentials as TwitterCredentials
}

export const createImgurCredentials = (
  credentials: Partial<ImgurCredentials>,
  defaults: Partial<ImgurCredentials> = {}
): ImgurCredentials => {
  return {
    hash: credentials.hash ?? defaults.hash,
    clientId: credentials.clientId?.length
      ? credentials.clientId
      : defaults.clientId,
    clientSecret: credentials.clientSecret?.length
      ? credentials.clientSecret
      : defaults.clientSecret,
    accessToken: credentials.accessToken?.length
      ? credentials.accessToken
      : defaults.accessToken,
  }
}

export const assignImgurCredentials = (
  credentials: ImgurCredentials
): ImgurCredentials => {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? createImgurCredentials(credentials)
    : undefined

  return imgurCredentials as ImgurCredentials
}

export const createSanityCredentials = (
  credentials: Partial<SanityCredentials>,
  defaults: Partial<SanityCredentials> = {}
): SanityCredentials => {
  return {
    useCdn: credentials.token?.length
      ? false
      : credentials.useCdn ?? defaults.useCdn ?? true,
    projectId: credentials.projectId ?? defaults.projectId,
    dataset: credentials.dataset ?? defaults.dataset ?? 'development',
    token: credentials.token?.length ? credentials.token : defaults.token ?? '',
    password: credentials.password?.length
      ? credentials.password
      : defaults.password,
    username: credentials.username?.length
      ? credentials.username
      : defaults.username,
    apiVersion: credentials.apiVersion?.length
      ? credentials.apiVersion
      : defaults.apiVersion ?? '2021-06-07',
  }
}

export const assignSanityCredentials = (
  credentials: SanityCredentials
): SanityCredentials => {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? createSanityCredentials(credentials)
    : undefined

  return sanityCredentials as SanityCredentials
}

export const createRedditCredentials = (
  credentials: Partial<RedditCredentials>,
  defaults: Partial<RedditCredentials> = {}
): RedditCredentials => {
  return {
    subreddit: credentials.subreddit ?? defaults.subreddit,
    clientId: credentials.clientId ?? defaults.clientId,
    clientSecret: credentials.clientSecret?.length
      ? credentials.clientSecret
      : defaults.clientSecret,
    password: credentials.password?.length
      ? credentials.password
      : defaults.password,
    username: credentials.username?.length
      ? credentials.username
      : defaults.username,
    refreshToken: credentials.refreshToken?.length
      ? credentials.refreshToken
      : defaults.refreshToken,
    userAgent: credentials.userAgent?.length
      ? credentials.userAgent
      : defaults.userAgent ?? USERAGENT,
  }
}

export const assignRedditCredentials = (
  credentials: RedditCredentials
): RedditCredentials => {
  const RedditCredentials = isRedditCredentials(
    credentials as RedditCredentials
  )
    ? createRedditCredentials(credentials)
    : undefined

  return RedditCredentials as RedditCredentials
}

export const createBikeTagCredentials = (
  credentials: Partial<BikeTagCredentials>,
  defaults: Partial<BikeTagCredentials> = {}
): BikeTagCredentials => {
  return {
    peers: credentials.peers ?? defaults.peers,
    game: credentials.game ?? defaults.game,
    source: credentials.source ?? defaults.source,
    clientKey: credentials.clientKey?.length
      ? credentials.clientKey
      : defaults.clientKey,
    clientToken: credentials.clientToken?.length
      ? credentials.clientToken
      : defaults.clientToken,
    accessToken: credentials.accessToken?.length
      ? credentials.accessToken
      : defaults.accessToken,
  }
}

export const assignBikeTagCredentials = (
  credentials: Credentials
): BikeTagCredentials => {
  const biketagCredentials = isBikeTagCredentials(credentials as Credentials)
    ? createBikeTagCredentials(credentials)
    : undefined

  return biketagCredentials as BikeTagCredentials
}

export const assignBikeTagConfiguration = (
  config: BikeTagConfiguration
): BikeTagConfiguration => {
  const configuration: BikeTagConfiguration = {} as BikeTagConfiguration

  /// Parse individual configurations from the entire config object
  const parsedConfig = {
    biketag: assignBikeTagCredentials(config as unknown as BikeTagCredentials),
    sanity: assignSanityCredentials(config as unknown as SanityCredentials),
    imgur: assignImgurCredentials(config as unknown as ImgurCredentials),
    reddit: assignRedditCredentials(config as unknown as RedditCredentials),
    twitter: assignTwitterCredentials(config as unknown as TwitterCredentials),
  }

  /// Assign the individual configs with the parsed object plus overrides from individual configs in the passed in object
  configuration.biketag = config.biketag
    ? { ...parsedConfig.biketag, ...createBikeTagCredentials(config.biketag) }
    : parsedConfig.biketag
  configuration.sanity = config.sanity
    ? { ...parsedConfig.sanity, ...createSanityCredentials(config.sanity) }
    : parsedConfig.sanity
  configuration.imgur = config.imgur
    ? { ...parsedConfig.imgur, ...createImgurCredentials(config.imgur) }
    : parsedConfig.imgur
  configuration.reddit = config.reddit
    ? { ...parsedConfig.reddit, ...createRedditCredentials(config.reddit) }
    : parsedConfig.reddit
  configuration.twitter = config.twitter
    ? { ...parsedConfig.twitter, ...createTwitterCredentials(config.twitter) }
    : parsedConfig.twitter

  return configuration
}

export const sortTagsByTagNumber = (tags: Tag[], sort = 'new'): Tag[] => {
  let sorter = (a, b) => b.tagnumber - a.tagnumber

  if (sort !== 'new') {
    sorter = (a, b) => a.tagnumber - b.tagnumber
  }

  return tags.sort(sorter)
}
