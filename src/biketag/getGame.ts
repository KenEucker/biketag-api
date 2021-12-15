import { BikeTagClient } from '../client'
import {
  GAMES_ENDPOINT,
  BIKETAG_API_HOST,
  API_VERSION,
} from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGamePayload } from '../common/payloads'
import { Game } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'

export async function getGame(
  client: BikeTagClient,
  payload: getGamePayload
): Promise<BikeTagApiResponse<Game[]>> {
  delete payload.source

  const response = await client.cachedRequest({
    // "https://toronto.biketag.io/api/api/game"
    url: `https://${payload.game}.${BIKETAG_API_HOST}/${API_VERSION}/${GAMES_ENDPOINT}`,
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
