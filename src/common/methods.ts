import {
  AccessToken,
  ClientKey,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurClientId,
  ImgurCredentials,
  SanityCredentials,
  SanityClientId,
  BikeTagCredentials,
} from './types'
import { tagDataReferenceFields } from './data'

export function isAccessToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).clientToken !== undefined
}

export function isClientKey(arg: unknown): arg is ClientKey {
  return (arg as ClientKey).clientKey !== undefined
}

export function isSanityAccessToken(arg: unknown): arg is SanityAccessToken {
  return (arg as SanityAccessToken).accessToken !== undefined
}

export function isSanityClientId(arg: unknown): arg is SanityClientId {
  return (arg as SanityClientId).projectId !== undefined
}

// export function isSanityLogin(arg: unknown): arg is SanityLogin {
//   return (
//     (arg as SanityLogin).projectId !== undefined &&
//     (arg as SanityLogin).username !== undefined &&
//     (arg as SanityLogin).password !== undefined
//   )
// }

export function isImgurAccessToken(arg: unknown): arg is ImgurAccessToken {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export function isImgurClientId(arg: unknown): arg is ImgurClientId {
  return (arg as ImgurClientId).clientId !== undefined
}

export function constructTagDataObject(data: any, fields = []): any {
  const tagData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  tagDataReferenceFields.forEach((f) => {
    if (typeof tagData[f] !== 'undefined') {
      tagData[f] = tagData[f].name
    }
  })

  // tagData.slug = tagData.slug?.current ? tagData.slug.current : undefined // Undefined would be a problem
  tagData.slug = tagData.slug.current

  return tagData
}

export function constructTagNumberSlug(number: number, game = 'portland'): string {
  return `${game}-tag-${number}` 
}

export function isImgurCredentials(credentials: ImgurCredentials): boolean {
  return !!(credentials.clientId  !== undefined || credentials.clientSecret !== undefined)
}

export function isSanityCredentials(credentials: SanityCredentials): boolean {
  return !!(credentials.projectId !== undefined && credentials.accessToken !== undefined)
}

export function isBikeTagCredentials(credentials: BikeTagCredentials): boolean {
  return !!(credentials.clientToken !== undefined && (credentials as ClientKey).clientKey !== undefined)
}