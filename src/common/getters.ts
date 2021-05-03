import { TagData } from './types'
import {
  getTagnumberFromSlugRegex,
  getTagNumbersFromTextRegex,
  getImgurImageHashFromUrlRegex,
  getFoundLocationFromTextRegex,
  getImageURLsFromTextRegex,
  getHintFromTextRegex,
  getCreditFromTextRegex,
  getDiscussionUrlFromTextRegex,
  getGPSLocationFromTextRegex,
} from '../common/expressions'
import { getCacheIfExists, putCacheIfExists } from '../common/methods'
import { cacheKeys } from '../common/data'
import TinyCache from 'tinycache'

export const getTagnumberFromSlug = (
  inputText: string,
  fallback?: number,
  cache?: typeof TinyCache
): number => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.slugText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
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
  fallback?: number | number[],
  cache?: typeof TinyCache
): number | number[] => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.tagNumberText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const tagNumberText = inputText.match(getTagNumbersFromTextRegex)
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
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  putCacheIfExists(cacheKey, tagNumbers, cache)
  return tagNumbers
}

export const getCreditFromText = (
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.creditText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  inputText.match(getCreditFromTextRegex)
  const creditText = getCreditFromTextRegex.exec(inputText)
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
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const credit = tagCredits[0]
  putCacheIfExists(cacheKey, credit, cache)

  /// Return just one credit, there should only be one anyways
  return credit
}

export const getFoundLocationFromText = (
  inputText: string,
  fallback: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.locationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  inputText.match(getFoundLocationFromTextRegex)
  const foundLocationText = getFoundLocationFromTextRegex.exec(inputText)

  if (!foundLocationText) {
    fallback = fallback || null
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const foundLocation = (foundLocationText[1] || '').trim()
  putCacheIfExists(cacheKey, foundLocation, cache)

  return foundLocation
}

export const getHintFromText = (
  inputText: string,
  fallback: string | string[],
  cache?: typeof TinyCache
): string | string[] => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.hintText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const tagNumberText = inputText.match(getHintFromTextRegex)
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
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  putCacheIfExists(cacheKey, tagNumbers, cache)
  return tagNumbers
}

export const getGPSLocationFromText = (
  inputText: string,
  fallback: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.gpsLocationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// Normalize the text (some posts found to have this escaped double quote placed in between GPS coordinates)
  inputText = inputText.replace(/\\/g, '')
  inputText.match(getGPSLocationFromTextRegex)
  const gpsLocationText = getGPSLocationFromTextRegex.exec(inputText)

  if (!gpsLocationText) {
    fallback = fallback || null
    putCacheIfExists(cacheKey, fallback, cache)

    return fallback
  }

  const gpsLocation = gpsLocationText[0] || null
  putCacheIfExists(cacheKey, gpsLocation, cache)
  return gpsLocation
}

export const getImageURLsFromText = (
  inputText: string,
  fallback: string | string[],
  cache?: typeof TinyCache
): string | string[] => {
  if (!inputText.length) return fallback

  const cacheKey = `${cacheKeys.imagesText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// TODO: make this image validator more intelligent
  const validImageURLs = ['imgur']

  const selfTextURLs = inputText.match(getImageURLsFromTextRegex) || []
  const tagImageURLs = selfTextURLs.reduce((urls, url) => {
    if (!url || !new RegExp(validImageURLs.join('|')).test(url)) return urls

    urls.push(url)

    return urls
  }, [])

  if (!tagImageURLs.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  putCacheIfExists(cacheKey, tagImageURLs, cache)
  return tagImageURLs
}

export const getDiscussionUrlFromText = (
  inputText: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText.length) return ''

  const cacheKey = `${cacheKeys.discussionText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  inputText.match(getDiscussionUrlFromTextRegex)
  const tagDiscussionLinkMatches = getDiscussionUrlFromTextRegex.exec(inputText)

  if (!tagDiscussionLinkMatches.length) {
    putCacheIfExists(cacheKey, null, cache)
    return null
  }

  const discussionUrl = (tagDiscussionLinkMatches[1] || '').trim()
  putCacheIfExists(cacheKey, discussionUrl, cache)

  return discussionUrl
}

export const getImageHashFromText = (
  inputText: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText.length) return ''

  const cacheKey = `${cacheKeys.imageHashText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  inputText.match(getImgurImageHashFromUrlRegex)
  const imageHashMatches = getImgurImageHashFromUrlRegex.exec(inputText)

  if (!imageHashMatches || !imageHashMatches.length) {
    putCacheIfExists(cacheKey, null, cache)
    return null
  }

  const imageHash = (imageHashMatches[1] || '').trim()
  putCacheIfExists(cacheKey, imageHash, cache)

  return imageHash
}

export const getImgurFoundImageHashFromBikeTagData = (
  tag: TagData,
  cache?: typeof TinyCache
): string => {
  return getImageHashFromText(tag.foundImageUrl, cache)
}
export const getImgurFoundDescriptionFromBikeTagData = (tag: TagData): string =>
  `#${tag.tagnumber} proof${
    tag.foundLocation ? ` found at (${tag.foundLocation})` : ''
  } by ${tag.player}`
export const getImgurFoundTitleFromBikeTagData = (tag: TagData): string =>
  `(${tag.gps ? tag.gps : ''})`

export const getImgurMysteryImageHashFromBikeTagData = (
  tag: TagData,
  cache?: typeof TinyCache
): string => {
  return getImageHashFromText(tag.mysteryImageUrl, cache)
}
export const getImgurMysteryTitleFromBikeTagData = (tag: TagData): string =>
  `${
    !tag.gps || (tag.gps.lat === 0 && tag.gps.long === 0)
      ? ''
      : `(${tag.gps.lat}, ${tag.gps.long}, ${tag.gps.alt})`
  } ${tag.discussionUrl ? `{${tag.discussionUrl}}` : ''}`

export const getImgurMysteryDescriptionFromBikeTagData = (
  tag: TagData
): string =>
  `#${tag.tagnumber} tag (hint: ${tag.hint ? tag.hint : ''} ) by ${tag.player}`
