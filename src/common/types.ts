import { ImageData } from 'imgur/dist/common/types'
export { Payload } from 'imgur/dist/common/types'
import { AvailableApis, Errors } from '../common/enums'
import { ImgurCredentials as ImgurApiCredentials } from 'imgur'

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

/// ****************************  Imgur Credential Objects   *************************** ///
export interface ImgurCredentials extends ImgurApiCredentials {
  hash?: string
  queuehash?: string
  archivehash?: string
}

/// ****************************  Sanity Credential Objects   ************************** ///
export interface SanityAccessToken {
  token: string
}

export interface SanityProjectId {
  projectId: string
}

export interface SanityCredentials extends SanityAccessToken, SanityProjectId {
  dataset: string
  apiVersion: '2021-10-21' | string
  useCdn: boolean
  username: string
  password: string
}

export interface AWSCredentials {
  accessKeyId?: string
  secretAccessKey?: string
}

/// ****************************  BikeTag Credential Objects   ************************* ///
export interface CommonData {
  game: string
  host?: string
  source?: AvailableApis | string
  concise?: boolean
  cached?: boolean
}

export type CommonPayloadData = CommonData
export interface AccessToken {
  accessToken: string
}
export interface ClientKey {
  clientKey: string
  clientToken: string
}

export interface BikeTagCredentials
  extends ClientKey,
    AccessToken,
    CommonData {}

export type Credentials = Partial<BikeTagCredentials> &
  Partial<SanityCredentials> &
  Partial<AWSCredentials> &
  Partial<ImgurCredentials>

/// ****************************  BikeTag API Objects   ******************************** ///
export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean,
> {
  data: T
  status: number
  success: boolean
  source: AvailableApis | string
  error?: Errors | string
}

export type ApiOptions = RequireAtLeastOne<{
  game: string
  source: AvailableApis | string
  hash?: string
  host?: string
  queuehash?: string
  archivehash?: string
  fields?: string[]
  slug?: string
  slugs?: string[]
  tagnumber?: number
  tagnumbers?: number[]
  name?: string
  names?: string[]
  account?: string
  concise?: boolean
  cached?: boolean
}>

/// ****************************  Imgur API Objects   ********************************** ///
export type ImgurImage = Pick<
  ImageData,
  'id' | 'description' | 'title' | 'link' | 'datetime'
>

/// ****************************  Sanity API Objects   ********************************* ///
export type geopoint = {
  lat: number
  long: number
  alt: number
}

/// ****************************  BikeTag Configurations   ***************************** ///
export type BikeTagConfiguration = {
  biketag: BikeTagCredentials
  aws: AWSCredentials
  imgur: ImgurCredentials
  sanity: SanityCredentials
}

export type PartialBikeTagConfiguration = RequireAtLeastOne<{
  biketag: Partial<BikeTagCredentials>
  aws: Partial<AWSCredentials>
  imgur: Partial<ImgurCredentials>
  sanity: Partial<SanityCredentials>
}>

/// ****************************  BikeTag Stats Types   ***************************** ///

export interface GameHighestNumberTagsPerNumberDaysData {
  tagCount: number
  dayCount: number
  startDate: Date | null
  endDate: Date | null
}

export interface PlayerHighestNumberTagsPerDayData {
  playerName: string
  tagCount: number | null
  tagDate: Date | null
}

export interface StreakData {
  longestStreakDaysCount: number
  longestStreakStartDate: Date | null
  longestStreakEndDate: Date | null
}

export interface PlayerStreakData {
  playerName: string
  longestStreakData: StreakData
}

export interface gameLongestTimeBetweenTagsData {
  timeBetweenTagsDays: number
  startDate: Date | null
  staleTagNumber: number
  endDate: Date | null
}

export interface StatsReportData {
  playersWithMostTagsInOneDay: PlayerHighestNumberTagsPerDayData[]
  playersWithLongestTagStreakDaysData: PlayerStreakData[]
  gameTotalNumberOfPlayers: number
  gameTotalNumberOfTags: number
  gameHighestNumberTagsPerOneDayData: GameHighestNumberTagsPerNumberDaysData
  gameHighestNumberTagsPerSevenDaysData: GameHighestNumberTagsPerNumberDaysData
  gameLongestDailyTagStreakData: StreakData
  gameLongestTimeBetweenTags: gameLongestTimeBetweenTagsData
}

export interface S3ImageMeta {
  url?: string
  title?: string
  description?: string
}
