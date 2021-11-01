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
  slug: string
  fields: string[]
}

export type getGameDataPayload = {
  slug: string
  name: string
  fields: string[]
}
