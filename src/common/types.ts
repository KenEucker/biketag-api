import { ImageData } from 'imgur/lib/common/types'
export { Payload } from 'imgur/lib/common/types'
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

/// ****************************  S3 Credential Objects   ************************** ///
export interface S3KeyId {
  accessKeyId: string
}

export interface S3AccessKey {
  secretAccessKey: string
}

export interface S3Credentials extends S3KeyId, S3AccessKey {
  bucket: string
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
  slugs?: string[]
  fields?: string[]
  slug?: string
  tagnumbers?: number[]
  tagnumber?: number
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

/// ****************************  S3 API Objects   ********************************* ///

/// ****************************  BikeTag Configurations   ***************************** ///
export type BikeTagConfiguration = {
  biketag: BikeTagCredentials
  imgur: ImgurCredentials
  sanity: SanityCredentials
  s3: S3Credentials
}

export type PartialBikeTagConfiguration = RequireAtLeastOne<{
  biketag: Partial<BikeTagCredentials>
  imgur: Partial<ImgurCredentials>
  sanity: Partial<SanityCredentials>
  s3: Partial<S3Credentials>
}>
