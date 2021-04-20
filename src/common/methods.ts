import {
  AccessToken,
  ClientKey,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurClientId,
  ImgurCredentials,
  SanityCredentials,
  SanityClientId,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
} from './types'
import FormData from 'form-data'
import { getTagnumberFromSlugRegex } from '../common/expressions'
import TinyCache from 'tinycache'
import { cacheKeys } from '../common/data'

export function putCacheIfExists(
  key: string,
  value: any,
  cache?: typeof TinyCache
) {
  if (cache) cache.put(key, value)
}

export function getCacheIfExists(key: string, cache?: typeof TinyCache): any {
  if (cache) return cache.get(key)

  return null
}

export function isBase64(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.base64 !== 'undefined'
}

export function isImageUrl(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return true
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string'
}

export function isStream(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.stream !== 'undefined'
}

export function createForm(payload: string | Payload): FormData {
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

export function isAccessToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).clientToken !== undefined
}

export function isClientKey(arg: unknown): arg is ClientKey {
  return (arg as ClientKey).clientKey !== undefined
}

export function isSanityAccessToken(arg: unknown): arg is SanityAccessToken {
  return (arg as SanityAccessToken).accessToken !== undefined
}

export function isSanityClientId(arg: unknown): arg is SanityClientId {
  return (arg as SanityClientId).projectId !== undefined
}

export function isImgurAccessToken(arg: unknown): arg is ImgurAccessToken {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export function isImgurClientId(arg: unknown): arg is ImgurClientId {
  return (arg as ImgurClientId).clientId !== undefined
}

export function constructTagNumberSlug(number: number, game = ''): string {
  return `${game}-tag-${number}`
}

export function isImgurCredentials(credentials: ImgurCredentials): boolean {
  return !!(
    credentials.clientId !== undefined || credentials.clientSecret !== undefined
  )
}

export function isSanityCredentials(credentials: SanityCredentials): boolean {
  return !!(
    credentials.projectId !== undefined && credentials.accessToken !== undefined
  )
}

export function isBikeTagCredentials(
  credentials: BikeTagCredentials | Credentials
): boolean {
  return !!(
    credentials.clientToken !== undefined &&
    (credentials as ClientKey).clientKey !== undefined
  )
}

export function isBikeTagConfiguration(
  credentials: BikeTagConfiguration
): boolean {
  return (
    credentials.biketag !== undefined ||
    credentials.sanity !== undefined ||
    credentials.imgur !== undefined
  )
}

export function assignImgurCredentials(
  credentials: ImgurCredentials
): ImgurCredentials {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      }
    : undefined

  return imgurCredentials as ImgurCredentials
}

export function assignSanityCredentials(
  credentials: SanityCredentials
): SanityCredentials {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? {
        projectId: credentials.projectId,
        useCdn: credentials.useCdn || true,
        dataset: credentials.dataset || 'development',
        accessToken: credentials.accessToken || '',
        password: credentials.password,
        username: credentials.username,
        apiVersion: credentials.apiVersion || '2021-03-25',
      }
    : undefined

  return sanityCredentials as SanityCredentials
}

export function assignBikeTagCredentials(
  credentials: Credentials
): Credentials {
  const biketagCredentials = isBikeTagCredentials(credentials as Credentials)
    ? credentials
    : ({
        game: credentials.game,
        hash: credentials.hash,
      } as Credentials)

  return biketagCredentials
}

export function assignBikeTagConfiguration(
  config: BikeTagConfiguration
): BikeTagConfiguration {
  const configuration: BikeTagConfiguration = {} as BikeTagConfiguration

  configuration.biketag = config.biketag
    ? config.biketag
    : assignBikeTagCredentials((config as unknown) as Credentials)
  configuration.sanity = config.sanity
    ? config.sanity
    : assignSanityCredentials((config as unknown) as Credentials)
  configuration.imgur = config.imgur
    ? config.imgur
    : assignImgurCredentials((config as unknown) as Credentials)

  return configuration
}

export function getTagnumberFromSlug(
  inputText: string,
  fallback?: number,
  cache?: typeof TinyCache
): number {
  const cacheKey = `${cacheKeys.slugText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  inputText.match(getTagnumberFromSlugRegex)
  const slugText = getTagnumberFromSlugRegex.exec(inputText)

  if (!slugText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as number
  }

  const slug = parseInt((slugText[0] || '').trim())
  putCacheIfExists(cacheKey, slug, cache)

  return slug
}
