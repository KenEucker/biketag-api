import { geopoint, boundary } from './types'

/// ****************************  Schema Data Types   ********************************** ///
export type Setting = {
  slug: string
  name: string
  description: string
  key: string
  value: string
}

export type Region = {
  slug: string
  name: string
  description: string
  zipcode: number
}

export type Player = {
  slug: string
  name: string
  bicon: string
  games: string[]
  tags: string[]
}

export type Ambassador = {
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
}

export interface Tag {
  slug: string
  name: string
  tagnumber: number
  mysteryImage?: string
  mysteryImageUrl: string
  game: string
  mysteryPlayer: string
  foundPlayer: string
  hint: string
  discussionUrl?: string
  mentionUrl?: string
  shareUrl?: string
  foundLocation: string
  gps: geopoint
  foundImage?: string
  foundImageUrl: string
}

export interface Game {
  slug: string
  name: string
  ambassadors: Ambassador[]
  boundary: boundary
  mainhash?: string
  queuehash?: string
  subreddit?: string
  twitter?: string
  logo: string
  region: Region
}

export type Documents = Tag | Player | Game | Region | Ambassador | Setting
