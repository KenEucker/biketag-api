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
  const requestMethod = payload.cached ? client.cachedRequest : client.request

  const response = await requestMethod({
    url: getApiUrl(payload.host, PLAYERS_ENDPOINT, payload.game),
    data: payload,
  })

  const success = response.status === 200

  return {
    data: response.data as unknown as Player[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
