import { Tag, Game, Player } from './types'

export const cacheKeys = {
  sanityUrlText: `sanity::`,
  imageHashText: `hash::`,
  albumHash: `imgur::`,
  redditPosts: `reddit::`,
  bikeTagImage: `biketag::`,
  bikeTagsByUser: `usertags::`,
  hintText: `hint::`,
  creditText: `credit::`,
  locationText: `gps::`,
  discussionText: `discussion::`,
  mentionText: `mention::`,
  tagNumberText: `tag::`,
  imagesText: `images::`,
  imageUrlText: `images::`,
  gpsLocationText: `gps::`,
  slugText: `slug::`,
}

export const createTagObject = (tagData: any = {}): Tag => {
  return {
    tagnumber: tagData.tagnumber ?? 'current',
    mysteryImage: tagData.mysteryImage,
    mysteryImageUrl: tagData.mysteryImageUrl ?? '',
    game: tagData.game ?? '',
    slug: tagData.slug ?? '',
    name: tagData.name ?? '',
    player: tagData.player ?? '',
    hint: tagData.hint ?? '',
    discussionUrl: tagData.discussionUrl ?? '',
    foundLocation: tagData.foundLocation ?? '',
    gps: tagData.gps ?? '',
    foundImage: tagData.foundImage,
    foundImageUrl: tagData.foundImageUrl ?? '',
    _id: tagData._id,
    _type: tagData._type,
  } as Tag
}

export const tagDataFields = Object.keys(createTagObject())

export const tagDataReferenceFields = ['game', 'player']

export const tagDataAssetFields = ['foundImage', 'mysteryImage']

export const tagDataObjectFields = {
  foundImage: 'asset->_ref',
  mysteryImage: 'asset->_ref',
}

export const createGameObject = (gameData: any = {}): Game => {
  return {
    name: gameData.name ?? '',
    ambassadors: gameData.ambassadors ?? [],
    boundary: gameData.boundary ?? {},
    mainhash: gameData.mainhash ?? '',
    queuehash: gameData.queuehash ?? '',
    subreddit: gameData.subreddit ?? '',
    logo: gameData.logo,
    region: gameData.region ?? '',
    slug: gameData.slug ?? '',
  } as Game
}

export const gameDataReferenceFields = ['region']
export const gameDataArrayFields = ['ambassadors', 'tags']

export const gameDataFields = Object.keys(createGameObject())

export const gameDataAssetFields = ['logo']
export const gameDataObjectFields = {
  logo: 'asset->_ref',
}

export const createPlayerObject = (playerData: any = {}): Player => {
  return {
    tags: playerData.tags ?? [],
    games: playerData.games ?? (playerData.game ? [playerData.game] : []),
    name: playerData.name ?? '',
    bicon: playerData.bicon ?? '',
  } as Player
}

export const playerDataFields = Object.keys(createPlayerObject())
export const playerDataArrayFields = ['games', 'tags']
export const playerDataAssetFields = ['bicon']
