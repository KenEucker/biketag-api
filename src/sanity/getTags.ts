import { SanityClient } from '@sanity/client'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import {
  constructTagFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { tagDataFields } from '../common/data'
import { getTagsPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'

export async function getTags(
  client: SanityClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!payload) {
    throw new Error('no options')
  }

  let slugs = ''
  let tagnumbers = ''

  if (payload.slugs?.length) {
    slugs = `&& slug.current in ${JSON.stringify(payload.slugs)}`
  }

  if (payload.tagnumbers?.length) {
    tagnumbers = `&& tagnumber in ${JSON.stringify(payload.tagnumbers)}`
  }

  const fieldsFilter = payload.fields?.length ? payload.fields : tagDataFields
  const fields = constructSanityFieldsQuery(fieldsFilter)
  const query = `*[_type == "tag" && game._ref in *[_type=="game" && lower(name)=="${payload.game.toLowerCase()}"]._id ${slugs} ${tagnumbers}]{${fields}}`
  const params = {}

  return client.fetch(query, params).then((tags) => {
    const tagsData = tags.map((tag: any) =>
      constructTagFromSanityObject(tag, fieldsFilter)
    )

    const response = {
      data: tagsData,
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Tag[]>
  })
}
