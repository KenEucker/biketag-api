import { BikeTagClient } from '../client'
import { GAMES_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGamePayload } from '../common/payloads'
import { Game } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getGame(
  client: BikeTagClient,
  payload: getGamePayload
): Promise<BikeTagApiResponse<Game[]>> {
  delete payload.source

  return client
    .request({
      url: getApiUrl(payload.host, GAMES_ENDPOINT, payload.game),
      data: payload,
    })
    .then((response) => {
      const success = response?.status !== 200
      return {
        data: response.data as unknown as Game[],
        success,
        error: success ? response.statusText : undefined,
        source: AvailableApis[AvailableApis.biketag],
        status: success ? HttpStatusCode.Ok : response.status,
      }
    })
    .catch((error) => {
      return {
        data: null,
        success: false,
        error: error.message,
        source: AvailableApis[AvailableApis.biketag],
        status: HttpStatusCode.InternalServerError,
      }
    })
}
