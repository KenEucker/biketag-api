import { ImageData } from 'imgur/lib/common/types'
import { IGunChainReference } from 'gun/types/chain'
export { Payload } from 'imgur/lib/common/types'

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export enum AvailableApis {
  biketag,
  imgur,
  sanity,
  reddit,
  twitter,
}

export interface ImgurAccessToken {
  accessToken: string
}

export interface ImgurClientId {
  clientId: string
}

export interface ImgurCredentials extends ImgurAccessToken, ImgurClientId {
  hash?: string
  clientSecret: string
}
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

export interface CommonData {
  game: string
  source?: AvailableApis | string
}
export interface AccessToken {
  accessToken: string
}
export interface ClientKey {
  clientKey: string
  clientToken: string
}

export interface ClientPeers {
  peers: string[]
}

export type BikeTagCredentials = ClientPeers &
  ClientKey &
  AccessToken &
  CommonData

export type Credentials = Partial<BikeTagCredentials> &
  Partial<SanityCredentials> &
  Partial<RedditCredentials> &
  Partial<ImgurCredentials> &
  Partial<TwitterCredentials>

export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
> {
  data: T
  status: number
  success: boolean
  source: AvailableApis | string
}

export type ImgurImage = Pick<
  ImageData,
  'id' | 'description' | 'title' | 'link' | 'datetime'
>

export type geopoint = {
  lat: number
  long: number
  alt: number
}

export type boundary = {
  geo: geopoint
}

export type Setting = {
  slug: string
  name: string
  description: string
  key: string
  value: string
}

export type Region = {
  description: string
  name: string
  slug: string
  zipcode: number
}

export type Player = {
  name: string
  bicon: string
  games: string[]
  tags: string[]
}

export type Ambassador = {
  address1: string
  address2: string
  city: string
  country: string
  email: string
  name: string
  phone: string
  player: Player
  slug: string
  zipcode: number
}

export interface Tag {
  slug: string
  name: string
  tagnumber: number
  mysteryImage?: string
  mysteryImageUrl: string
  game: string
  player: string
  hint: string
  discussionUrl?: string
  mentionUrl?: string
  shareUrl?: string
  foundLocation: string
  gps: geopoint
  foundImage?: string
  foundImageUrl: string
}

export interface Game {
  name: string
  ambassadors: Ambassador[]
  boundary: boundary
  mainhash: string
  queuehash: string
  subreddit: string
  logo: string
  region: Region
  slug: string
}

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

export type BikeTagGunClient = IGunChainReference<BikeTagGameState>
