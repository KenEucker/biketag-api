import { RequireAtLeastOne, TagData } from './types'

export type getTagsPayload = {
  fields: string[]
  slugs: string[]
  tagnumbers: number[]
  game: string
}

export type getTagPayload = {
  tagnumber: number
  slug: string
  fields: string[]
}

export type updateTagPayload = {
  _id?: string
  tag: RequireAtLeastOne<TagData>
  game: string
}

export type getGameDataPayload = {
  slug: string
  name: string
  fields: string[]
}
