import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
import { constructTagDataObject } from '../common/methods'
import { tagDataReferenceFields } from '../common/data'
import { getTagOptions } from '../common/options'

export async function getTag(
  client: SanityClient,
  options: getTagOptions
): Promise<BikeTagApiResponse<TagData>> {
  if (!options) {
    throw new Error('no options')
  }

  if (!options.slug.length) {
    throw new Error('no slug')
  }

  const fields = options.fields
    .reduce((o: any, f: any) => {
      o += `${f}${tagDataReferenceFields.indexOf(f) != -1 ? '->{name}' : ''},`
      return o
    }, '')
    .slice(0, -1)

  const slugIsLatest = options.slug === 'latest'
  const slugIsFirst = options.slug === 'first'
  const slugQuery = slugIsLatest
    ? `|order(tagnumber desc)[0]`
    : slugIsFirst
    ? `|order(tagnumber asc)[0]`
    : ` && slug.current == "${options.slug}"`

  const query =
    slugIsLatest || slugIsFirst
      ? `*[_type == "tag"]{${fields}}${slugQuery}`
      : `*[_type == "tag" ${slugQuery}][0]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((tag) => {
    // construct tagData object from tag
    const tagData = constructTagDataObject(tag, options.fields)

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
