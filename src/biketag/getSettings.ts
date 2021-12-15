import { BikeTagClient } from '../client'
import {
  SETTINGS_ENDPOINT,
  BIKETAG_API_HOST,
  API_VERSION,
} from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getSettingsPayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'

export async function getSettings(
  client: BikeTagClient,
  payload: getSettingsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  delete payload.source

  const response = await client.cachedRequest({
    url: `https://${payload.game}.${BIKETAG_API_HOST}/${API_VERSION}/${SETTINGS_ENDPOINT}`,
    data: payload,
  })

  const success = response.status === 200

  return {
    data: response.data,
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
