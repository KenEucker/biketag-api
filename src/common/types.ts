export interface ImgurAccessToken {
  accessToken: string
}

export interface ImgurClientId {
  clientId: string
}

export interface ImgurLogin extends ImgurClientId {
  username: string
  password: string
}

export type ImgurCredentials = ImgurAccessToken | ImgurClientId | ImgurLogin
export interface ImgurClient {
  client: any
}

export interface SanityAccessToken {
  accessToken: string
}

export interface SanityClientId {
  projectId: string
}

export interface SanityLogin extends SanityClientId {
  dataset: string
  apiVersion: string
  useCdn: boolean
  username: string
  password: string
}

export type SanityCredentials = {
  accessToken: string
  projectId: string
  dataset: string
  apiVersion: string
  useCdn: boolean
  username: string
  password: string
}

//SanityAccessToken | SanityClientId | SanityLogin
export interface SanityClient {
  client: any
}

export interface AccessToken {
  accessToken: string
}

export interface ClientId {
  clientId: string
}

export interface Login extends ClientId {
  username: string
  password: string
}

export type BikeTagCredentials = AccessToken | ClientId | Login

export type Credentials = BikeTagCredentials | SanityCredentials | ImgurCredentials | [ BikeTagCredentials | SanityCredentials | ImgurCredentials ]

export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
> {
  data: T
  status: number
  success: boolean
  source: "biketag" | "imgur" | "sanity"
}

export type geopoint = {
  lat: number
  long: number
  alt: number
}

interface CommonData {
  slug: string
  name: string  
}
export interface TagData extends CommonData {
      tagnumber: string
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

export interface Payload {
  image?: string
  video?: string
  type?: 'file' | 'url' | 'base64'
  name?: string
  title?: string
  description?: string
  album?: string
}
