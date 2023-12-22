import * as expressions from '../common/expressions'
import { ImgurImage } from '../common/types'
import { Game, Player, Tag } from '../common/schema'
import {
  getGPSLocationFromText,
  getGpsStringLocationFromText,
  getImageHashFromText,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundImageHashFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
} from '../common/getters'
import { cacheKeys, createGameObject, createPlayerObject } from '../common/data'

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
export type uploadTagImagePayload = Partial<Tag> & Partial<ImgurUploadPayload>
export type queueTagImagePayload = Partial<Tag> &
  Partial<ImgurUploadPayload> & { queuehash: string }

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
  if (!inputText?.length) return fallback

  const cacheKey = `${cacheKeys.tagNumberText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const tagNumberText = inputText.match(expressions.getTagNumbersFromTextRegex)
  if (!tagNumberText) return fallback ?? []

  const tagNumbers = tagNumberText.reduce((numbers, text) => {
    if (!text) return numbers

    let tagNumber: any = text.match(/\d+/)
    tagNumber = tagNumber?.length ? tagNumber[0] : null

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

export function getPlayerDataFromText(
  inputText: string,
  cache?: typeof TinyCache
): Partial<Player> | undefined {
  if (!inputText) return undefined

  const cacheKey = `${cacheKeys.playerData}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const playerData = expressions.getPlayerFromInfoFromTextRegex.exec(inputText)
  if (!playerData?.length) return undefined

  const player = createPlayerObject({
    name: playerData[1],
    games: playerData[2].split(','),
  })

  if (!player.name?.length) {
    /// TODO: this probably won't work
    putCacheIfExists(cacheKey, false, cache)
    return undefined
  }

  putCacheIfExists(cacheKey, player, cache)

  return player
}

export function getGameSlugFromText(
  inputText: string,
  cache?: typeof TinyCache
): string | undefined {
  if (!inputText) return undefined

  const cacheKey = `${cacheKeys.gameSlugText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const gameData = expressions.getGameSlugFromTextRegex.exec(inputText)
  if (!gameData?.length) return undefined

  const gameName = gameData[2]

  if (!gameName) {
    /// TODO: this probably won't work
    putCacheIfExists(cacheKey, false, cache)
    return undefined
  }

  putCacheIfExists(cacheKey, gameName, cache)

  return gameName
}

export function getGameDataFromText(
  inputText: string,
  cache?: typeof TinyCache
): Partial<Game> | undefined {
  if (!inputText) return undefined

  const cacheKey = `${cacheKeys.gameText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const gameData = expressions.getGameFromInfoFromTextRegex.exec(inputText)
  if (!gameData?.length) return undefined

  const game = createGameObject({
    name: gameData[10],
    ambassadors: (gameData[12] ?? '').split(','),
    queuehash: gameData[14],
    region: { name: gameData[10], description: gameData[3] },
    subreddit: gameData[5],
    twitter: gameData[7],
  })

  if (!game.name?.length) {
    /// TODO: this probably won't work
    putCacheIfExists(cacheKey, false, cache)
    return undefined
  }

  putCacheIfExists(cacheKey, game, cache)

  return game
}

export function getPlayerFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string | null {
  if (!inputText) return fallback ?? null

  const cacheKey = `${cacheKeys.playerText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// bizarre hack, do not delete line below
  // inputText.match(expressions.getPlayerFromTextRegex)
  const playerText = expressions.getPlayerFromTextRegex.exec(inputText)
  if (!playerText) return fallback ?? null

  /// Weed out the results and get the one remaining match
  const tagPlayers = playerText.filter((c) =>
    typeof c === 'string' &&
    (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
    (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
    c.indexOf('to:') === -1 &&
    c.indexOf('hint:') === -1 &&
    (c.indexOf(' by ') === -1 || c.indexOf(' by ') !== 0)
      ? c
      : undefined
  )

  if (!tagPlayers?.length && fallback) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const player = tagPlayers[0]
  putCacheIfExists(cacheKey, player, cache)

  /// Return just one player, there should only be one anyways
  return player
}

export function getPlayerIdFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string {
  if (!inputText || !inputText.length) {
    return fallback
  }

  const cacheKey = `${cacheKeys.playerIdText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const playerIdText = expressions.getPlayerIdFromTextRegex.exec(inputText)
  if (!playerIdText) {
    return fallback
  }

  const playerId = (playerIdText[1] || '').trim()
  putCacheIfExists(cacheKey, playerId, cache)

  return playerId
}

export function getDiscussionUrlFromText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string {
  if (!inputText || !inputText.length) {
    return fallback
  }

  const cacheKey = `${cacheKeys.discussionText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const discussionUrlText =
    expressions.getDiscussionUrlFromTextRegex.exec(inputText)

  if (!discussionUrlText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as string
  }

  const discussionUrl = (discussionUrlText[1] || '').trim()
  putCacheIfExists(cacheKey, discussionUrl, cache)

  return discussionUrl
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

  const foundLocationText =
    expressions.getFoundLocationFromTextRegex.exec(inputText)

  if (!foundLocationText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as string
  }

  const foundLocation = (foundLocationText[4] || '').trim()
  putCacheIfExists(cacheKey, foundLocation, cache)

  return foundLocation
}

export function getConfirmedBoundaryFromText(
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

  const confirmedBoundaryText =
    expressions.getConfirmedBoundaryFromTextRegex.exec(inputText)

  if (!confirmedBoundaryText) {
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback as string
  }

  const confirmedBoundary = (confirmedBoundaryText[4] || '').trim()
  putCacheIfExists(cacheKey, confirmedBoundary, cache)

  return confirmedBoundary
}

export function getTimeFromText(
  inputText: string,
  fallback?: number,
  cache?: typeof TinyCache
): number {
  const cacheKey = `${cacheKeys.timeText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  const timeMatch = expressions.getTimeFromTextRegex.exec(inputText)

  if (!timeMatch || timeMatch?.length < 2) {
    fallback = fallback ?? null
    /// DO NOT PUT INTO CACHE, NO TIME WAS FOUND
    // putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  /// Imgur timestamps are in seconds, not milliseconds, so we should match suit
  const time = new Date(`${timeMatch[1]} ${timeMatch[2]}`).getTime() / 1000
  putCacheIfExists(cacheKey, time, cache)

  return time
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
  // inputText.match(expressions.getHintFromTextRegex)
  const hintMatch = expressions.getHintFromTextRegex.exec(inputText)

  if (!hintMatch) {
    fallback = fallback ?? null
    putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  const hint = (hintMatch[1] || '').trim()
  putCacheIfExists(cacheKey, hint, cache)

  return hint
}

export function getBikeTagNumberFromImage(
  image: ImgurImage,
  cache?: typeof TinyCache
): number {
  return image.description
    ? getTagNumbersFromText(image.description, undefined, cache)[0]
    : -1
}

export function isPlayerImage(image: ImgurImage): boolean {
  return !!getTagNumbersFromText(image.description)
}

export function isMysteryImage(image: ImgurImage): boolean {
  // const hint = getHintFromText(image.description, '')
  // const discussionUrl = getDiscussionUrlFromText(image.title, '')
  const mysteryPlayer = getPlayerFromText(image.description, '')

  return mysteryPlayer.length > 0 && image.description.indexOf('tag') !== -1
}

export function isFoundImage(image: ImgurImage): boolean {
  const foundPlayer = getPlayerFromText(image.description, '')
  const foundLocation = getFoundLocationFromText(image.description, '')

  return foundPlayer.length > 0 && foundLocation.length > 0
}

export function sortImgurImagesByTagNumber(
  images: ImgurImage[] = [],
  cache?: typeof TinyCache
): ImgurImage[] {
  return images.sort((image1, image2) => {
    const tagNumber1 = getBikeTagNumberFromImage(image1, cache)
    const tagNumber2 = getBikeTagNumberFromImage(image2, cache)

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
    inputText.match(expressions.getImageURLsFromTextRegex) ?? []
  const tagImageMatch = new RegExp(validImageURLs.join('|'))
  const tagImageURLs = selfTextURLs.filter((url) => tagImageMatch.test(url))

  if (!tagImageURLs.length && fallback) {
    if (cache) putCacheIfExists(cacheKey, fallback, cache)
    return fallback
  }

  if (cache) putCacheIfExists(cacheKey, tagImageURLs, cache)

  return tagImageURLs
}

export function getBikeTagFromImgurImageSet(
  mysteryImage?: ImgurImage,
  foundImage?: ImgurImage,
  opts?: any
): Tag {
  if (!foundImage && !mysteryImage) return null as Tag

  let foundImageLink
  let foundImageDescription
  let foundImageTitle
  let foundTime
  let mysteryImageLink
  let mysteryImageDescription
  let mysteryImageTitle
  let mysteryTime
  let hint
  let discussionUrl
  let mysteryPlayer
  let foundPlayer
  let foundLocation
  let confirmedBoundary

  if (foundImage) {
    foundImageLink = foundImage?.link
    foundImageDescription = foundImage?.description
    foundImageTitle = foundImage?.title
    foundTime = getTimeFromText(foundImageDescription, foundImage?.datetime)
    foundPlayer = getPlayerFromText(foundImageDescription)
    foundLocation = getFoundLocationFromText(foundImageDescription)
    confirmedBoundary = getConfirmedBoundaryFromText(foundImageTitle)
  }

  if (mysteryImage) {
    mysteryImageLink = mysteryImage?.link
    mysteryImageDescription = mysteryImage?.description
    mysteryImageTitle = mysteryImage?.title
    mysteryTime = getTimeFromText(
      mysteryImageDescription,
      mysteryImage?.datetime
    )
    hint = getHintFromText(mysteryImageDescription)
    discussionUrl = getDiscussionUrlFromText(mysteryImageTitle)
    mysteryPlayer = getPlayerFromText(mysteryImageDescription)
  }

  const game = opts?.game || ''
  const tagnumber = mysteryImageDescription
    ? (getTagNumbersFromText(mysteryImageDescription)[0] as number)
    : (getTagNumbersFromText(foundImageDescription)[0] as number)
  const name = constructTagNumberSlug(tagnumber, game)
  const playerId =
    getPlayerIdFromText(mysteryImageTitle) ??
    getPlayerIdFromText(foundImageTitle)
  let gps = foundImageDescription
    ? getGPSLocationFromText(foundImageDescription)
    : getGPSLocationFromText(mysteryImageTitle)

  if (gps.lat === 0 && gps.long === 0 && foundImageTitle) {
    gps = getGPSLocationFromText(foundImageTitle)
  }

  if (foundLocation?.length && gps.lat !== 0 && gps.long !== 0) {
    const gpsFromFoundLocation = getGpsStringLocationFromText(foundLocation, '')
    foundLocation = foundLocation
      .replace(gpsFromFoundLocation, '')
      .replace(
        gpsFromFoundLocation.substring(0, gpsFromFoundLocation.length - 3),
        ''
      )
  }

  const tagData: Tag = {
    tagnumber,
    name,
    slug: name,
    game,
    discussionUrl,
    foundLocation,
    mysteryPlayer,
    foundPlayer,
    foundTime,
    mysteryTime,
    hint,
    playerId,
    confirmedBoundary,
    mysteryImageUrl: mysteryImageLink,
    foundImageUrl: foundImageLink,
    /// TODO: get found location gps from found tag
    gps,
  }

  return tagData
}

export const getBikeTagUsernameFromImgurImage = (
  image: ImgurImage,
  cache?: typeof TinyCache
): string => {
  return getPlayerFromText(image.description, undefined, cache)
}

export const getBikeTagDiscussionLinkFromImgurImage = (
  image: ImgurImage
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
  found = false
): number => {
  const tagNumberIndex =
    images.length + 1 - (tagNumber - (tagNumber % 2) + 1) * 2

  const verifyTagNumber = function (index): boolean {
    if (!images[index] || !images[index].description) {
      return false
    }

    let compare = `#${tagNumber} tag`
    if (found) {
      compare = `#${tagNumber}`
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

export const isValidUpdatePayload = (utp: uploadTagImagePayload): boolean => {
  return (
    (typeof utp.imageHash === 'string' &&
      (typeof utp.title === 'string' || typeof utp.description === 'string')) ||
    typeof utp.title === 'string' ||
    typeof utp.description === 'string'
  )
}

export const isValidUploadTagImagePayload = (
  utp: uploadTagImagePayload
): boolean => {
  return (
    /// TODO: do better type checking here
    utp &&
    typeof utp.image !== 'undefined' &&
    (typeof utp.title === 'string' || typeof utp.description === 'string')
  )
}

export const getUpdateTagPayloadFromTagData = (
  payload: uploadTagImagePayload,
  mystery = false
): uploadTagImagePayload => {
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

export function getQueueTagImagePayloadFromTagData(
  tagData: queueTagImagePayload,
  mystery = false
): uploadTagImagePayload {
  return {
    album: tagData.queuehash ?? tagData.hash,
    type: tagData.type ?? 'stream',
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

export function getUploadTagImagePayloadFromTagData(
  tagData: uploadTagImagePayload,
  mystery = false
): uploadTagImagePayload {
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

export const getGroupedImagesByTagnumber = (
  ungroupedImages = [],
  cache?: typeof TinyCache
) => {
  const groupedImages: any[] = []

  ungroupedImages.forEach((image: any) => {
    const tagnumber = getBikeTagNumberFromImage(image, cache)

    groupedImages[tagnumber] = groupedImages[tagnumber]
      ? groupedImages[tagnumber]
      : []
    groupedImages[tagnumber].push(image)
  })

  return groupedImages
}

export const getGroupedTagsByTagnumber = (
  groupedImages: ImgurImage[][] = [],
  appendToTagData = {}
) => {
  const tagsData = []
  groupedImages.forEach((images: ImgurImage[]) => {
    if (!images.length) {
      return false
    }

    const image1IsMysteryImage = isMysteryImage(images[0])
    const moreThanOneImage = images.length > 1
    const mysteryImage = image1IsMysteryImage
      ? images[0]
      : moreThanOneImage
      ? images[1]
      : undefined
    let foundImage =
      moreThanOneImage && image1IsMysteryImage ? images[1] : undefined

    if (!foundImage && moreThanOneImage) {
      const image2IsFoundImage = isFoundImage(images[1])
      foundImage = image2IsFoundImage
        ? images[1]
        : !image1IsMysteryImage
        ? images[0]
        : undefined
    }
    if (!mysteryImage || !foundImage) {
      // console.log(
      //   `tag is missing ${!mysteryImage ? 'mystery image' : ''}${
      //     !mysteryImage && !foundImage ? ' and ' : ' '
      //   }${!foundImage ? 'found image' : ''}`
      // )
    }
    const tagData = getBikeTagFromImgurImageSet(
      mysteryImage,
      foundImage,
      appendToTagData
    )

    tagsData.push(tagData)
  })

  return tagsData
}

export const getGroupedTagsByPlayer = (
  groupedImages: ImgurImage[][] = [],
  appendToTagData = {}
) => {
  if (!groupedImages.length) {
    return []
  }
  const playerGroupedImages = []
  const playerGroupedTags = []
  /// TODO: change this as it assumes the tags are ordered by tagnumber
  const highestTagnumber = groupedImages.reduce((o, i, n) => {
    o = o > n ? o : n
    return o
  }, 0)

  groupedImages[highestTagnumber].forEach((i: ImgurImage) => {
    const player = getPlayerFromText(i.description)
    playerGroupedImages[player] = playerGroupedImages[player] ?? []
    playerGroupedImages[player].push(i)
  })
  if (groupedImages[highestTagnumber - 1]) {
    groupedImages[highestTagnumber - 1].forEach((i: ImgurImage) => {
      const player = getPlayerFromText(i.description)
      playerGroupedImages[player] = playerGroupedImages[player] ?? []
      playerGroupedImages[player].push(i)
    })
  }

  Object.keys(playerGroupedImages).forEach((player) => {
    const groupedImages = playerGroupedImages[player]
    if (groupedImages.length === 1) {
      playerGroupedTags.push(
        getBikeTagFromImgurImageSet(
          undefined,
          groupedImages[0],
          appendToTagData
        )
      )
    } else if (groupedImages.length === 2) {
      const mysteryImage = isMysteryImage(groupedImages[0])
        ? groupedImages[0]
        : isMysteryImage(groupedImages[1])
        ? groupedImages[1]
        : undefined
      const foundImage = isFoundImage(groupedImages[1])
        ? groupedImages[1]
        : isFoundImage(groupedImages[0])
        ? groupedImages[0]
        : undefined
      playerGroupedTags.push(
        getBikeTagFromImgurImageSet(mysteryImage, foundImage, appendToTagData)
      )
    } else {
      console.log('what do I do now?', groupedImages)
    }
  })

  return playerGroupedTags
}
