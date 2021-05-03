export type getTagsPayload = {
  fields: string[]
  slugs: string[]
  tagnumbers: number[]
  game: string
}

export type getTagPayload = {
  slug: string
  fields: string[]
}

export type updateTagPayload = {
  slug: string
  fields: string[]
}
