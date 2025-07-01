import {
  AccessToken,
  ClientKey,
  ImgurCredentials,
  AWSCredentials,
  SanityCredentials,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
  CommonData,
  gameLongestTimeBetweenTagsData,
  PlayerStreakData,
  StreakData,
  GameHighestNumberTagsPerNumberDaysData,
  PlayerHighestNumberTagsPerDayData,
} from './types'
import FormData from 'form-data'
import TinyCache from 'tinycache'
import {
  Tag,
  Game,
  Player,
  Ambassador,
  Setting,
  Achievement,
  Stat,
} from './schema'
import { ApiAvailability } from './enums'
import { awsRegions, cacheKeys } from './data'

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

export const isAWSCredentials = (credentials: AWSCredentials): boolean => {
  return credentials?.accessKeyId !== undefined
}

export const isAWSApiReady = (credentials: AWSCredentials): ApiAvailability => {
  if (credentials.accessKeyId !== undefined) {
    return credentials.secretAccessKey !== undefined ? 3 : 1
  }

  return 0
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
      : (defaults.dataset ?? 'development'),
    token: credentials.token?.length
      ? credentials.token
      : (defaults.token ?? ''),
    password: credentials.password?.length
      ? credentials.password
      : defaults.password,
    username: credentials.username?.length
      ? credentials.username
      : defaults.username,
    apiVersion: credentials.apiVersion?.length
      ? credentials.apiVersion
      : (defaults.apiVersion ?? '2021-10-21'),
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

export const createAWSCredentials = (
  credentials: Partial<AWSCredentials>,
  defaults: Partial<AWSCredentials> = {}
): AWSCredentials => {
  const region = credentials.region?.length
    ? credentials.region
    : defaults.region

  let endpoint = credentials.endpoint?.length
    ? credentials.endpoint
    : defaults.endpoint

  if (!endpoint && region && awsRegions.indexOf(region) === -1) {
    endpoint = `https://${region}.digitaloceanspaces.com`
  }

  return {
    accessKeyId:
      credentials.accessKeyId?.length > 0
        ? credentials.accessKeyId
        : defaults.accessKeyId,
    secretAccessKey:
      credentials.secretAccessKey?.length > 0
        ? credentials.secretAccessKey
        : defaults.secretAccessKey,
    region,
    endpoint,
  }
}

export const assignAWSCredentials = (
  credentials: AWSCredentials,
  defaults?: Partial<AWSCredentials>
): AWSCredentials => {
  const awsCredentials = isAWSCredentials(credentials as AWSCredentials)
    ? createAWSCredentials(credentials, defaults)
    : defaults

  return awsCredentials as AWSCredentials
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
    aws: assignAWSCredentials(
      config as unknown as AWSCredentials,
      defaults?.aws
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
  configuration.aws = config.aws
    ? { ...parsedConfig.aws, ...createAWSCredentials(config.aws) }
    : parsedConfig.aws
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

export const isAchievementData = (
  achievement: Partial<Achievement>
): boolean => {
  return !!achievement.name && !!achievement.key && !!achievement.description
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

export const sortStats = (stats: Stat[], sort = 'new', limit = 0): Stat[] => {
  let sorted = stats

  switch (sort) {
    case 'comments':
      sorted = stats.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'new':
      /// Since the players should already be sorted by first to last played, reverse the list
      sorted = stats.reverse()
      break
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const sortAchievements = (
  achievements: Achievement[],
  sort = 'new',
  limit = 0
): Achievement[] => {
  let sorted = achievements

  switch (sort) {
    case 'comments':
      sorted = achievements.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'new':
      /// Since the players should already be sorted by first to last played, reverse the list
      sorted = achievements.reverse()
      break
  }

  return limit !== 0 ? sorted.slice(0, limit) : sorted
}

export const getGameAlbumFromCache = async (
  gameAlbumHash: string,
  cache?: typeof TinyCache,
  fallback?: any,
  useCache = true
): Promise<any> => {
  const cacheKey = `imgur::${cacheKeys.albumHash}${gameAlbumHash}`
  const existsInCache = getCacheIfExists(cacheKey, useCache ? cache : undefined)

  if (existsInCache) {
    return existsInCache
  }

  if (fallback) {
    const putIntoCache = await fallback()
    putCacheIfExists(cacheKey, putIntoCache, cache)

    return putIntoCache
  }
}

export const getTagDate = (time: number): Date => new Date(time * 1000)
export const getTagDateISOPlusOffset = (time: number, offset = 'Z'): string =>
  `${new Date(time * 1000).toISOString().slice(0, -1)}${
    offset?.length ? offset : 'Z'
  }`

export const convertMiliseconds = (
  miliseconds: number,
  format: string
): number | { d: number; h: number; m: number; s: number } => {
  const total_seconds = Math.floor(miliseconds / 1000)
  const total_minutes = Math.floor(total_seconds / 60)
  const total_hours = Math.floor(total_minutes / 60)
  const days = Math.floor(total_hours / 24)

  const seconds = total_seconds % 60
  const minutes = total_minutes % 60
  const hours = total_hours % 24

  switch (format) {
    case 's':
      return total_seconds
    case 'm':
      return total_minutes
    case 'h':
      return total_hours
    case 'd':
      return days
    default:
      return { d: days, h: hours, m: minutes, s: seconds }
  }
}

/**
 * Get the longest time between tags
 * @param tags The array of tags
 * @returns Time between tags data
 */
export const getLongestTimeBetweenTags = (
  tags: Tag[]
): gameLongestTimeBetweenTagsData => {
  let longestTimeBetweenTags = 0
  let startDate: Date | null = null
  let endDate: Date | null = null
  let previousTag: Tag | null = null
  let staleTagNumber = 0
  const sortedTags: Tag[] = [...tags].reverse()
  for (const tag of sortedTags) {
    if (previousTag !== null) {
      const timeBetweenTags: number = tag.mysteryTime - previousTag.mysteryTime
      if (timeBetweenTags > longestTimeBetweenTags) {
        longestTimeBetweenTags = timeBetweenTags
        startDate = new Date(previousTag.mysteryTime * 1000)
        endDate = new Date(tag.mysteryTime * 1000)
        staleTagNumber = previousTag.tagnumber
      }
    }
    previousTag = tag
  }
  return {
    timeBetweenTagsDays: convertMiliseconds(
      longestTimeBetweenTags * 1000,
      'd'
    ) as number,
    startDate,
    endDate,
    staleTagNumber,
  }
}

/**
 * Get the players data with the longest daily tag streak
 * @param players The array of players
 * @returns Array of players data with longest streak of days tagged
 */
export const getPlayersWithLongestDailyTagStreakData = (
  players: Player[]
): PlayerStreakData[] => {
  let longestStreakDays = 0
  let playerRecord: PlayerStreakData
  const playersData: PlayerStreakData[] = []
  for (const player of players) {
    if (player.name === '') {
      console.log(
        'Player has no name, and probably no real data. Ignoring player: ',
        player
      )
      continue
    }
    const playerLongestStreakData: StreakData = getTagLongestDailyStreakData(
      player.tags
    )
    if (playerLongestStreakData.longestStreakDaysCount > longestStreakDays) {
      longestStreakDays = playerLongestStreakData.longestStreakDaysCount
    }
    playerRecord = {
      playerName: player.name,
      longestStreakData: playerLongestStreakData,
    }
    playersData.push(playerRecord)
  }
  const longestStreakPlayersData: PlayerStreakData[] = []
  for (const pd of playersData) {
    if (pd.longestStreakData.longestStreakDaysCount >= longestStreakDays) {
      longestStreakPlayersData.push(pd)
    }
  }
  return longestStreakPlayersData
}

/**
 * Get the longest daily tag streak data
 * @param tags Tags to get longest streak of days with a tag data
 * @returns StreakData
 */
export const getTagLongestDailyStreakData = (tags: Tag[]): StreakData => {
  const tagDates: Date[] = getUniqueTagDates(tags)
  tagDates.sort((a, b) => a.getTime() - b.getTime())
  let streakDaysCount = 1
  let streakDaysCountLongest = 1
  let streakStartDate: Date | null = null
  let streakLongestStartDate: Date | null = null
  let streakEndDate: Date | null = null
  let previousDate: Date | null = null
  const oneDay: number = 24 * 60 * 60 * 1000
  for (const td of tagDates) {
    if (previousDate !== null) {
      // Determine if an actual (more than 1 day) streak started: Calculate the current tag
      // mysteryTime minus one day, check if same date as previous array tag mysteryTime
      const tagDateMinusOneDay: Date = new Date()
      tagDateMinusOneDay.setTime(td.getTime() - oneDay)
      if (getIsSameDay(tagDateMinusOneDay, previousDate)) {
        streakDaysCount++
        if (streakDaysCount === 2) {
          // Current streak start
          streakStartDate = previousDate
        }
        if (streakDaysCount >= streakDaysCountLongest) {
          // Current longest streak start
          streakLongestStartDate = streakStartDate
          streakDaysCountLongest = streakDaysCount
          // Current longest streak end
          streakEndDate = td
        }
      } else {
        // The streak is over
        streakDaysCount = 1
      }
    } else {
      // Set streak start/end dates for players without an actual streak (>1 day)
      streakStartDate = td
      streakEndDate = td
    }
    previousDate = td
  }
  const streakData: StreakData = {
    longestStreakDaysCount: streakDaysCountLongest,
    longestStreakStartDate:
      streakDaysCountLongest > 1 ? streakLongestStartDate : null,
    longestStreakEndDate: streakDaysCountLongest > 1 ? streakEndDate : null,
  }
  return streakData
}

/**
 * Get the unique tag dates
 * @param tags Tags to get unique tag dates
 * @returns Array of unique tag dates
 */
export const getUniqueTagDates = (tags: Tag[]): Date[] => {
  const uniqueTagDates: Date[] = []
  for (const tag of tags) {
    if (tag.mysteryTime === 0) {
      // There are some mysteryTime entries with 0 value. Ignore them.
      continue
    }
    const tagDate: Date = getTagDate(tag.mysteryTime)
    if (uniqueTagDates.length === 0) {
      uniqueTagDates.push(tagDate)
    } else {
      const isAlreadyPresent = uniqueTagDates.some((date) =>
        getIsSameDay(date, tagDate)
      )
      if (!isAlreadyPresent) {
        uniqueTagDates.push(tagDate)
      }
    }
  }
  return uniqueTagDates
}

/**
 * Check if two date objects are on the same date
 * @param d1 Date 1
 * @param d2 Date 2
 * @returns True if dates are the same
 */
export const getIsSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * Get difference in days between two Dates
 * @param d1 Date 1
 * @param d2 Date 2
 * @returns Number of days betwteen two dates
 */
export const getDaysDifference = (d1: Date, d2: Date): number => {
  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  const oneDay: number = 24 * 60 * 60 * 1000
  const diffDays = Math.ceil(timeDiff / oneDay)
  return diffDays
}

/**
 * Check if two Dates are within a range of days
 * @param d1 Date 1
 * @param d2 Date 2
 * @param days Number of days to check for range
 * @returns Number of days betwteen two dates
 */
export const getIsWithinDaysRange = (
  d1: Date,
  d2: Date,
  days: number
): boolean => {
  const diffDays = getDaysDifference(d1, d2)
  return diffDays <= days
}

/**
 * Get game highest number of tags in specified number of days
 * @param tags Tags to get highest number of tags in days data
 * @param days Number of days
 * @returns Highest number of tags per number of days data
 */
export const getGameHighestNumberTagsPerNumberDaysData = (
  tags: Tag[],
  days = 1
): GameHighestNumberTagsPerNumberDaysData => {
  let tagsPerNumberDaysHighest = 1
  let previousTagDate: Date | null = null
  let startDate: Date | null = null
  let endDate: Date | null = null
  let tagDatesInRange: Date[] = []
  let tagIsInRange = false
  let tagsPerNumberDaysData: GameHighestNumberTagsPerNumberDaysData = {
    tagCount: tagsPerNumberDaysHighest,
    dayCount: days,
    startDate: null,
    endDate: null,
  }
  const oneDay: number = 24 * 60 * 60 * 1000
  const daysBack: number[] = [...Array(days).keys()]
  const sortedTags = [...tags].reverse()
  for (const tag of sortedTags) {
    const tagDate: Date = getTagDate(tag.mysteryTime)
    if (previousTagDate !== null) {
      if (tagDatesInRange.length === 0) {
        // Initialize the array with the first date
        tagDatesInRange = [previousTagDate]
      }
      // Clone the array so it can be modified while iterating
      const tagDatesInRangeNew = [...tagDatesInRange]
      for (const dayBack of daysBack) {
        // Calculate the date for the number of days back in time
        const daysBackTime: number = oneDay * dayBack
        const tagDateMinusDayBack: Date = new Date()
        tagDateMinusDayBack.setTime(tagDate.getTime() - daysBackTime)
        for (const tagDateInRange of tagDatesInRange) {
          // Check if the current tagDate is within acceptable range of days
          if (getIsWithinDaysRange(tagDateInRange, tagDateMinusDayBack, days)) {
            tagDatesInRangeNew.push(tagDate)
            tagIsInRange = true
            // Quit checking if it is in acceptable range of days
            break
          } else {
            // Remove the old index that is no longer in the sliding range window
            const indexNotInRangeDate =
              tagDatesInRangeNew.indexOf(tagDateInRange)
            tagDatesInRangeNew.splice(indexNotInRangeDate, 1)
            tagIsInRange = false
          }
        }
        if (tagIsInRange) {
          // Quit checking if it is already confirmed to be in range
          break
        }
      }
      // Update the main array with the new one
      tagDatesInRange = tagDatesInRangeNew
      if (tagDatesInRange.length >= tagsPerNumberDaysHighest) {
        // Set stats to be reported if the previous tag number record was beat
        tagsPerNumberDaysHighest = tagDatesInRange.length
        startDate = tagDatesInRange[0]
        endDate = tagDatesInRange[tagDatesInRange.length - 1]
      }
    }
    previousTagDate = tagDate
  }
  tagsPerNumberDaysData = {
    tagCount: tagsPerNumberDaysHighest,
    dayCount: days,
    startDate: startDate,
    endDate: endDate,
  }
  return tagsPerNumberDaysData
}

/**
 * Get player's highest number of tags in one day data
 * @param player Player to get highest number of tags in one day data
 * @returns Highest number of tags per day data
 */
export const getPlayerHighestNumberTagsPerDayData = (
  player: Player
): PlayerHighestNumberTagsPerDayData => {
  const tagsPerDayData: PlayerHighestNumberTagsPerDayData = {
    playerName: player.name,
    tagCount: null,
    tagDate: null,
  }
  let tagsPerDay = 1
  let tagsPerDayHighest = 1
  let previousTagDate: Date | null = null
  for (const tag of player.tags) {
    const tagDate: Date = getTagDate(tag.mysteryTime)
    if (previousTagDate !== null && getIsSameDay(tagDate, previousTagDate)) {
      tagsPerDay++
    } else {
      tagsPerDay = 1
    }
    if (tagsPerDay > tagsPerDayHighest) {
      tagsPerDayHighest = tagsPerDay
      tagsPerDayData.tagCount = tagsPerDayHighest
      tagsPerDayData.tagDate = tagDate
    }
    previousTagDate = tagDate
  }
  return tagsPerDayData
}

/**
 * Get the players with the highest number of tags in one day data
 * @param players Players to get highest number of tags in one day data
 * @returns Count for highest number of tags in one day
 */
export const getPlayersWithHighestNumberTagsPerDayData = (
  players: Player[]
): PlayerHighestNumberTagsPerDayData[] => {
  let tagsPerDayHighest = 0
  const tagsPerDayData: PlayerHighestNumberTagsPerDayData[] = []
  const highestTagsPerDayData: PlayerHighestNumberTagsPerDayData[] = []
  for (const player of players) {
    if (player.name === '') {
      console.log(
        'Player has no name, and probably no real data. Ignoring player: ',
        player
      )
      continue
    }
    const tagsPerDayRecord: PlayerHighestNumberTagsPerDayData =
      getPlayerHighestNumberTagsPerDayData(player)
    tagsPerDayData.push(tagsPerDayRecord)
    if (
      tagsPerDayRecord.tagCount !== null &&
      tagsPerDayRecord.tagCount > tagsPerDayHighest
    ) {
      tagsPerDayHighest = tagsPerDayRecord.tagCount
    }
  }
  for (const tpdr of tagsPerDayData) {
    if (tpdr.tagCount !== null && tpdr.tagCount >= tagsPerDayHighest) {
      highestTagsPerDayData.push(tpdr)
    }
  }
  return highestTagsPerDayData
}
