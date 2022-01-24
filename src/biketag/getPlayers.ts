import { BikeTagClient } from '../client'
import { PLAYERS_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getPlayersPayload } from '../common/payloads'
import { Player } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getPlayers(
  client: BikeTagClient,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  delete payload.source
  const opts = {
    url: getApiUrl(payload.host, PLAYERS_ENDPOINT, payload.game),
    data: payload,
  }

  const response = await (payload.cached
    ? client.cachedRequest(opts)
    : client.request(opts))

  const success = response.status === 200

  return {
    data: response.data as unknown as Player[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
