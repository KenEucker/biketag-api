import { BikeTagClient } from '../client'
import { ACHIEVEMENTS_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getAchievementsPayload } from '../common/payloads'
import { Achievement } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getAchievements(
  client: BikeTagClient,
  payload: getAchievementsPayload
): Promise<BikeTagApiResponse<Achievement[]>> {
  delete payload.source
  const opts = {
    url: getApiUrl(payload.host, ACHIEVEMENTS_ENDPOINT, payload.game),
    data: payload,
  }

  /// TODO: allow getting achievements by Player
  const response = await (payload.cached
    ? client.cachedRequest(opts)
    : client.request(opts))

  const success = response.status === 200

  return {
    data: response.data as unknown as Achievement[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
