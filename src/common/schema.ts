import { geopoint } from './types'

/// ****************************  Schema Data Types   ********************************** ///
export type UserMetadata = {
  social: {
    reddit: string
    imgur: string
    discord: string
  }
}

export type Setting = {
  _id?: string
  _type?: string
  slug: string
  name: string
  description: string
  key: string
  value: string
}

export type Achievement = {
  _id?: string
  _type?: string
  slug: string
  name: string
  description: string
  key: string
  value: string
  group: string
}

export type Region = {
  slug: string
  name: string
  description: string
  zipcode: number
}

export type Player = {
  _id?: string
  _type?: string
  slug: string
  name: string
  bicon: string
  games: string[]
  achievements: string[]
  tags: Tag[]
  metadata: UserMetadata
}

export type Ambassador = {
  _id?: string
  _type?: string
  id: string
  slug: string
  name: string
  address1: string
  address2: string
  city: string
  country: string
  zipcode: number
  email: string
  phone: string
  player: Player
  metadata: UserMetadata
}

export interface Tag {
  _id?: string
  _type?: string
  slug: string
  name: string
  tagnumber: number
  mysteryPlayer: string
  mysteryImage?: string
  mysteryImageUrl: string
  mysteryTime: number
  foundPlayer: string
  foundImage?: string
  foundImageUrl: string
  foundTime: number
  foundLocation: string
  confirmedBoundary: boolean
  game: string
  hint: string
  discussionUrl?: string
  mentionUrl?: string
  shareUrl?: string
  gps: geopoint
  playerId?: string
}

export interface settingsArray {
  [key: string]: string
}

export interface Game {
  _id?: string
  _type?: string
  slug: string
  name: string
  ambassadors: string[]
  settings: settingsArray
  boundary: string
  mainhash?: string
  archivehash?: string
  queuehash?: string
  subreddit?: string
  twitter?: string
  logo: string
  region: Region
}

export type Documents =
  | Tag
  | Player
  | Game
  | Region
  | Ambassador
  | Setting
  | Achievement
