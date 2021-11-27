import { SanityClient } from '@sanity/client'
import {
  AvailableApis,
  BikeTagApiResponse,
  DataTypes,
  Ambassador,
} from '../common/types'
import {
  constructAmbassadorFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { ambassadorDataFields } from '../common/data'
import { getAmbassadorsPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'

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
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((ambassadors) => {
    const ambassadorsData = ambassadors.map((ambassador: any) =>
      constructAmbassadorFromSanityObject(ambassador, fieldsFilter)
    )

    const response = {
      data: ambassadorsData,
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Ambassador[]>
  })
}
