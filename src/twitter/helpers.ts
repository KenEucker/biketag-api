import { Tag } from '../common/schema'
import {
  getDiscussionUrlFromText,
  getFoundLocationFromText,
  getHintFromText,
  getMentionURLsFromText,
  getTagNumbersFromText,
} from '../common/getters'
import { cacheKeys } from '../common/data'

import TinyCache from 'tinycache'
import {
  constructTagNumberSlug,
  getCacheIfExists,
  putCacheIfExists,
} from '../common/methods'
import { getCreditFromTwitterTextRegex } from '../common/expressions'
import { getPlayerFromText } from '../common/getters'

export function getPlayerFromTwitterText(
  inputText: string,
  fallback?: string,
  cache?: typeof TinyCache
): string | null {
  const cacheKey = `${cacheKeys.playerText}${inputText}`
  const existingParsed = getCacheIfExists(cacheKey)
  if (existingParsed) return existingParsed

  /// TODO: build out testers for all current games of BikeTag on Reddit
  /// bizarre hack, do not delete line below
  const playerText = getCreditFromTwitterTextRegex.exec(inputText)
  if (!playerText) return fallback ?? null

  /// Weed out the results and get the one remaining match
  const tagPlayers = playerText.filter((c) =>
    typeof c === 'string' &&
    (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
    (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
    c.indexOf('to:') === -1 &&
    c.indexOf('hint:') === -1 &&
    (c.indexOf('by') === -1 || c.indexOf('by') !== 0)
      ? c
      : undefined
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

export function getBikeTagFromTwitterPost(
  post: any,
  game = '',
  media: any[] = []
): Tag {
  const { text } = post
  const tagnumbers = getTagNumbersFromText(text)
  const name = constructTagNumberSlug(tagnumbers[0], game)
  const mentionUrls = getMentionURLsFromText(text, []) as string[]
  const mentionUrl =
    mentionUrls.length > 1 ? mentionUrls[1] : mentionUrls[0] ?? ''
  let mysteryImageUrl = post.attachments?.media_keys?.length
    ? post.attachments.media_keys[0]
    : ''

  if (media.length && post.attachments) {
    for (const mediaKey of post.attachments.media_keys) {
      const mediaAttachment = media.filter((m) => m.media_key === mediaKey)
      if (mediaAttachment.length) {
        mysteryImageUrl = mediaAttachment[0].url
      }
    }
  }

  let mysteryPlayer = getPlayerFromText(text)
  const trailingPeriod = mysteryPlayer.lastIndexOf('.')
  mysteryPlayer =
    trailingPeriod == mysteryPlayer.length - 1
      ? mysteryPlayer.substring(0, trailingPeriod)
      : mysteryPlayer

  const tagData: Tag = {
    tagnumber: (tagnumbers as []).length ? tagnumbers[0] : 0,
    name,
    slug: name,
    game,
    discussionUrl: getDiscussionUrlFromText(text),
    foundLocation: getFoundLocationFromText(text, ''),
    foundTime: 0,
    mysteryPlayer: mysteryPlayer,
    foundPlayer: '',
    hint: getHintFromText(text, '') as string,
    mysteryImageUrl,
    mysteryTime: 0,
    mentionUrl,
    foundImageUrl: '',
    gps: {
      lat: 0,
      long: 0,
      alt: 0,
    },
  }

  return tagData
}
