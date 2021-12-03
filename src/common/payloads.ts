import { Tag } from './schema'
import { CommonData, RequireAtLeastOne } from './types'

export type getTagsPayload = {
  fields?: string[]
  slugs?: string[]
  hash?: string
  account?: string
  subreddit?: string
  time?: 'year' | 'hour' | 'day' | 'week' | 'month' | 'all'
  sort?: 'new' | 'relevance' | 'hot' | 'top' | 'comments'
  limit?: number
  tagnumbers: number[]
} & CommonData

export type deleteTagPayload = {
  slug?: string
  tagnumber?: string
} & CommonData

export type deleteTagsPayload = {
  slugs?: string[]
  tagnumbers: number[]
  tags?: Partial<Tag>[]
} & CommonData

export type getTagPayload = {
  tagnumber: number
  time?: 'all'
  sort?: 'new'
  limit?: number
  hash?: string
  subreddit?: string
  account?: string
  slug: string
  fields?: string[]
} & CommonData

export type updateTagPayload = {
  tag: RequireAtLeastOne<Tag>
} & CommonData

export type uploadTagImagePayload = {
  tagnumber: number
  type: 'found' | 'mystery'
  slug?: string
  stream: ReadableStream
} & CommonData

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
  fields?: string[]
} & CommonData

export type getPlayersPayload = {
  fields?: string[]
  slugs?: string[]
  sort?: 'new' | 'relevance' | 'hot' | 'top' | 'comments'
  hash?: string
  account?: string
  subreddit?: string
} & CommonData

export type getPlayerPayload = {
  fields?: string[]
  slug?: string
  hash?: string
  account?: string
  subreddit?: string
} & CommonData

export type getSettingPayload = {
  fields?: string[]
  slug?: string
} & CommonData

export type getSettingsPayload = {
  fields?: string[]
  slugs?: string[]
} & CommonData

export type getAmbassadorsPayload = {
  fields?: string[]
  slugs?: string[]
} & CommonData
export type getAmbassadorPayload = {
  fields?: string[]
  slug?: string
} & CommonData

export type importTagPayload = Pick<
  Tag,
  'discussionUrl' | 'mysteryImageUrl' | 'foundImageUrl' | 'mentionUrl'
> &
  CommonData

export type getQueuePayload = CommonData

export type queueTagImagePayload = {
  tagnumber: number
  type: 'found' | 'mystery'
  mysteryPlayer: string
  foundPlayer: string
  stream: ReadableStream
  queueHash?: string
} & Partial<Tag>
