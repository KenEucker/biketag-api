import {
  AccessToken,
  ClientId,
  Login,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurLogin,
  ImgurClientId,
} from './types'
import { tagDataReferenceFields } from './data'

export function isBikeTagAccessToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).accessToken !== undefined
}

export function isBikeTagClientId(arg: unknown): arg is ClientId {
  return (arg as ClientId).clientId !== undefined
}

export function isBikeTagLogin(arg: unknown): arg is Login {
  return (
    (arg as Login).clientId !== undefined &&
    (arg as Login).username !== undefined &&
    (arg as Login).password !== undefined
  )
}

export function isSanityAccessToken(arg: unknown): arg is SanityAccessToken {
  return (arg as SanityAccessToken).accessToken !== undefined
}

// export function isSanityClientId(arg: unknown): arg is SanityClientId {
//   return (arg as SanityClientId).projectId !== undefined
// }

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

export function isImgurLogin(arg: unknown): arg is ImgurLogin {
  return (
    (arg as ImgurLogin).clientId !== undefined &&
    (arg as ImgurLogin).username !== undefined &&
    (arg as ImgurLogin).password !== undefined
  )
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
