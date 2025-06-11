import { BikeTagClient } from '../client'
import { STATS_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getSettingsPayload } from '../common/payloads'
import { Stat } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getStats(
  client: BikeTagClient,
  payload: getSettingsPayload
): Promise<BikeTagApiResponse<Stat[]>> {
  delete payload.source
  const opts = {
    url: getApiUrl(payload.host, STATS_ENDPOINT, payload.game),
    data: payload,
  }

  const response = await (payload.cached
    ? client.cachedRequest(opts)
    : client.request(opts))

  const success = response.status === 200

  return {
    data: response.data as unknown as Stat[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
