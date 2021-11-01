import { Readable } from 'stream'

export interface ImgurAccessToken {
  accessToken: string
}

export interface ImgurClientId {
  clientId: string
}

export interface ImgurCredentials extends ImgurAccessToken, ImgurClientId {
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
export interface RedditUserAgent {
  userAgent: string
}

export interface RedditCredentials
  extends RedditRefreshToken,
    RedditClientId,
    RedditUserAgent {
  clientSecret: string
  username: string
  password: string
}

export interface SanityAccessToken {
  token: string
}

export interface SanityClientId {
  projectId: string
}

export interface SanityCredentials extends SanityAccessToken, SanityClientId {
  dataset: string
  apiVersion: string
  useCdn: boolean
  username: string
  password: string
}

export interface Game {
  game: string
  hash?: string
}
export interface AccessToken extends Game {
  accessToken: string
}
export interface ClientKey extends AccessToken {
  clientKey: string
  clientToken: string
}

export type BikeTagCredentials = (ClientKey | AccessToken) & Game

export type Credentials = BikeTagCredentials &
  SanityCredentials &
  RedditCredentials &
  ImgurCredentials

export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
> {
  data: T
  status: number
  success: boolean
  source: 'biketag' | 'imgur' | 'sanity' | 'reddit'
}

export type geopoint = {
  lat: number
  long: number
  alt: number
}

export type boundary = {
  geo: geopoint
}

export type region = {
  description: string
  name: string
  slug: string
  zipcode: number
}

export type player = {
  name: string
  bicon: string
}

export type ambassador = {
  address1: string
  address2: string
  city: string
  country: string
  email: string
  name: string
  phone: string
  player: player
  slug: string
  zipcode: number
}

interface CommonData {
  slug: string
  name: string
}
export interface TagData extends CommonData {
  tagnumber: number
  mysteryImage: string
  mysteryImageUrl: string
  game: string
  player: string
  hint: string
  discussionUrl: string
  foundLocation: string
  gps: geopoint
  foundImage: string
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
  ambassadors: ambassador[]
  boundary: boundary
  logo: string
  region: region
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
  biketag: Credentials
  sanity: SanityCredentials
  reddit: RedditCredentials
  imgur: ImgurCredentials
}

export type BikeTagApiWrapper = {
  client: any
  api: any
  options: any
}
