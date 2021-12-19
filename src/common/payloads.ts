import { Tag } from './schema'
import { CommonData, RequireAtLeastOne } from './types'

export type SortOptions = 'new' | 'relevance' | 'hot' | 'top' | 'comments'

export type getTagsPayload = {
  fields?: string[]
  slugs?: string[]
  hash?: string
  account?: string
  subreddit?: string
  time?: 'year' | 'hour' | 'day' | 'week' | 'month' | 'all'
  sort?: SortOptions
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
  hash?: string
  fields?: string[]
} & CommonData

export type getPlayersPayload = {
  fields?: string[]
  slugs?: string[]
  sort?: SortOptions
  hash?: string
  limit?: number
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
  sort?: SortOptions
  limit?: number
  slugs?: string[]
} & CommonData

export type getAmbassadorsPayload = {
  fields?: string[]
  limit?: number
  sort?: SortOptions
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

export type getQueuePayload = {
  hash?: string
  queuehash?: string
} & CommonData

export type queueTagPayload = {
  tag: Tag
  queuehash?: string
} & Partial<Tag>
