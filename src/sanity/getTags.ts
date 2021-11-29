import { SanityClient } from '@sanity/client'
import {
  BikeTagApiResponse,
  Tag,
} from '../common/types'
import {
  AvailableApis,
  DataTypes,
} from '../common/enums'
import {
  constructTagFromSanityObject,
  constructSanityFieldsQuery,
  constructSanityDocumentQuery,
} from './helpers'
import { tagDataFields } from '../common/data'
import { getTagsPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { sortTags } from '../common/methods'

export async function getTags(
  client: SanityClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const fieldsFilter = payload.fields?.length ? payload.fields : tagDataFields
  const fields = constructSanityFieldsQuery(fieldsFilter)
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.tag],
    payload.game,
    payload.slugs,
    payload.tagnumbers,
    fields
  )

  return client.fetch(query, {}).then((tags) => {
    const tagsData = tags.map((tag: any) =>
      constructTagFromSanityObject(tag, fieldsFilter)
    )

    const response = {
      data: sortTags(tagsData, payload.sort),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Tag[]>
  })
}
