import {
  AccessToken,
  ClientKey,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurClientId,
  ImgurCredentials,
  RedditCredentials,
  RedditClientId,
  RedditRefreshToken,
  SanityCredentials,
  SanityClientId,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
} from './types'
import FormData from 'form-data'
import TinyCache from 'tinycache'

export const putCacheIfExists = (
  key: string,
  value: any,
  cache?: typeof TinyCache
) => {
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

export const isAccessToken = (arg: unknown): arg is AccessToken => {
  return (arg as AccessToken).accessToken !== undefined
}

export const isClientKey = (arg: unknown): arg is ClientKey => {
  return (arg as ClientKey).clientKey !== undefined
}

export const isSanityAccessToken = (arg: unknown): arg is SanityAccessToken => {
  return (arg as SanityAccessToken).token !== undefined
}

export const isSanityClientId = (arg: unknown): arg is SanityClientId => {
  return (arg as SanityClientId).projectId !== undefined
}

export const isImgurAccessToken = (arg: unknown): arg is ImgurAccessToken => {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export const isImgurClientId = (arg: unknown): arg is ImgurClientId => {
  return (arg as ImgurClientId).clientId !== undefined
}

export const constructTagNumberSlug = (number: number, game = ''): string => {
  return `${game}-tag-${number}`
}

export const isImgurCredentials = (credentials: ImgurCredentials): boolean => {
  return !!(
    credentials.clientId !== undefined || credentials.clientSecret !== undefined
  )
}

export const isRedditClientId = (arg: unknown): arg is RedditClientId => {
  return (arg as RedditClientId).clientId !== undefined
}

export const isRedditRefreshToken = (
  arg: unknown
): arg is RedditRefreshToken => {
  return (arg as RedditRefreshToken).refreshToken !== undefined
}

export const isRedditCredentials = (
  credentials: RedditCredentials
): boolean => {
  return !!(
    (credentials.userAgent !== undefined &&
      credentials.clientId !== undefined) ||
    (credentials.username !== undefined && credentials.password !== undefined)
  )
}

export const isSanityCredentials = (
  credentials: SanityCredentials
): boolean => {
  return !!(credentials.projectId !== undefined)
}

export const isBikeTagCredentials = (
  credentials: BikeTagCredentials | Credentials
): boolean => {
  return !!(
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
    credentials.imgur !== undefined
  )
}

export const assignImgurCredentials = (
  credentials: ImgurCredentials
): ImgurCredentials => {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        accessToken: credentials.accessToken || undefined,
      }
    : undefined

  return imgurCredentials as ImgurCredentials
}

export const assignSanityCredentials = (
  credentials: SanityCredentials
): SanityCredentials => {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? {
        projectId: credentials.projectId,
        useCdn: credentials.useCdn || true,
        dataset: credentials.dataset || 'development',
        token: credentials.token || '',
        password: credentials.password,
        username: credentials.username,
        apiVersion: credentials.apiVersion || '2021-03-25',
      }
    : undefined

  return sanityCredentials as SanityCredentials
}
export const assignRedditCredentials = (
  credentials: RedditCredentials
): RedditCredentials => {
  const RedditCredentials = isRedditCredentials(
    credentials as RedditCredentials
  )
    ? {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        password: credentials.password,
        username: credentials.username,
        refreshToken: credentials.refreshToken,
        userAgent: credentials.userAgent || 'biketag API',
      }
    : undefined

  return RedditCredentials as RedditCredentials
}

export const assignBikeTagCredentials = (
  credentials: Credentials
): Credentials => {
  const biketagCredentials = isBikeTagCredentials(credentials as Credentials)
    ? credentials
    : ({
        game: credentials.game,
        hash: credentials.hash,
      } as Credentials)

  return biketagCredentials
}

export const assignBikeTagConfiguration = (
  config: BikeTagConfiguration
): BikeTagConfiguration => {
  const configuration: BikeTagConfiguration = {} as BikeTagConfiguration

  configuration.biketag = config.biketag
    ? config.biketag
    : assignBikeTagCredentials(config as unknown as Credentials)
  configuration.sanity = config.sanity
    ? config.sanity
    : assignSanityCredentials(config as unknown as Credentials)
  configuration.imgur = config.imgur
    ? config.imgur
    : assignImgurCredentials(config as unknown as Credentials)
  configuration.reddit = config.reddit
    ? config.reddit
    : assignRedditCredentials(config as unknown as Credentials)

  return configuration
}
