import { TagData, GameData } from './types'

export const createTag = (tagData: any = {}): TagData => {
  return {
    tagnumber: tagData.tagnumber ?? 'latest',
    mysteryImage: tagData.mysteryImage ?? '',
    mysteryImageUrl: tagData.mysteryImageUrl ?? '',
    game: tagData.game ?? '',
    player: tagData.player ?? '',
    hint: tagData.hint ?? '',
    discussionUrl: tagData.discussionUrl ?? '',
    foundLocation: tagData.foundLocation ?? '',
    gps: tagData.gps ?? '',
    foundImage: tagData.foundImage ?? '',
    foundImageUrl: tagData.foundImageUrl ?? '',
  } as TagData
}

export const tagDataFields = Object.keys(createTag())

export const tagDataReferenceFields = ['game', 'player']

export const createGame = (gameData: any = {}): GameData => {
  return {
    name: gameData.name ?? '',
    ambassadors: gameData.ambassadors ?? [],
    boundary: gameData.boundary ?? {},
    mainhash: gameData.mainhash ?? '',
    queuehash: gameData.queuehash ?? '',
    logo: gameData.logo ?? '',
    region: gameData.region ?? '',
    slug: gameData.slug ?? '',
  } as GameData
}

export const gameDataReferenceFields = ['region']
export const gameDataArrayFields = ['ambassadors', 'tags']

export const gameDataFields = Object.keys(createGame())

export const cacheKeys = {
  imageHashText: 'hash::',
  albumHash: `imgur::`,
  redditPosts: `reddit::`,
  bikeTagImage: `biketag::`,
  bikeTagsByUser: `usertags::`,
  hintText: `hint::`,
  creditText: `credit::`,
  locationText: `gps::`,
  discussionText: `discussion::`,
  tagNumberText: `tag::`,
  imagesText: `images::`,
  gpsLocationText: `gps::`,
  slugText: `slug::`,
}
