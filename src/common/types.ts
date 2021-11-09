import { Readable } from 'stream'

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

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

export interface Game {
  game: string
  source?: string
}
export interface AccessToken {
  accessToken: string
}
export interface ClientKey {
  clientKey: string
  clientToken: string
}

export type BikeTagCredentials = ClientKey & AccessToken & Game

export type Credentials = Partial<BikeTagCredentials> &
  Partial<SanityCredentials> &
  Partial<RedditCredentials> &
  Partial<ImgurCredentials>

export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
> {
  data: T
  status: number
  success: boolean
  source: 'biketag' | 'imgur' | 'sanity' | 'reddit'
}

export type ImgurImage = {
  description: string
  title: string
  link: string
  datetime: number
}

export type geopoint = {
  lat: number
  long: number
  alt: number
}

export type boundary = {
  geo: geopoint
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

interface CommonData {
  slug: string
  name: string
}
export interface TagData extends CommonData {
  tagnumber: number
  mysteryImage?: string
  mysteryImageUrl: string
  game: string
  player: string
  hint: string
  discussionUrl: string
  foundLocation: string
  gps: geopoint
  foundImage?: string
  foundImageUrl: string
}
export interface AlbumData extends CommonData {
  cover: string | null
  cover_width: number | null
  cover_height: number | null
  images: TagData[]
  images_count: number
}

export interface GameData {
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

export interface Payload {
  image?: string
  base64?: string
  type?: 'stream' | 'url' | 'base64'
  name?: string
  title?: string
  description?: string
  album?: string
  stream?: Readable
  disable_audio?: '1' | '0'
}

export type BikeTagConfiguration = {
  biketag: BikeTagCredentials
  sanity: SanityCredentials
  reddit: RedditCredentials
  imgur: ImgurCredentials
}

export type PartialBikeTagConfiguration = RequireAtLeastOne<{
  biketag: Partial<BikeTagCredentials>
  sanity: Partial<SanityCredentials>
  reddit: Partial<RedditCredentials>
  imgur: Partial<ImgurCredentials>
}>

export type BikeTagApiWrapper = {
  client: any
  api: any
  options: any
}
