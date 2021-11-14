import { Game, RequireAtLeastOne, TagData } from './types'

export type getTagsPayload = {
  fields?: string[]
  slugs?: string[]
  account?: string
  subreddit?: string
  time?: 'year' | 'hour' | 'day' | 'week' | 'month' | 'all'
  sort?: 'new' | 'relevance' | 'hot' | 'top' | 'comments'
  limit?: number
  tagnumbers: number[]
  game: string
}

export type deleteTagPayload = {
  slug?: string
  tagnumber?: string
  game?: string
}

export type deleteTagsPayload = {
  slugs?: string[]
  tagnumbers: number[]
  tags?: Partial<TagData>[]
  game: string
}

export type getTagPayload = {
  tagnumber: number
  time?: 'all'
  sort?: 'new'
  limit?: number
  subreddit?: string
  game: string
  slug: string
  fields?: string[]
}

export type updateTagPayload = {
  tag: RequireAtLeastOne<TagData>
  game: string
}

export type uploadTagImagePayload = {
  tagnumber: number
  type: 'found' | 'mystery' | 'queued'
  slug?: string
  stream: ReadableStream
}

export type getGameDataPayload = {
  slug: string
  name: string
  fields?: string[]
}

export type importTagPayload = Pick<
  TagData,
  | 'discussionUrl'
  | 'mysteryImageUrl'
  | 'foundImageUrl'
  | 'mentionUrl'
  | 'shareUrl'
> &
  Game
