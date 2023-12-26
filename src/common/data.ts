import { Tag, Game, Player, Ambassador, Setting, Achievement } from './schema'

export const cacheKeys = {
  sanityUrlText: `sanity::`,
  imageHashText: `hash::`,
  albumHash: `album::`,
  bikeTagImage: `biketag::`,
  bikeTagsByUser: `userTags::`,
  hintText: `hint::`,
  timeText: `time::`,
  playerText: `player::`,
  playerData: `playerData::`,
  playerIdText: `playerId::`,
  gameIdText: `gameId::`,
  gameSlugText: `slug::`,
  gameText: `game::`,
  locationText: `location::`,
  confirmedBoundaryText: `confirmedBoundary::`,
  discussionText: `discussion::`,
  mentionText: `mention::`,
  tagNumberText: `tag::`,
  imagesText: `images::`,
  imageUrlText: `imageUrl::`,
  gpsText: `gps::`,
  gpsStringText: `gpsString::`,
  slugText: `slug::`,
}

export interface SanityUploadPayload {
  _id: string
  _type: string
  slug: string
}

export const createTagObject = (
  tagData: any = {},
  foundTagData: any = {}
): Tag => {
  return {
    _id: tagData._id,
    _type: tagData._type,
    /// Common Tag Data
    game: tagData.game ?? '',
    slug: tagData.slug ?? '',
    name: tagData.name ?? '',
    playerId: tagData.playerId ?? '',
    tagnumber: tagData.tagnumber ?? 0,
    /// Mystery Tag Data
    mysteryPlayer: tagData.mysteryPlayer ?? '',
    mysteryImage: tagData.mysteryImage,
    mysteryImageUrl: tagData.mysteryImageUrl ?? '',
    mysteryTime: tagData.mysteryTime ?? 0,
    hint: tagData.hint ?? '',
    discussionUrl: tagData.discussionUrl ?? '',
    mentionUrl: tagData.mentionUrl ?? '',
    /// Found Tag Data
    foundPlayer: foundTagData.foundPlayer ?? tagData.foundPlayer ?? '',
    foundImage: foundTagData.foundImage ?? tagData.foundImage,
    foundImageUrl: foundTagData.foundImageUrl ?? tagData.foundImageUrl ?? '',
    foundTime: foundTagData.foundTime ?? tagData.foundTime ?? 0,
    foundLocation: foundTagData.foundLocation ?? tagData.foundLocation ?? '',
    confirmedBoundary:
      foundTagData.confirmedBoundary ?? tagData.confirmedBoundary ?? false,
    gps: foundTagData.gps ?? tagData.gps ?? '',
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
    _id: gameData._id,
    _type: gameData._type,
    name: gameData.name ?? gameData.slug ?? '',
    ambassadors: gameData.ambassadors ?? [],
    settings: gameData.settings ?? [],
    boundary: gameData.boundary ?? {},
    mainhash: gameData.mainhash ?? '',
    archivehash: gameData.archivehash ?? '',
    queuehash: gameData.queuehash ?? '',
    logo: gameData.logo,
    region: gameData.region ?? { name: gameData.name },
    slug: gameData.slug ?? gameData.name ?? '',
  } as Game
}

export const gameDataReferenceFields = ['region', 'settings']
export const gameDataArrayFields = ['ambassadors', 'tags', 'settings']
export const gameDataCustomFields = {
  settings: '[]->{key,value}',
  region: 'name,description,zipcode',
}

export const gameDataFields = Object.keys(createGameObject())

export const gameDataAssetFields = ['logo']
export const gameDataObjectFields = {
  logo: 'asset->_ref',
}

export const createPlayerObject = (playerData: any = {}): Player => {
  return {
    _id: playerData._id,
    _type: playerData._type,
    achievements: playerData.achievements ?? [],
    bicon: playerData.bicon ?? '',
    games: playerData.games ?? (playerData.game ? [playerData.game] : []),
    name: playerData.name ?? '',
    slug: playerData.slug ?? '',
    tags: playerData.tags ?? [],
  } as Player
}

export const playerDataFields = Object.keys(createPlayerObject())
export const playerDataReferenceFields = ['games', 'tags', 'achievements']
export const playerDataArrayFields = ['games', 'tags', 'achievements']
export const playerDataAssetFields = []
export const playerDataObjectFields = {}

export const createAmbassadorObject = (
  ambassadorData: any = {}
): Ambassador => {
  return {
    id: ambassadorData._id ?? ambassadorData.id ?? '',
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

export const ambassadorDataFields = Object.keys(createAmbassadorObject())
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

export const createAchievementObject = (
  achievementData: any = {}
): Achievement => {
  return {
    slug: achievementData.slug ?? '',
    description: achievementData.description ?? '',
    name: achievementData.name ?? '',
    key: achievementData.key ?? '',
    value: achievementData.value ?? '',
  } as Achievement
}
export const achievementDataFields = Object.keys(createAchievementObject())
