import { geopoint, S3ImageMeta } from './types'
import {
  getTagnumberFromSlugRegex,
  getTagNumbersFromTextRegex,
  getImgurImageHashFromUrlRegex,
  getFoundLocationFromTextRegex,
  getImageURLsFromTextRegex,
  getHintFromTextRegex,
  getPlayerFromTextRegex,
  getDiscussionUrlFromTextRegex,
  getGPSLocationFromTextRegex,
  getAlbumIdFromTextRegex,
  getSanityImageUrlHashFromTextRegex,
} from '../common/expressions'
import {
  constructTagNumberSlug,
  getCacheIfExists,
  putCacheIfExists,
} from '../common/methods'
import { cacheKeys, createTagObject } from '../common/data'
import TinyCache from 'tinycache'
import { Tag } from './schema'
import {
  getTimeFromText,
  getConfirmedBoundaryFromText,
  getPlayerIdFromText,
} from '../imgur/helpers'

export const getConfirmedBoundarySymbol = '✓'

export const getTagnumberFromSlug = (
  inputText: string,
  fallback?: number,
  cache?: typeof TinyCache
): number => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.slugText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  // inputText.match(getTagnumberFromSlugRegex)
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
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.tagNumberText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const tagNumberText = inputText.match(getTagNumbersFromTextRegex)
  if (!tagNumberText) return fallback || []

  const tagNumbers = tagNumberText.reduce((numbers, text) => {
    if (!text) return numbers

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

export const getPlayerFromText = (
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.playerText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// HACK
  // inputText.match(getPlayerFromTextRegex)
  const playerText = getPlayerFromTextRegex.exec(inputText)
  if (!playerText) return fallback ?? null

  /// Weed out the results and get the one remaining match
  const tagPlayers = playerText.filter(
    (c) =>
      typeof c === 'string' &&
      (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
      (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
      c.indexOf('to:') === -1 &&
      c.indexOf('hint:') === -1 &&
      Number.isInteger(Number.parseInt(c)) === false &&
      (c.indexOf(' by ') === -1 || c.indexOf(' by ') !== 0)
  )

  if (!tagPlayers.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const player = tagPlayers[0]
  putCacheIfExists(cacheKey, player, cache)

  /// Return just one player, there should only be one anyways
  return player
}

export const getFoundLocationFromText = (
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.locationText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const foundLocationText = getFoundLocationFromTextRegex.exec(inputText)

  if (!foundLocationText) {
    fallback = fallback ?? null
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const foundLocation = (
    foundLocationText[1] ??
    foundLocationText[2] ??
    ''
  ).trim()
  putCacheIfExists(cacheKey, foundLocation, cache)

  return foundLocation
}

export const getHintFromText = (
  inputText: string,
  fallback?: string | string[],
  cache?: typeof TinyCache
): string | string[] => {
  const cacheKey = `${cacheKeys.hintText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  // inputText.match(expressions.getHintFromTextRegex)
  const hintMatch = getHintFromTextRegex.exec(inputText)

  if (!hintMatch) {
    fallback = fallback ?? null
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const hint = (hintMatch[1] || '').trim()
  putCacheIfExists(cacheKey, hint, cache)

  return hint
}

export const getGpsStringLocationFromText = (
  inputText: string,
  fallback: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.gpsStringText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// Normalize the text (some posts found to have this escaped double quote placed in between GPS coordinates)
  inputText = inputText.replace(/\\/g, '')
  inputText.match(getGPSLocationFromTextRegex)
  const gpsText = getGPSLocationFromTextRegex.exec(inputText)

  if (!gpsText) {
    fallback = fallback ?? null
    putCacheIfExists(cacheKey, fallback, cache)

    return fallback
  }

  const gpsString =
    gpsText[0].split(',').length > 2 ? gpsText[0] : `${gpsText[0]}, 0`
  putCacheIfExists(cacheKey, gpsString, cache)

  return gpsString
}

export const getGPSLocationFromText = (
  inputText: string,
  fallback?: geopoint,
  cache?: typeof TinyCache
): geopoint => {
  const gpsString = getGpsStringLocationFromText(inputText, '', cache)

  if (gpsString.length) {
    const gpsPair = gpsString.split(',')
    const gpsLocation = {
      lat: parseFloat(gpsPair[0]),
      long: parseFloat(gpsPair[1]),
      alt: parseFloat(gpsPair[2]),
    }

    return gpsLocation
  }

  return (
    fallback ?? {
      lat: 0,
      long: 0,
      alt: 0,
    }
  )
}

export const getImgurAlbumIdFromText = (
  inputText: string,
  fallback: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.imageUrlText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  inputText.match(getAlbumIdFromTextRegex)
  const albumbIdMatches = getAlbumIdFromTextRegex.exec(inputText)
  const albumbIds = albumbIdMatches.reduce((ids, id) => {
    if (
      id.indexOf('gallery') === -1 &&
      id.indexOf('?') === -1 &&
      id.indexOf('a/') === -1 &&
      id.length > 1
    ) {
      ids.push(id)
    }

    return ids
  }, [])

  if (!albumbIds.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const albumbId = albumbIds[0]
  putCacheIfExists(cacheKey, albumbId, cache)

  return albumbId
}

export const getMentionURLsFromText = (
  inputText: string,
  fallback: string | string[],
  cache?: typeof TinyCache
): string | string[] => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.mentionText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// TODO: put these URLS into a different constant elsewhere
  const validImageURLs = ['t.co']

  const selfTextURLs = inputText.match(getImageURLsFromTextRegex)
  if (selfTextURLs) {
    const tagImageURLs = selfTextURLs.reduce((urls, url) => {
      if (!url || !new RegExp(validImageURLs.join('|')).test(url)) return urls

      const ext = /[^.]+$/.test(url) ? '.' + /[^.]+$/.exec(url) : ''
      if (
        // ['.jpg', '.jpeg', '.png', '.bmp'].indexOf(ext) === -1 &&
        ext.indexOf('.co') === 0 &&
        url.indexOf('//t.co/') !== -1 &&
        url.length > 2
      ) {
        /// TODO: detect the image extension and set it here instead of defaulting to jpg
        // url = `${url.replace('//imgur.com', '//i.imgur.com')}.jpg`
      }

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

  putCacheIfExists(cacheKey, fallback, cache)
  return fallback
}

export const getImageURLsFromText = (
  inputText: string,
  fallback: string | string[],
  cache?: typeof TinyCache
): string | string[] => {
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.imagesText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  /// TODO: make this image validator more intelligent
  const validImageURLs = ['imgur', 't.co']

  const selfTextURLs = inputText.match(getImageURLsFromTextRegex)
  if (selfTextURLs) {
    const tagImageURLs = selfTextURLs.reduce((urls, url) => {
      if (!url || !new RegExp(validImageURLs.join('|')).test(url)) return urls

      const ext = /[^.]+$/.test(url) ? '.' + /[^.]+$/.exec(url) : ''
      if (
        ['.jpg', '.jpeg', '.png', '.webp', '.bmp'].indexOf(ext) === -1 &&
        ext.indexOf('.com/') === 0 &&
        url.indexOf('//imgur.com/') !== -1 &&
        url.indexOf('3/album') === -1 &&
        url.indexOf('/a/') === -1 &&
        url.indexOf('.com/gallery') === -1 &&
        url.length > 2
      ) {
        /// TODO: detect the image extension and set it here instead of defaulting to jpg
        url = `${url.replace('//imgur.com', '//i.imgur.com')}.jpg`
      }

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

  putCacheIfExists(cacheKey, fallback, cache)
  return fallback
}

export const getDiscussionUrlFromText = (
  inputText: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return ''

  const cacheKey = `${cacheKeys.discussionText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const tagDiscussionLinkMatches = getDiscussionUrlFromTextRegex.exec(inputText)

  if (!tagDiscussionLinkMatches?.length) {
    putCacheIfExists(cacheKey, null, cache)
    return null
  }

  const discussionUrl = (tagDiscussionLinkMatches[1] || '').trim()
  putCacheIfExists(cacheKey, discussionUrl, cache)

  return discussionUrl
}

export const getImageHashFromText = (
  inputText?: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return ''

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

export const getSanityImageUrlHashFromText = (
  inputText: string,
  cache?: typeof TinyCache
): string => {
  if (!inputText?.length) return ''

  const cacheKey = `${cacheKeys.sanityUrlText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey, cache)
  if (existingParsed) return existingParsed

  const imageUrlMatches = getSanityImageUrlHashFromTextRegex.exec(inputText)

  if (!imageUrlMatches || !imageUrlMatches.length) {
    putCacheIfExists(cacheKey, null, cache)
    return null
  }

  const imageHash = (imageUrlMatches[1] || '').trim()
  putCacheIfExists(cacheKey, imageHash, cache)

  return imageHash
}

export const getImgurFoundImageHashFromBikeTagData = (
  tag: Tag,
  cache?: typeof TinyCache
): string => {
  return getImageHashFromText(tag.foundImageUrl, cache)
}

export const getDateStringForImgurDescription = (isodate: number): string => {
  if (!isodate) return ''

  const date = new Date(isodate * 1000)
  const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .substring(2)}`
  const timeString = `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

  return ` on [${dateString}@${timeString}]`
}

export const getImgurFoundDescriptionFromBikeTagData = (
  tag: Tag,
  includeCredit = true,
  includeDate = true
): string =>
  `#${tag.tagnumber} proof${
    tag.foundLocation ? ` found at (${tag.foundLocation})` : ''
  }${includeCredit ? ` by ${tag.foundPlayer}` : ''}${
    includeDate ? getDateStringForImgurDescription(tag.foundTime) : ''
  }`

export const getImgurFoundTitleFromBikeTagData = (
  tag: Tag,
  fromCombinedTag = false
): string =>
  `${
    !tag.gps || (tag.gps.lat === 0 && tag.gps.long === 0)
      ? ''
      : `(${tag.gps.lat ?? 0}, ${tag.gps.long ?? 0}, ${tag.gps.alt ?? 0})`
  } 
  ${
    !fromCombinedTag && // don't include the player id from a combined tag in the found tag
    tag.playerId?.length
      ? `[${tag.playerId}]`
      : ''
  } 
  ${tag.confirmedBoundary ? getConfirmedBoundarySymbol : ''}`

export const getImgurMysteryImageHashFromBikeTagData = (
  tag: Tag,
  cache?: typeof TinyCache
): string => {
  return getImageHashFromText(tag.mysteryImageUrl, cache)
}
export const getImgurMysteryTitleFromBikeTagData = (
  tag: Tag,
  fromCombinedTag = false
): string =>
  `${
    (!fromCombinedTag && // don't include the gps from a combined tag in the mystery
      !tag.gps) ||
    (tag.gps.lat === 0 && tag.gps.long === 0)
      ? ''
      : `(${tag.gps.lat ?? 0}, ${tag.gps.long ?? 0}, ${tag.gps.alt ?? 0})`
  } 
  ${tag.playerId?.length ? `[${tag.playerId}]` : ''} 
  ${tag.discussionUrl ? `{${tag.discussionUrl}}` : ''}`

export const getImgurMysteryDescriptionFromBikeTagData = (
  tag: Tag,
  includeCredit = true,
  includeHint = true,
  includeDate = true
): string =>
  `#${tag.tagnumber} tag ${
    includeHint && tag.hint ? `(hint: ${tag.hint})` : ''
  }${includeCredit ? ` by ${tag.mysteryPlayer}` : ''}${
    includeDate ? getDateStringForImgurDescription(tag.mysteryTime) : ''
  }`

export const getOnlyMysteryTagFromTagData = (tagData: Tag): Tag => {
  const onlyMysteryTagFields = {
    playerId: tagData.playerId,
    game: tagData.game,
    tagnumber: tagData.tagnumber,
    name: tagData.name,
    slug: tagData.slug,
    mysteryImageUrl: tagData.mysteryImageUrl,
    mysteryImage: tagData.mysteryImage,
    mysteryPlayer: tagData.mysteryPlayer,
    mysteryTime: tagData.mysteryTime,
    hint: tagData.hint,
    gps: tagData.gps,
    discussionUrl: tagData.discussionUrl,
    mentionUrl: tagData.mentionUrl,
    shareUrl: tagData.shareUrl,
  }

  return createTagObject(onlyMysteryTagFields)
}

export const getOnlyFoundTagFromTagData = (tagData: Tag): Tag => {
  const onlyFoundTagFields = {
    playerId: tagData.playerId,
    game: tagData.game,
    tagnumber: tagData.tagnumber,
    name: tagData.name,
    slug: tagData.slug,
    foundImageUrl: tagData.foundImageUrl,
    foundImage: tagData.foundImage,
    foundPlayer: tagData.foundPlayer,
    foundLocation: tagData.foundLocation,
    foundTime: tagData.foundTime,
  }

  return createTagObject(onlyFoundTagFields)
}

export const getRedditPostTextFromTagData = (
  tagData: Tag,
  gameData: any = {},
  wrapInPreTag = true
): string => {
  const host = gameData.host ?? `${tagData.game}.biketag.org`
  const selfPostText = `
  [#${tagData.tagnumber} tag by ${tagData.mysteryPlayer}](${
    tagData.mysteryImageUrl
  })
  
  Credit goes to: ${tagData.mysteryPlayer} for finding tag #${
    tagData.tagnumber - 1
  }!
  
  Found at: ${tagData.foundLocation}](https://${host}/#/${tagData.tagnumber})
  
  See all BikeTags and more, for ${tagData.game}:
  
  [${host}](https://${host}) | [Top 10](https://${host}/#/leaderboard) | [Rules](https://${host}/#/how-to)
  
  ${gameData.mapLink}`

  return wrapInPreTag ? `<pre>${selfPostText}</pre>` : selfPostText
}

export const getBikeTagFromS3ImageSet = (
  mysteryImage?: S3ImageMeta,
  foundImage?: S3ImageMeta,
  opts?: { game?: string }
): Tag => {
  if (!foundImage && !mysteryImage) return null as Tag

  /// TODO: remove the image and description from the S3ImageMeta interface
  let foundImageDescription, foundImageTitle
  let mysteryImageDescription, mysteryImageTitle
  let game = opts?.game ?? '',
    tagnumber = 0,
    slug
  let hint,
    foundTime,
    mysteryTime,
    mysteryImageUrl,
    foundImageUrl,
    playerId,
    gps,
    mentionUrl,
    shareUrl,
    discussionUrl,
    mysteryPlayer,
    foundPlayer,
    foundLocation,
    confirmedBoundary

  if (foundImage?.data?.tagnumber && mysteryImage?.data?.tagnumber) {
    tagnumber = mysteryImage.data.tagnumber ?? foundImage.data.tagnumber ?? 0
    playerId = foundImage.data.playerId ?? mysteryImage.data.playerId
    mysteryImageUrl = mysteryImage.url
    mysteryPlayer = mysteryImage.data.mysteryPlayer ?? ''
    mysteryTime = mysteryImage.data.mysteryTime ?? 0
    foundImageUrl = foundImage.url
    foundPlayer = foundImage.data.foundPlayer ?? ''
    foundTime = foundImage.data.foundTime ?? 0
    foundLocation = foundImage.data.foundLocation ?? ''
    confirmedBoundary = foundImage.data.confirmedBoundary ?? false
    hint = mysteryImage.data.hint ?? ''
    gps = foundImage.data.gps ?? { lat: 0, long: 0, alt: 0 }
    discussionUrl = mysteryImage.data.discussionUrl ?? ''
    mentionUrl = mysteryImage.data.mentionUrl ?? ''
    shareUrl = mysteryImage.data.shareUrl ?? ''
  } else if (foundImage?.data?.tagnumber) {
    tagnumber = foundImage.data.tagnumber ?? 0
    foundImageUrl = foundImage.url
    foundPlayer = foundImage.data.foundPlayer ?? ''
    foundTime = foundImage.data.foundTime ?? 0
    foundLocation = foundImage.data.foundLocation ?? ''
    confirmedBoundary = foundImage.data.confirmedBoundary ?? false
    gps = foundImage.data.gps ?? { lat: 0, long: 0, alt: 0 }
  } else if (mysteryImage?.data?.tagnumber) {
    tagnumber = mysteryImage.data.tagnumber ?? 0
    mysteryImageUrl = mysteryImage.url
    mysteryPlayer = mysteryImage.data.mysteryPlayer ?? ''
    mysteryTime = mysteryImage.data.mysteryTime ?? 0
    hint = mysteryImage.data.hint ?? ''
    discussionUrl = mysteryImage.data.discussionUrl ?? ''
    mentionUrl = mysteryImage.data.mentionUrl ?? ''
    shareUrl = mysteryImage.data.shareUrl ?? ''
    playerId = mysteryImage.data.playerId
  }

  if (foundImage && !foundImageUrl) {
    foundImageUrl = foundImage.url
    foundImageDescription = foundImage.description
    foundImageTitle = foundImage.title
    foundTime = getTimeFromText(foundImageDescription)
    foundPlayer = getPlayerFromText(foundImageDescription)
    foundLocation = getFoundLocationFromText(foundImageDescription)
    confirmedBoundary = getConfirmedBoundaryFromText(foundImageTitle)
  }

  if (mysteryImage && !mysteryImageUrl) {
    mysteryImageUrl = mysteryImage.url
    mysteryImageDescription = mysteryImage.description
    mysteryImageTitle = mysteryImage.title
    mysteryTime = getTimeFromText(mysteryImageDescription)
    hint = getHintFromText(mysteryImageDescription)
    discussionUrl = getDiscussionUrlFromText(mysteryImageTitle)
    mysteryPlayer = getPlayerFromText(mysteryImageDescription)
  }

  if (tagnumber === 0) {
    tagnumber = mysteryImageDescription
      ? getTagNumbersFromText(mysteryImageDescription)[0]
      : getTagNumbersFromText(foundImageDescription)[0]
  }
  slug = constructTagNumberSlug(tagnumber, game)

  playerId =
    playerId ??
    getPlayerIdFromText(mysteryImageTitle) ??
    getPlayerIdFromText(foundImageTitle)

  gps =
    (gps ?? foundImageDescription)
      ? getGPSLocationFromText(foundImageDescription)
      : getGPSLocationFromText(mysteryImageTitle)

  if (gps.lat === 0 && gps.long === 0 && foundImageTitle?.length) {
    gps = getGPSLocationFromText(foundImageTitle)
  }

  if (foundLocation?.length && gps.lat !== 0 && gps.long !== 0) {
    const gpsFromFoundLocation = getGpsStringLocationFromText(foundLocation, '')
    foundLocation = foundLocation
      .replace(gpsFromFoundLocation, '')
      .replace(gpsFromFoundLocation.slice(0, -3), '')
  }

  return {
    tagnumber,
    name: slug,
    slug,
    game,
    discussionUrl,
    shareUrl,
    mentionUrl,
    foundLocation,
    mysteryPlayer,
    foundPlayer,
    foundTime,
    mysteryTime,
    hint,
    playerId,
    confirmedBoundary,
    mysteryImageUrl,
    foundImageUrl,
    gps,
  }
}
