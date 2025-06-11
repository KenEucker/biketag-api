import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import {
  constructStatFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { getStatsPayload } from '../common/payloads'
import { Stat } from '../common/schema'
import { sortStats } from '../common/methods'

export async function getStats(
  client: SanityClient,
  payload: getStatsPayload
): Promise<BikeTagApiResponse<Stat[]>> {
  const fields = constructSanityFieldsQuery(payload.fields, DataTypes.stat)
  const fieldsFilter = payload.fields?.length ? payload.fields : []
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.stat],
    payload.game,
    undefined,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((statsData) => {
    const stats = statsData.map((stat: any) =>
      constructStatFromSanityObject(stat, fieldsFilter)
    )

    const response = {
      data: sortStats(stats, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Stat[]>
  })
}
