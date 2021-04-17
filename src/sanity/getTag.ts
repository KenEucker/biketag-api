import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'

const tagDataFields = [
  "slug",
  "tagnumber",
  "mysteryImage",
  "mysteryImageUrl",
  "game",
  "player",
  "hint",
  "discussionUrl",
  "foundLocation",
  "gps",
  "foundImage",
  "foundImageUrl",
];

const tagDataReferenceFields = [
  "game",
  "player"
]

export async function getTag(
  client: SanityClient,
  options: any
): Promise<BikeTagApiResponse<TagData>> {
  if (!options) {
    throw new Error('no options')
  }

  options = typeof options === 'string' ? { slug: options } : options
  options = typeof options === 'number' ? { slug: `portland-tag-${options}` } : options
  options.slug = options.slug ? options.slug : `portland-tag-${options.tagnumber}`
  options.fields = options.fields ? options.fields : tagDataFields

  if (!options.slug.length) {
    throw new Error('no slug')
  }

  const fields = options.fields.reduce((o: any, f: any) => {
    o += `${f}${tagDataReferenceFields.indexOf(f) != -1 ? '->{name}' : ''},`
    return o
  }, '').slice(0, -1)

  const query = `*[_type == "tag" && slug.current == "${options.slug}"][0]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((tag) => {
    // construct tagData object from tag
    const tagData = options.fields?.length
      ? options.fields.reduce((o: any, f: any) => {
          o[f] = tag[f]
          return o
        }, {})
      : tag

    tagDataReferenceFields.forEach(f => {
      if (typeof tagData[f] !== 'undefined') {
        tagData[f] = tagData[f].name
      }
    })

    // wrap tag in BikeTagApiResponse
    const response = {
      data: tagData,
      status: 1,
      success: true,
      source: 'sanity',
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<TagData>
  })
}
