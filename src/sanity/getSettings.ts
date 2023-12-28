import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import {
  constructSettingFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { getSettingsPayload } from '../common/payloads'
import { Setting } from '../common/schema'
import { sortSettings } from '../common/methods'

export async function getSettings(
  client: SanityClient,
  payload: getSettingsPayload
): Promise<BikeTagApiResponse<Setting[]>> {
  const fields = constructSanityFieldsQuery(payload.fields, DataTypes.setting)
  const fieldsFilter = payload.fields?.length ? payload.fields : []
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.setting],
    payload.game,
    undefined,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((settingsData) => {
    const settings = settingsData.map((setting: any) =>
      constructSettingFromSanityObject(setting, fieldsFilter)
    )

    const response = {
      data: sortSettings(settings, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Setting[]>
  })
}
