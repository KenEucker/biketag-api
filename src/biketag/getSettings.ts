import { BikeTagClient } from '../client'
import { SETTINGS_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getSettingsPayload } from '../common/payloads'
import { Setting } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getSettings(
  client: BikeTagClient,
  payload: getSettingsPayload
): Promise<BikeTagApiResponse<Setting[]>> {
  delete payload.source
  const opts = {
    url: getApiUrl(payload.host, SETTINGS_ENDPOINT, payload.game),
    data: payload,
  }

  const response = await (payload.cached
    ? client.cachedRequest(opts)
    : client.request(opts))

  const success = response.status === 200

  return {
    data: response.data as unknown as Setting[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
