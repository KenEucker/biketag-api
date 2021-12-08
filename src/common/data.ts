import { Tag, Game, Player, Ambassador, Setting } from './schema'

export const cacheKeys = {
  sanityUrlText: `sanity::`,
  imageHashText: `hash::`,
  albumHash: `imgur::`,
  redditPosts: `reddit::`,
  bikeTagImage: `biketag::`,
  bikeTagsByUser: `usertags::`,
  hintText: `hint::`,
  creditText: `credit::`,
  playerText: `player::`,
  gameText: `game::`,
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
    tagnumber: tagData.tagnumber ?? '',
    mysteryImage: tagData.mysteryImage,
    mysteryImageUrl: tagData.mysteryImageUrl ?? '',
    game: tagData.game ?? '',
    slug: tagData.slug ?? '',
    name: tagData.name ?? '',
    mysteryPlayer: tagData.mysteryPlayer ?? '',
    foundPlayer: tagData.foundPlayer ?? '',
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
    name: gameData.name ?? gameData.slug ?? '',
    ambassadors: gameData.ambassadors ?? [],
    boundary: gameData.boundary ?? {},
    mainhash: gameData.mainhash ?? '',
    queuehash: gameData.queuehash ?? '',
    subreddit: gameData.subreddit ?? '',
    twitter: gameData.twitter ?? '',
    logo: gameData.logo,
    region: gameData.region ?? '',
    slug: gameData.slug ?? gameData.name ?? '',
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
    bicon: playerData.bicon ?? '',
    name: playerData.name ?? '',
    slug: playerData.slug ?? '',
  } as Player
}

export const playerDataFields = Object.keys(createPlayerObject())
export const playerDataReferenceFields = ['games', 'tags']
export const playerDataArrayFields = ['games', 'tags']
export const playerDataAssetFields = ['bicon']
export const playerDataObjectFields = {
  bicon: 'asset->_ref',
}

export const createAmbassadorObject = (
  ambassadorData: any = {}
): Ambassador => {
  return {
    address1: ambassadorData.address1 ?? '',
    address2: ambassadorData.address2 ?? '',
    city: ambassadorData.city ?? '',
    country: ambassadorData.country ?? '',
    email: ambassadorData.email ?? '',
    name: ambassadorData.name ?? '',
    phone: ambassadorData.phone ?? '',
    player: ambassadorData.player ?? '',
    slug: ambassadorData.slug ?? '',
    zipcode: ambassadorData.zipcode ?? '',
  } as Ambassador
}

export const ambassadorDataFields = Object.keys(createPlayerObject())
export const ambassadorDataReferenceFields = ['player']

export const createSettingObject = (settingData: any = {}): Setting => {
  return {
    slug: settingData.slug ?? '',
    description: settingData.description ?? '',
    name: settingData.name ?? '',
    key: settingData.key ?? '',
    value: settingData.value ?? '',
  } as Setting
}
export const settingDataFields = Object.keys(createSettingObject())
