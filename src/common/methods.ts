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
  Payload,
} from './types'
import { tagDataReferenceFields } from './data'
import FormData from 'form-data'

export function isBase64(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.base64 !== 'undefined'
}

export function isImageUrl(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return true
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string'
}

export function isStream(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.stream !== 'undefined'
}

export function createForm(payload: string | Payload): FormData {
  const form = new FormData()

  if (typeof payload === 'string') {
    form.append('image', payload)
    return form
  }

  for (const [key, value] of Object.entries(payload)) {
    const supportedUploadObjectTypes = ['base64', 'stream']
    if (supportedUploadObjectTypes.indexOf(key) !== -1) {
      if (supportedUploadObjectTypes.indexOf(payload.type as string) !== -1) {
        form.append(key, payload)
      }
    } else {
      form.append(key, value)
    }
  }
  return form
}
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

export function isImgurAccessToken(arg: unknown): arg is ImgurAccessToken {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export function isImgurClientId(arg: unknown): arg is ImgurClientId {
  return (arg as ImgurClientId).clientId !== undefined
}

export function constructTagDataObject(data: any, fields: string[] = []): any {
  const tagData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  tagDataReferenceFields.forEach((f) => {
    if (tagData[f] && typeof tagData[f] !== 'undefined') {
      tagData[f] = tagData[f].name
    }
  })

  // tagData.slug = tagData.slug?.current ? tagData.slug.current : undefined // Undefined would be a problem
  tagData.slug = tagData.slug.current

  return tagData
}

export function constructTagNumberSlug(number: number, game = ''): string {
  return `${game}-tag-${number}`
}

export function isImgurCredentials(credentials: ImgurCredentials): boolean {
  return !!(
    credentials.clientId !== undefined || credentials.clientSecret !== undefined
  )
}

export function isSanityCredentials(credentials: SanityCredentials): boolean {
  return !!(
    credentials.projectId !== undefined && credentials.accessToken !== undefined
  )
}

export function isBikeTagCredentials(credentials: BikeTagCredentials): boolean {
  return !!(
    credentials.clientToken !== undefined &&
    (credentials as ClientKey).clientKey !== undefined
  )
}

export function assignImgurCredentials(
  credentials: ImgurCredentials
): ImgurCredentials {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      }
    : undefined

  return imgurCredentials as ImgurCredentials
}

export function assignSanityCredentials(
  credentials: SanityCredentials
): SanityCredentials {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? {
        projectId: credentials.projectId,
        useCdn: credentials.useCdn || true,
        dataset: credentials.dataset || 'development',
        accessToken: credentials.accessToken || '',
        password: credentials.password,
        username: credentials.username,
        apiVersion: credentials.apiVersion || '2021-03-25',
      }
    : undefined

  return sanityCredentials as SanityCredentials
}

export function assignBikeTagCredentials(
  credentials: BikeTagCredentials
): BikeTagCredentials {
  const biketagCredentials = isBikeTagCredentials(
    credentials as BikeTagCredentials
  )
    ? credentials
    : ({ game: credentials.game } as BikeTagCredentials)

  return biketagCredentials
}

export function getImgurPictures(): any[] {
  return []
}
