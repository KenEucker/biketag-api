import { Tag, Game, Player } from './schema'
import { CommonPayloadData } from './types'
import { SanityUploadPayload } from '../common/data'

export type SortOptions = 'new' | 'relevance' | 'hot' | 'top' | 'comments'

export type getTagsPayload = {
  fields?: string[]
  slugs?: string[]
  hash?: string
  account?: string
  time?: 'year' | 'hour' | 'day' | 'week' | 'month' | 'all'
  sort?: SortOptions
  limit?: number
  tagnumbers: number[]
} & CommonPayloadData

export type deleteTagsPayload = {
  slugs?: string[]
  tagnumbers: number[]
  tags?: Partial<Tag>[]
} & CommonPayloadData

export type getTagPayload = {
  tagnumber: number
  time?: 'all'
  sort?: 'new'
  limit?: number
  hash?: string
  account?: string
  slug: string
  fields?: string[]
} & CommonPayloadData

export type deleteTagPayload = {
  hash?: string
} & Partial<Tag>

export type archiveTagPayload = {
  archivehash?: string
  playerId?: string
} & Partial<Tag>

export type updateGamePayload = Partial<Game> & SanityUploadPayload
export type updateTagPayload = Partial<Tag> & SanityUploadPayload
export type updatePlayerPayload = Partial<Player> & SanityUploadPayload

export type uploadTagImagePayload = {
  tagnumber: number
  type: 'found' | 'mystery'
  slug?: string
  stream: ReadableStream
} & CommonPayloadData

export type ImgurUploadPayload = {
  image: string
  title?: string
  description?: string
  type?: string
  hash?: string
  album?: string
}

export type getGamePayload = {
  slug: string
  name: string
  hash?: string
  fields?: string[]
} & CommonPayloadData

export type getPlayersPayload = {
  fields?: string[]
  slugs?: string[]
  sort?: SortOptions
  hash?: string
  limit?: number
  account?: string
  names?: string[]
} & CommonPayloadData

export type getPlayerPayload = {
  name?: string
  fields?: string[]
  slug?: string
  hash?: string
  account?: string
} & CommonPayloadData

export type getSettingPayload = {
  fields?: string[]
  slug?: string
} & CommonPayloadData

export type getSettingsPayload = {
  fields?: string[]
  sort?: SortOptions
  limit?: number
  slugs?: string[]
} & CommonPayloadData

export type getAchievementPayload = {
  player?: string
  fields?: string[]
  slug?: string
} & CommonPayloadData

export type getAchievementsPayload = {
  player?: string
  fields?: string[]
  sort?: SortOptions
  limit?: number
  slugs?: string[]
} & CommonPayloadData

export type getAmbassadorsPayload = {
  fields?: string[]
  limit?: number
  sort?: SortOptions
  slugs?: string[]
} & CommonPayloadData

export type getAmbassadorPayload = {
  fields?: string[]
  slug?: string
} & CommonPayloadData

export type importTagPayload = Pick<
  Tag,
  'discussionUrl' | 'mysteryImageUrl' | 'foundImageUrl' | 'mentionUrl'
> &
  CommonPayloadData

export type getQueuePayload = {
  hash?: string
  queuehash?: string
} & CommonPayloadData

export type queueTagPayload = {
  queuehash?: string
  playerId?: string
} & Partial<Tag>
