import * as expressions from '../common/expressions'
import { ImgurImage, Tag } from '../common/types'
import {
  getCreditFromText,
  getImageHashFromText,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundImageHashFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
} from '../common/getters'
import { cacheKeys } from '../common/data'

import TinyCache from 'tinycache'
import {
  getCacheIfExists,
  putCacheIfExists,
  constructTagNumberSlug,
} from '../common/methods'

export interface ImgurUploadPayload {
  imageHash: string
  type?: string
  image?: string
  title: string
  description: string
  hash?: string
  album?: string
}
export type UploadTagImagePayload = Partial<Tag> & Partial<ImgurUploadPayload>

export function sortImgurImagesByUploadDate(
  images: ImgurImage[] = [],
  newestFirst: boolean
): ImgurImage[] {
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

export function getTagNumbersFromText(
  inputText: string,
  fallback: number[] | null = null,
  cache?: typeof TinyCache
): number[] {
  const cacheKey = `${cacheKeys.tagNumberText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  const tagNumberText = inputText.match(expressions.getTagNumbersFromTextRegex)
  if (!tagNumberText) return fallback || []

  const tagNumbers = tagNumberText.reduce((numbers, text) => {
    let tagNumber: any = text.match(/\d+/)
    tagNumber = tagNumber && tagNumber.length ? tagNumber[0] : null

    if (!tagNumber) return numbers

    const number: number = Number.parseInt(tagNumber)
    if (numbers.indexOf(number) == -1) numbers.push(number)

    return numbers
  }, [] as number[])

  if (!tagNumbers.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  putCacheIfExists(cacheKey, tagNumbers, cache)
  return tagNumbers
}

export function getPlayerFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string | null {
  const cacheKey = `${cacheKeys.creditText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  /// bizarre hack, do not delete line below
  inputText.match(expressions.getCreditFromTextRegex)
  const creditText = expressions.getCreditFromTextRegex.exec(inputText)
  if (!creditText) return fallback || null

  /// Weed out the results and get the one remaining match
  const tagCredits = creditText.filter((c) =>
    typeof c === 'string' &&
    (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
    (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
    c.indexOf('to:') === -1 &&
    c.indexOf('hint:') === -1 &&
    (c.indexOf('by') === -1 || c.indexOf('by') !== 0)
      ? c
      : undefined
  )

  if (!tagCredits.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const credit = tagCredits[0]
  putCacheIfExists(cacheKey, credit, cache)

  /// Return just one credit, there should only be one anyways
  return credit
}

export function getDiscussionUrlFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string {
  if (!inputText || !inputText.length) {
    return fallback
  }

  const cacheKey = `${cacheKeys.locationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  inputText.match(expressions.getDiscussionUrlFromTextRegex)
  const foundLocationText =
    expressions.getDiscussionUrlFromTextRegex.exec(inputText)

  if (!foundLocationText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as string
  }

  const foundLocation = (foundLocationText[1] || '').trim()
  putCacheIfExists(cacheKey, foundLocation, cache)

  return foundLocation
}

export function getFoundLocationFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string {
  if (!inputText || !inputText.length) {
    return fallback
  }

  const cacheKey = `${cacheKeys.locationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  inputText.match(expressions.getFoundLocationFromTextRegex)
  const foundLocationText =
    expressions.getFoundLocationFromTextRegex.exec(inputText)

  if (!foundLocationText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as string
  }

  const foundLocation = (foundLocationText[1] || '').trim()
  putCacheIfExists(cacheKey, foundLocation, cache)

  return foundLocation
}

export function getHintFromText(
  inputText: string,
  fallback?: string | null,
  cache?: typeof TinyCache
): string | null {
  const cacheKey = `${cacheKeys.hintText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  inputText.match(expressions.getHintFromTextRegex)
  const hintMatch = expressions.getHintFromTextRegex.exec(inputText)

  if (!hintMatch) {
    fallback = fallback || null
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const hint = (hintMatch[1] || '').trim()
  putCacheIfExists(cacheKey, hint, cache)

  return hint
}

export function getGPSLocationFromText(
  inputText: string,
  fallback?: string | null,
  cache?: typeof TinyCache
): string | null {
  if (!inputText || !inputText.length) {
    return fallback
  }

  const cacheKey = `${cacheKeys.gpsLocationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  /// Normalize the text (some posts found to have this escaped double quote placed in between GPS coordinates)
  inputText = inputText.replace(/\\/g, '')
  /// bizarre hack, do not delete line below
  inputText.match(expressions.getGPSLocationFromTextRegex)
  const gpsLocationText =
    expressions.getGPSLocationFromTextRegex.exec(inputText)

  if (!gpsLocationText) {
    fallback = fallback || null
    putCacheIfExists(cacheKey, fallback, cache)

    return fallback
  }

  const gpsLocation = gpsLocationText[0] || null
  putCacheIfExists(cacheKey, gpsLocation, cache)
  return gpsLocation
}

export function getBikeTagNumberFromImage(image: ImgurImage): number {
  return image.description ? getTagNumbersFromText(image.description)[0] : -1
}

export function sortImgurImagesByTagNumber(
  images: ImgurImage[] = []
): ImgurImage[] {
  return images.sort((image1, image2) => {
    const tagNumber1 = getBikeTagNumberFromImage(image1)
    const tagNumber2 = getBikeTagNumberFromImage(image2)

    const tagNumber1IsProof = tagNumber1 < 0
    const difference = Math.abs(tagNumber2) - Math.abs(tagNumber1)
    const sortResult =
      difference !== 0 ? difference : tagNumber1IsProof ? -1 : 1

    return sortResult
  })
}

export function getImgurLinksFromText(
  inputText: string,
  fallback?: string[] | null,
  cache?: typeof TinyCache
): string[] {
  const cacheKey = `${cacheKeys.imagesText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: make this image validator more intelligent
  const validImageURLs = ['imgur']

  const selfTextURLs =
    inputText.match(expressions.getImageURLsFromTextRegex) || []
  const tagImageURLs = selfTextURLs.reduce((urls, url) => {
    if (!url || !new RegExp(validImageURLs.join('|')).test(url)) return urls

    urls.push(url)

    return urls
  }, [] as string[])

  if (!tagImageURLs.length && fallback) {
    if (cache) putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  if (cache) putCacheIfExists(cacheKey, tagImageURLs, cache)
  return tagImageURLs
}

export function getBikeTagFromImgurImageSet(
  mysteryImage: ImgurImage,
  foundImage?: ImgurImage,
  opts?: any
): Tag {
  const game = opts?.game || ''
  const tagnumber = getTagNumbersFromText(mysteryImage.description)[0] as number
  const name = constructTagNumberSlug(tagnumber, game)

  const tagData: Tag = {
    tagnumber,
    name,
    slug: name,
    game,
    discussionUrl: getDiscussionUrlFromText(mysteryImage.title),
    foundLocation: getFoundLocationFromText(foundImage?.description),
    player: getPlayerFromText(mysteryImage.description) as string,
    hint: getHintFromText(mysteryImage.description) as string,
    mysteryImageUrl: mysteryImage.link,
    foundImageUrl: foundImage?.link,
    gps: {
      lat: 0,
      long: 0,
      alt: 0,
    },
  }

  return tagData
}

export const getBikeTagUsernameFromImgurImage = (
  image: ImgurImage,
  cache?: typeof TinyCache
): string => {
  return getCreditFromText(image.description, undefined, cache)
}

export const getBikeTagDiscussionLinkFromImgurImage = (
  image: ImgurImage,
  cache?: typeof TinyCache
): string | null => {
  const tagTitle = image.title || ''
  const tagDiscussionLinkIndex = tagTitle.indexOf('{')
  let tagDiscussionLink = null
  if (tagDiscussionLinkIndex !== -1) {
    const tagDisscussionSplit = tagTitle ? tagTitle.split('{') : []
    const tagDiscussionLinkLength = tagDisscussionSplit[1].indexOf('}')
    tagDiscussionLink = tagDisscussionSplit[1]
      .substr(0, tagDiscussionLinkLength)
      .trim()
  }

  return tagDiscussionLink
}

export const getBikeTagNumberFromImgurImage = (
  image: ImgurImage,
  cache?: typeof TinyCache
): number => {
  return image.description
    ? getTagNumbersFromText(image.description, undefined, cache)[0]
    : -1
}

export const getBikeTagNumberIndexFromImgurImages = (
  images: ImgurImage[] = [],
  tagNumber = 1,
  proof = false
): number => {
  const tagNumberIndex =
    images.length + 1 - (tagNumber - (tagNumber % 2) + 1) * 2

  const verifyTagNumber = function (index): boolean {
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

export const getImageHashFromImgurImage = (
  image: Partial<ImgurImage>,
  cache?: typeof TinyCache
): string => {
  return getImageHashFromText(image.link, cache)
}

export const isValidUpdatePayload = (utp: UploadTagImagePayload): boolean => {
  return (
    (typeof utp.imageHash === 'string' &&
      (typeof utp.title === 'string' || typeof utp.description === 'string')) ||
    typeof utp.title === 'string' ||
    typeof utp.description === 'string'
  )
}

export const isValidUploadTagImagePayload = (
  utp: UploadTagImagePayload
): boolean => {
  return (
    /// TODO: do better type checking here
    utp &&
    typeof utp.image !== 'undefined' &&
    (typeof utp.title === 'string' || typeof utp.description === 'string')
  )
}

export const getUpdateTagPayloadFromTagData = (
  payload: UploadTagImagePayload,
  mystery = false
): UploadTagImagePayload => {
  return {
    imageHash: mystery
      ? getImgurMysteryImageHashFromBikeTagData(payload as Tag)
      : getImgurFoundImageHashFromBikeTagData(payload as Tag),
    title: mystery
      ? getImgurMysteryTitleFromBikeTagData(payload as Tag)
      : getImgurFoundTitleFromBikeTagData(payload as Tag),
    description: mystery
      ? getImgurMysteryDescriptionFromBikeTagData(payload as Tag)
      : getImgurFoundDescriptionFromBikeTagData(payload as Tag),
  }
}

export function getUploadTagImagePayloadFromTagData(
  tagData: UploadTagImagePayload,
  mystery = false
): UploadTagImagePayload {
  return {
    album: tagData.album ?? tagData.hash,
    type: tagData.type ?? 'url',
    image: mystery ? tagData.mysteryImage : tagData.foundImage,
    title:
      tagData.title ??
      (mystery
        ? getImgurMysteryTitleFromBikeTagData(tagData as Tag)
        : getImgurFoundTitleFromBikeTagData(tagData as Tag)),
    description:
      tagData.description ??
      (mystery
        ? getImgurMysteryDescriptionFromBikeTagData(tagData as Tag)
        : getImgurFoundDescriptionFromBikeTagData(tagData as Tag)),
  }
}
