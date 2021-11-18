import { SanityClient } from '@sanity/client'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import {
  constructTagFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { tagDataFields } from '../common/data'
import { getTagPayload } from '../common/payloads'

export async function getTag(
  client: SanityClient,
  options: getTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  if (!options) {
    throw new Error('no options')
  }

  if (!options.slug?.length && !options.tagnumber) {
    throw new Error('no slug or tagnumber')
  }

  let slug = ''
  let tagnumber = ''

  if (options.slug) {
    slug = `&& slug.current == "${options.slug}"`
  }

  if (options.tagnumber) {
    tagnumber = `&& tagnumber == ${options.tagnumber}`
  }

  const fieldsFilter = options.fields?.length ? options.fields : tagDataFields
  const fields = constructSanityFieldsQuery(fieldsFilter)

  const slugIsLatest = options.slug === 'latest'
  const slugIsFirst = options.slug === 'first'
  const slugQuery = slugIsLatest
    ? `|order(tagnumber desc)[0]`
    : slugIsFirst
    ? `|order(tagnumber asc)[0]`
    : slug.length
    ? slug
    : tagnumber

  const query =
    slugIsLatest || slugIsFirst
      ? `*[_type == "tag"]{${fields}}${slugQuery}`
      : `*[_type == "tag" ${slugQuery}][0]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((tag) => {
    // construct tagData object from tag
    const tagData = constructTagFromSanityObject(tag, fieldsFilter)

    // wrap tag in BikeTagApiResponse
    const response = {
      data: tagData,
      status: 1,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<Tag>
  })
}
