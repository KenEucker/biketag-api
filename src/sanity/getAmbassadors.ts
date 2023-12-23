import { SanityClient } from '@sanity/client'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'
import { Ambassador } from '../common/schema'
import {
  constructAmbassadorFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { ambassadorDataFields } from '../common/data'
import { getAmbassadorsPayload } from '../common/payloads'
import { sortAmbassadors } from '../common/methods'

export async function getAmbassadors(
  client: SanityClient,
  payload: getAmbassadorsPayload
): Promise<BikeTagApiResponse<Ambassador[]>> {
  const fields = constructSanityFieldsQuery(
    payload.fields,
    DataTypes.ambassador
  )
  const fieldsFilter = payload.fields?.length
    ? payload.fields
    : ambassadorDataFields
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.ambassador],
    payload.game,
    undefined,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((ambassadors) => {
    const ambassadorsData = ambassadors.map((ambassador: any) =>
      constructAmbassadorFromSanityObject(ambassador, fieldsFilter)
    )

    const response = {
      data: sortAmbassadors(ambassadorsData, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Ambassador[]>
  })
}
