import {
  AccessToken,
  ClientKey,
  SanityAccessToken,
  ImgurAccessToken,
  ImgurClientId,
  ImgurCredentials,
  SanityCredentials,
  SanityClientId,
  Credentials,
  BikeTagCredentials,
  Payload,
  BikeTagConfiguration,
  TagData,
} from './types'
import FormData from 'form-data'
import {
  getTagnumberFromSlugRegex,
  getImgurImageHashFromUrl,
} from '../common/expressions'
import TinyCache from 'tinycache'
import { cacheKeys } from '../common/data'

/// TODO: implement a cache here, instead of this
const cache = {
  get: (key: string) => null,
  set: (key: string, value: any) => true,
}

export const putCacheIfExists = (
  key: string,
  value: any,
  cache?: typeof TinyCache
) => {
  if (cache) cache.put(key, value)
}

export const getCacheIfExists = (
  key: string,
  cache?: typeof TinyCache
): any => {
  if (cache) return cache.get(key)

  return null
}

export const isBase64 = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.base64 !== 'undefined'
}

export const isImageUrl = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return true
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string'
}

export const isStream = (payload: string | Payload): boolean => {
  if (typeof payload === 'string') {
    return false
  }

  return typeof payload.stream !== 'undefined'
}

export const createForm = (payload: string | Payload): FormData => {
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

export const isAccessToken = (arg: unknown): arg is AccessToken => {
  return (arg as AccessToken).accessToken !== undefined
}

export const isClientKey = (arg: unknown): arg is ClientKey => {
  return (arg as ClientKey).clientKey !== undefined
}

export const isSanityAccessToken = (arg: unknown): arg is SanityAccessToken => {
  return (arg as SanityAccessToken).token !== undefined
}

export const isSanityClientId = (arg: unknown): arg is SanityClientId => {
  return (arg as SanityClientId).projectId !== undefined
}

export const isImgurAccessToken = (arg: unknown): arg is ImgurAccessToken => {
  return (arg as ImgurAccessToken).accessToken !== undefined
}

export const isImgurClientId = (arg: unknown): arg is ImgurClientId => {
  return (arg as ImgurClientId).clientId !== undefined
}

export const constructTagNumberSlug = (number: number, game = ''): string => {
  return `${game}-tag-${number}`
}

export const isImgurCredentials = (credentials: ImgurCredentials): boolean => {
  return !!(
    credentials.clientId !== undefined || credentials.clientSecret !== undefined
  )
}

export const isSanityCredentials = (
  credentials: SanityCredentials
): boolean => {
  return !!(credentials.projectId !== undefined)
}

export const isBikeTagCredentials = (
  credentials: BikeTagCredentials | Credentials
): boolean => {
  return !!(
    (credentials as ClientKey).clientToken !== undefined &&
    (credentials as ClientKey).clientKey !== undefined
  )
}

export const isBikeTagConfiguration = (
  credentials: BikeTagConfiguration
): boolean => {
  return (
    credentials.biketag !== undefined ||
    credentials.sanity !== undefined ||
    credentials.imgur !== undefined
  )
}

export const assignImgurCredentials = (
  credentials: ImgurCredentials
): ImgurCredentials => {
  const imgurCredentials = isImgurCredentials(credentials as ImgurCredentials)
    ? {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      }
    : undefined

  return imgurCredentials as ImgurCredentials
}

export const assignSanityCredentials = (
  credentials: SanityCredentials
): SanityCredentials => {
  const sanityCredentials = isSanityCredentials(
    credentials as SanityCredentials
  )
    ? {
        projectId: credentials.projectId,
        useCdn: credentials.useCdn || true,
        dataset: credentials.dataset || 'development',
        token: credentials.token || '',
        password: credentials.password,
        username: credentials.username,
        apiVersion: credentials.apiVersion || '2021-03-25',
      }
    : undefined

  return sanityCredentials as SanityCredentials
}

export const assignBikeTagCredentials = (
  credentials: Credentials
): Credentials => {
  const biketagCredentials = isBikeTagCredentials(credentials as Credentials)
    ? credentials
    : ({
        game: credentials.game,
        hash: credentials.hash,
      } as Credentials)

  return biketagCredentials
}

export const assignBikeTagConfiguration = (
  config: BikeTagConfiguration
): BikeTagConfiguration => {
  const configuration: BikeTagConfiguration = {} as BikeTagConfiguration

  configuration.biketag = config.biketag
    ? config.biketag
    : assignBikeTagCredentials((config as unknown) as Credentials)
  configuration.sanity = config.sanity
    ? config.sanity
    : assignSanityCredentials((config as unknown) as Credentials)
  configuration.imgur = config.imgur
    ? config.imgur
    : assignImgurCredentials((config as unknown) as Credentials)

  return configuration
}

export const getTagnumberFromSlug = (
  inputText: string,
  fallback?: number,
  cache?: typeof TinyCache
): number => {
  const cacheKey = `${cacheKeys.slugText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  inputText.match(getTagnumberFromSlugRegex)
  const slugText = getTagnumberFromSlugRegex.exec(inputText)

  if (!slugText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as number
  }

  const slug = parseInt((slugText[0] || '').trim())
  putCacheIfExists(cacheKey, slug, cache)

  return slug
}

export const getTagNumbersFromText = (
  inputText: string,
  fallback?: number | number[]
): number | number[] => {
  const cacheKey = `${cacheKeys.tagNumberText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const getTagNumbersRegex = new RegExp(
    /((?:(?:bike\s*)?(?:\s*tag)?)#(\d+)(?:(?:\s*tag)?|(?:\s*proof)?))|(?:\[(?:\s*bike\s*)(?:\s*tag\s*))#?(\d+)(?:(?:\])|(?:\s*.\s*.*\]))/gi
  )
  const tagNumberText = inputText.match(getTagNumbersRegex)
  if (!tagNumberText) return fallback || []

  const tagNumbers = tagNumberText.reduce((numbers, text) => {
    const tagNumberMatches = text.match(/\d+/)
    const tagNumber =
      tagNumberMatches && tagNumberMatches.length ? tagNumberMatches[0] : null

    if (!tagNumber) return numbers

    const number = Number.parseInt(tagNumber)
    if (numbers.indexOf(number) == -1) numbers.push(number)

    return numbers
  }, [])

  if (!tagNumbers.length && fallback) {
    cache.set(cacheKey, fallback)
    return fallback
  }

  cache.set(cacheKey, tagNumbers)
  return tagNumbers
}

export const getCreditFromText = (
  inputText: string,
  fallback?: string
): string => {
  const cacheKey = `${cacheKeys.creditText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const creditRegex = new RegExp(
    /((?:\[.*)?(?:proof\s*(?:found\s*at\s*)?(?:\(.*\))?\s*by\s*)(.*)(?:\])?)|((?:\[.*)?(?:tag\s*(?:\((?:hint:)?.*\))?\s*by\s*)(.*)(?:\])?)|((?:credit goes to:\s*)(.*)(?:\s*for))/gi
  )
  const creditText = creditRegex.exec(inputText)
  if (!creditText) return fallback || null

  /// Weed out the results and get the one remaining match
  const tagCredits = creditText.filter((c) =>
    typeof c === 'string' &&
    (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
    (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
    c.indexOf('(hint:') === -1 &&
    (c.indexOf('by') === -1 || c.indexOf('by') !== 0)
      ? c
      : undefined
  )

  if (!tagCredits.length && fallback) {
    cache.set(cacheKey, fallback)
    return fallback
  }

  const credit = tagCredits[0]
  cache.set(cacheKey, credit)

  /// Return just one credit, there should only be one anyways
  return credit
}

export const getFoundLocationFromText = (
  inputText: string,
  fallback: string
): string => {
  const cacheKey = `${cacheKeys.locationText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const getFoundLocationRegex = new RegExp(
    /(?:found at \()(.+?)(?:\))|(?:\[(?:\s*bike\s*)(?:\s*tag\s*))#?(\d+)(?:(?:\])|(?:\s*.\s*(.*)\]))/gi
  )
  const foundLocationText = getFoundLocationRegex.exec(inputText)

  if (!foundLocationText) {
    fallback = fallback || null
    cache.set(cacheKey, fallback)
    return fallback
  }

  const foundLocation = (foundLocationText[1] || '').trim()
  cache.set(cacheKey, foundLocation)

  return foundLocation
}

export const getHintFromText = (
  inputText: string,
  fallback: string | string[]
): string | string[] => {
  const cacheKey = `${cacheKeys.hintText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const getTagNumbersRegex = new RegExp(/(?:hint:\s*\))/gi)
  const tagNumberText = inputText.match(getTagNumbersRegex)
  if (!tagNumberText) return fallback || null

  const tagNumbers = tagNumberText.reduce((numbers, text) => {
    const tagNumberMatches = text.match(/\d+/)
    const tagNumber =
      tagNumberMatches && tagNumberMatches.length ? tagNumberMatches[0] : null

    if (!tagNumber) return numbers

    const number = Number.parseInt(tagNumber)
    if (numbers.indexOf(number) == -1) numbers.push(number)

    return numbers
  }, [])

  if (!tagNumbers.length && fallback) {
    cache.set(cacheKey, fallback)
    return fallback
  }

  cache.set(cacheKey, tagNumbers)
  return tagNumbers
}

export const getGPSLocationFromText = (
  inputText: string,
  fallback: string
): string => {
  const cacheKey = `${cacheKeys.gpsLocationText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const getGPSLocationRegex = new RegExp(
    /(([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([N|S]),?\s*([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([E|W]))|((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?))/g
  )
  /// Normalize the text (some posts found to have this escaped double quote placed in between GPS coordinates)
  inputText = inputText.replace(/\\/g, '')
  const gpsLocationText = getGPSLocationRegex.exec(inputText)

  if (!gpsLocationText) {
    fallback = fallback || null
    cache.set(cacheKey, fallback)

    return fallback
  }

  const gpsLocation = gpsLocationText[0] || null
  cache.set(cacheKey, gpsLocation)
  return gpsLocation
}

export const getImageURLsFromText = (
  inputText: string,
  fallback: string | string[]
): string | string[] => {
  const cacheKey = `${cacheKeys.imagesText}${inputText}`
  const existingParsed = cache.get(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: make this image validator more intelligent
  const validImageURLs = ['imgur']

  const selfTextURLs =
    inputText.match(/\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s)]*\b)/gi) || []
  const tagImageURLs = selfTextURLs.reduce((urls, url) => {
    if (!url || !new RegExp(validImageURLs.join('|')).test(url)) return urls

    urls.push(url)

    return urls
  }, [])

  if (!tagImageURLs.length && fallback) {
    cache.set(cacheKey, fallback)
    return fallback
  }

  cache.set(cacheKey, tagImageURLs)
  return tagImageURLs
}

export const getBikeTagUsernameFromImgurImage = (image: any): string => {
  return getCreditFromText(image.description)
}

export const getBikeTagNumberFromImgurImage = (image: any): number => {
  return image.description ? getTagNumbersFromText(image.description)[0] : -1
}

export const getBikeTagNumberIndexFromImgurImages = (
  images: any = [],
  tagNumber = 1,
  proof = false
): number => {
  const tagNumberIndex =
    images.length + 1 - (tagNumber - (tagNumber % 2) + 1) * 2

  const verifyTagNumber = function (index) {
    if (!images[index] || !images[index].description) {
      return false
    }

    let compare = `#${tagNumber} tag`
    if (proof) {
      compare = `#${tagNumber} proof`
    }

    return index > -1 && !!images[index]
      ? images[index].description.indexOf(compare) !== -1
      : false
  }

  if (verifyTagNumber(tagNumberIndex)) {
    return tagNumberIndex
  }
  if (
    tagNumberIndex < images.length + 1 &&
    verifyTagNumber(tagNumberIndex + 1)
  ) {
    return tagNumberIndex + 1
  }
  if (tagNumberIndex > 0 && verifyTagNumber(tagNumberIndex - 1)) {
    return tagNumberIndex - 1
  }

  for (let i = 0; i < images.length; ++i) {
    if (verifyTagNumber(i)) {
      return i
    }
  }

  return -1
}

export const sortImgurImagesByTagNumber = (images: any = []): any => {
  return images.sort((image1, image2) => {
    const tagNumber1 = getBikeTagNumberFromImgurImage(image1)
    const tagNumber2 = getBikeTagNumberFromImgurImage(image2)

    const tagNumber1IsProof = tagNumber1 && tagNumber1 < 0
    const difference = Math.abs(tagNumber2) - Math.abs(tagNumber1)
    const sortResult =
      difference !== 0 ? difference : tagNumber1IsProof ? -1 : 1

    return sortResult
  })
}

export const sortImgurImagesByUploadDate = (
  images: any = [],
  newestFirst: boolean
): any => {
  if (!newestFirst) {
    return images.sort(
      (image1, image2) =>
        new Date(image2.datetime).getTime() -
        new Date(image1.datetime).getTime()
    )
  }
  return images.sort(
    (image1, image2) =>
      new Date(image1.datetime).getTime() - new Date(image2.datetime).getTime()
  )
}

export const getImgurFoundImageHashFromBikeTagData = (tag: TagData): string => {
  const regexMatches = getImgurImageHashFromUrl.exec(tag.foundImageUrl)
  return regexMatches ? regexMatches[1] : null
}
export const getImgurFoundDescriptionFromBikeTagData = (tag: TagData): string =>
  `#${tag.tagnumber} proof${
    tag.foundLocation ? ` found at (${tag.foundLocation})` : ''
  } by ${tag.player}`
export const getImgurFoundTitleFromBikeTagData = (tag: TagData): string =>
  `(${tag.gps ? tag.gps : ''})`

export const getImgurMysteryImageHashFromBikeTagData = (
  tag: TagData
): string => {
  const regexMatches = getImgurImageHashFromUrl.exec(tag.mysteryImageUrl)
  return regexMatches ? regexMatches[1] : null
}
export const getImgurMysteryTitleFromBikeTagData = (tag: TagData): string =>
  `${tag.gps ? `(${tag.gps})` : ''} {${
    tag.discussionUrl ? tag.discussionUrl : ''
  }}`
export const getImgurMysteryDescriptionFromBikeTagData = (
  tag: TagData
): string => `#${tag.tagnumber} tag (hint: ${tag.hint} ) by ${tag.player}`
