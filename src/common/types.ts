import { ImageData } from 'imgur/dist/common/types'
export { Payload } from 'imgur/dist/common/types'
import { AvailableApis, Errors } from '../common/enums'
import { Tag, Game, Player, Setting, Achievement } from './schema'
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
  Partial<ImgurCredentials>

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
  sanity: SanityCredentials
  imgur: ImgurCredentials
}

export type PartialBikeTagConfiguration = RequireAtLeastOne<{
  biketag: Partial<BikeTagCredentials>
  sanity: Partial<SanityCredentials>
  imgur: Partial<ImgurCredentials>
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

export interface Achievements {
  [key: string]: Achievement
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
