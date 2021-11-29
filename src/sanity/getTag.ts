import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, Tag } from '../common/types'
import {
  constructTagFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { tagDataFields } from '../common/data'
import { getTagPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { AvailableApis } from '../common/enums'

export async function getTag(
  client: SanityClient,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  if (!payload) {
    throw new Error('no payload options')
  }

  if (!payload.slug?.length && !payload.tagnumber) {
    throw new Error('no slug or tagnumber')
  }

  let slug = ''
  let tagnumber = ''

  if (payload.slug) {
    slug = `&& slug.current == "${payload.slug}"`
  }

  if (payload.tagnumber) {
    tagnumber = `&& tagnumber == ${payload.tagnumber}`
  }

  const fieldsFilter = payload.fields?.length ? payload.fields : tagDataFields
  const fields = constructSanityFieldsQuery(fieldsFilter)

  const slugIsCurrent = payload.slug === 'current'
  const slugIsFirst = payload.slug === 'first'
  const slugQuery = slugIsCurrent
    ? `|order(tagnumber desc)[0]`
    : slugIsFirst
    ? `|order(tagnumber asc)[0]`
    : slug.length
    ? slug
    : tagnumber

  const query =
    slugIsCurrent || slugIsFirst
      ? `*[_type == "tag"]{${fields}}${slugQuery}`
      : `*[_type == "tag" ${slugQuery}][0]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((tag) => {
    // construct tagData object from tag
    const tagData = constructTagFromSanityObject(tag, fieldsFilter)

    // wrap tag in BikeTagApiResponse
    const response = {
      data: tagData,
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<Tag>
  })
}
