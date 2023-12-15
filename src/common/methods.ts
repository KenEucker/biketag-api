import {
  AccessToken,
  ClientKey,
  ImgurCredentials,
  SanityCredentials,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
  CommonData,
} from './types'
import FormData from 'form-data'
import TinyCache from 'tinycache'
import { Tag, Game, Player, Ambassador, Setting } from './schema'
import { ApiAvailability } from './enums'
import { cacheKeys } from './data'

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

export const isImageUrl = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return true
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string'
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

export const isImgurApiReady = (
  credentials: ImgurCredentials
): ApiAvailability => {
  if (!(credentials.clientId || credentials.hash)) {
    return 0
  } else if (credentials.accessToken) {
    return 3
  } else if (credentials.clientId && credentials.clientSecret) {
    return 2
  }

  return 1
}

export const isSanityCredentials = (
  credentials: SanityCredentials
): boolean => {
  return credentials?.projectId !== undefined
}

export const isSanityApiReady = (
  credentials: SanityCredentials
): ApiAvailability => {
  if (
    credentials.projectId !== undefined &&
    credentials.dataset !== undefined &&
    credentials.apiVersion !== undefined
  ) {
    return credentials.token !== undefined ? 3 : 1
  }

  return 0
}

export const isBikeTagCredentials = (
  credentials: BikeTagCredentials | Credentials
): boolean => {
  return (
    (credentials as CommonData)?.game !== undefined ||
    ((credentials as ClientKey)?.clientToken !== undefined &&
      (credentials as ClientKey)?.clientKey !== undefined)
  )
}

export const isBikeTagApiReady = (
  credentials: BikeTagCredentials | Credentials
): ApiAvailability => {
  return credentials ? 1 : 0
}

export const isBikeTagConfiguration = (
  credentials: BikeTagConfiguration
): boolean => {
  return (
    credentials.biketag !== undefined ||
    credentials.sanity !== undefined ||
    credentials.imgur !== undefined
  )
}

export const createImgurCredentials = (
  credentials: Partial<ImgurCredentials>,
  defaults: Partial<ImgurCredentials> = {}
): ImgurCredentials => {
  return {
    hash: credentials.hash?.length ? credentials.hash : defaults.hash,
    queuehash: credentials.queuehash?.length
      ? credentials.queuehash
      : defaults.queuehash,
    archivehash: credentials.archivehash?.length
      ? credentials.archivehash
      : defaults.archivehash,
    clientId: credentials.clientId?.length
      ? credentials.clientId
      : defaults.clientId,
    clientSecret: credentials.clientSecret?.length
      ? credentials.clientSecret
      : defaults.clientSecret,
    accessToken: credentials.accessToken?.length
      ? credentials.accessToken
      : defaults.accessToken,
    refreshToken: credentials.refreshToken?.length
      ? credentials.refreshToken
      : defaults.refreshToken,
    rapidApiHost: credentials.rapidApiHost?.length
      ? credentials.rapidApiHost
      : defaults.rapidApiHost,
    rapidApiKey: credentials.rapidApiKey?.length
      ? credentials.rapidApiKey
      : defaults.rapidApiKey,
  }
}

export const assignImgurCredentials = (
  credentials: ImgurCredentials,
  defaults: Partial<ImgurCredentials> = {}
): ImgurCredentials => {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? createImgurCredentials(credentials, defaults)
    : defaults

  return imgurCredentials as ImgurCredentials
}

export const createSanityCredentials = (
  credentials: Partial<SanityCredentials>,
  defaults: Partial<SanityCredentials> = {}
): SanityCredentials => {
  return {
    useCdn: credentials.token?.length
      ? false
      : typeof credentials.useCdn !== 'undefined'
      ? credentials.useCdn
      : typeof defaults.useCdn !== 'undefined'
      ? defaults.useCdn
      : true,
    projectId: credentials.projectId?.length
      ? credentials.projectId
      : defaults.projectId,
    dataset: credentials.dataset?.length
      ? credentials.dataset
      : defaults.dataset ?? 'development',
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
  credentials: SanityCredentials,
  defaults?: Partial<SanityCredentials>
): SanityCredentials => {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? createSanityCredentials(credentials, defaults)
    : defaults

  return sanityCredentials as SanityCredentials
}

export const createBikeTagCredentials = (
  credentials: Partial<BikeTagCredentials>,
  defaults: Partial<BikeTagCredentials> = {}
): BikeTagCredentials => {
  return {
    game: credentials.game?.length ? credentials.game : defaults.game,
    host: credentials.host?.length ? credentials.host : defaults.host,
    cached:
      typeof credentials.cached !== 'undefined'
        ? credentials.cached
        : defaults.cached,
    source: credentials.source?.length ? credentials.source : defaults.source,
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
  credentials: Credentials,
  defaults?: Partial<Credentials>
): BikeTagCredentials => {
  const biketagCredentials = isBikeTagCredentials(credentials as Credentials)
    ? createBikeTagCredentials(credentials, defaults)
    : defaults

  return biketagCredentials as BikeTagCredentials
}

export const assignBikeTagConfiguration = (
  config: BikeTagConfiguration,
  defaults?: Partial<BikeTagConfiguration>
): BikeTagConfiguration => {
  const configuration: BikeTagConfiguration = {} as BikeTagConfiguration

  /// Parse individual configurations from the entire config object
  const parsedConfig = {
    biketag: assignBikeTagCredentials(
      config as unknown as BikeTagCredentials,
      defaults?.biketag
    ),
    sanity: assignSanityCredentials(
      config as unknown as SanityCredentials,
      defaults?.sanity
    ),
    imgur: assignImgurCredentials(
      config as unknown as ImgurCredentials,
      defaults?.imgur
    ),
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

  return configuration
}

export const isBikeTagData = (biketag: Partial<Tag>): boolean => {
  return !!biketag.tagnumber && !!biketag.game
}

export const isGameData = (ambassador: Partial<Game>): boolean => {
  return !!ambassador.name && !!ambassador.logo
}

export const isPlayerData = (player: Partial<Player>): boolean => {
  return !!player.name && !!player.bicon
}

export const isAmbassadorData = (ambassador: Partial<Ambassador>): boolean => {
  return !!ambassador.name && !!ambassador.email
}

export const isSettingData = (setting: Partial<Setting>): boolean => {
  return !!setting.name && !!setting.key && !!setting.description
}

export const sortTags = (
  tags: Tag[],
  sort = 'new',
  limit = 0,
  time = 'all'
): Tag[] => {
  let sorted = tags

  switch (sort) {
    /// Leaderboard?
    case 'top':
      sorted = tags.sort((a, b) => b.tagnumber - a.tagnumber)
      break
    /// Queue
    case 'relevance':
      sorted = tags.sort((a, b) => {
        const aHasFoundImage = a?.foundImageUrl?.length
        const aHasMysteryImage = a?.mysteryImageUrl?.length
        const bHasFoundImage = b?.foundImageUrl?.length
        const bHasMysteryImage = b?.mysteryImageUrl?.length
        const aHasBothImages = aHasFoundImage && aHasMysteryImage
        const bHasBothImages = bHasFoundImage && bHasMysteryImage
        const bIsBeforeA = -1
        const aIsBeforeB = 1

        if (!aHasBothImages && !bHasBothImages) {
          /// compare individual images
          if (aHasFoundImage && bHasFoundImage) {
            return a?.foundTime - b?.foundTime
          } else if (aHasFoundImage) {
            return aIsBeforeB
          } else if (bHasFoundImage) {
            return aIsBeforeB
          }
          /// should be unreachable code
        } else if (aHasBothImages && bHasBothImages) {
          /// compare all images upload timestamps
          const firstToComplete = a?.mysteryTime - b?.mysteryTime
          return firstToComplete
        } else if (aHasBothImages && !bHasBothImages) {
          return bIsBeforeA
        } else if (!aHasBothImages && bHasBothImages) {
          return aIsBeforeB
        }

        /// should be unreachable code
        return 0
      })
      break
    /// BikeTags
    case 'new':
      sorted = tags.sort((a, b) => b?.tagnumber - a?.tagnumber)
      break
    default:
      sorted = tags.sort((a, b) => a?.tagnumber - b?.tagnumber)
      break
  }

  let timeConstraint = 0
  switch (time) {
    case 'hour':
      timeConstraint = 60 * 60 * 1000
      break
    case 'day':
      timeConstraint = 60 * 60 * 24 * 1000
      break
    case 'week':
      timeConstraint = 60 * 60 * 24 * 7 * 1000
      break
    case 'all':
    default:
      break
  }

  if (timeConstraint) {
    const afterDate = Date.now() - timeConstraint
    sorted = sorted.filter((t) => t.mysteryTime * 1000 > afterDate)
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const sortPlayers = (
  players: Player[],
  sort = 'new',
  limit = 0
): Player[] => {
  let sorted = players

  switch (sort) {
    case 'top':
      sorted = players.sort((a, b) => b.tags.length - a.tags.length)
      break
    case 'comments':
      sorted = players.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'new':
      /// Since the players should already be sorted by first to last played, reverse the list
      sorted = players.reverse()
      break
    /// Don't sort
    case 'relevance':
    default:
      break
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const sortAmbassadors = (
  ambassadors: Ambassador[],
  sort = 'new',
  limit = 0
): Ambassador[] => {
  const sorter = (a, b) => b.name.localeCompare(a.name)
  let sorted = ambassadors

  switch (sort) {
    case 'top':
      sorted = ambassadors.sort(sorter)
      break
    case 'new':
      /// Since the players should already be sorted by first to last played, reverse the list
      sorted = ambassadors.reverse()
      break
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const sortSettings = (
  settings: Setting[],
  sort = 'new',
  limit = 0
): Setting[] => {
  let sorted = settings

  switch (sort) {
    case 'comments':
      sorted = settings.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'new':
      /// Since the players should already be sorted by first to last played, reverse the list
      sorted = settings.reverse()
      break
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const getGameAlbumFromCache = async (
  gameAlbumHash: string,
  cache?: typeof TinyCache,
  fallback?: any
): Promise<any> => {
  const cacheKey = `imgur::${cacheKeys.albumHash}${gameAlbumHash}`
  const existsInCache = getCacheIfExists(cacheKey, cache)
  if (existsInCache) {
    return existsInCache
  }

  if (fallback) {
    const putIntoCache = await fallback()
    putCacheIfExists(cacheKey, putIntoCache, cache)

    return putIntoCache
  }
}
