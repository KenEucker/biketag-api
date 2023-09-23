import { ImageData } from 'imgur/lib/common/types'
export { Payload } from 'imgur/lib/common/types'
import { AvailableApis, Errors } from '../common/enums'
import { Tag, Game, Player, Setting } from './schema'
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
/// ****************************  Twitter Credential Objects   ************************* ///
export interface TwitterAccessToken {
  access_token_key?: string
  access_token_secret?: string
  bearer_token?: string
}

export interface TwitterClientKey {
  consumer_key: string
  consumer_secret: string
}

export interface TwitterCredentials
  extends TwitterAccessToken,
    TwitterClientKey {
  account?: string
}

/// ****************************  Reddit Credential Objects   ************************** ///
export interface RedditRefreshToken {
  refreshToken: string
}

export interface RedditClientId {
  clientId: string
}
export interface RedditClientSecret {
  clientSecret: string
}

export interface RedditCredentials
  extends RedditRefreshToken,
    RedditClientId,
    RedditClientSecret {
  userAgent: string
  username: string
  password: string
  subreddit: string
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
  apiVersion: '2021-06-07' | string
  useCdn: boolean
  username: string
  password: string
}

/// ****************************  BikeTag Credential Objects   ************************* ///
export interface CommonData {
  game: string
  host?: string
  source?: AvailableApis | string
  concise?: boolean
  cached?: boolean
  verbose?: boolean // TODO: add verbose logging
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
  Partial<RedditCredentials> &
  Partial<ImgurCredentials> &
  Partial<TwitterCredentials>

/// ****************************  BikeTag API Objects   ******************************** ///
export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
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
  slugs?: string[]
  fields?: string[]
  slug?: string
  tagnumbers?: number[]
  tagnumber?: number
  subreddit?: string
  account?: string
  concise?: boolean
  cached?: boolean
  verbose?: boolean
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
  sanity: SanityCredentials
  reddit: RedditCredentials
  imgur: ImgurCredentials
  twitter: TwitterCredentials
}

export type PartialBikeTagConfiguration = RequireAtLeastOne<{
  biketag: Partial<BikeTagCredentials>
  sanity: Partial<SanityCredentials>
  reddit: Partial<RedditCredentials>
  imgur: Partial<ImgurCredentials>
  twitter: Partial<TwitterCredentials>
}>

/// ****************************  Gun Data State   ************************************* ///
export interface Tags {
  [key: string]: Tag
}

export interface Players {
  [key: string]: Player
}

export interface Settings {
  [key: string]: Setting
}

export type BikeTagGame = {
  game: Game
  currentTagNumber: number
  players: Players
  tags: Tags
  queue: Tags
  settings: Settings
}

export interface BikeTagGameState {
  [key: string]: BikeTagGame
}
export interface BikeTagServerConfiguration extends BikeTagConfiguration {
  host: string
}
