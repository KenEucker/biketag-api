import { BikeTagClient } from '../client'
import { AMBASSADORS_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getAmbassadorsPayload } from '../common/payloads'
import { Ambassador } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getAmbassadors(
  client: BikeTagClient,
  payload: getAmbassadorsPayload
): Promise<BikeTagApiResponse<Ambassador[]>> {
  delete payload.source
  const requestMethod = payload.cached ? client.cachedRequest : client.request

  const response = await requestMethod({
    url: getApiUrl(payload.host, AMBASSADORS_ENDPOINT, payload.game),
    data: payload,
  })

  const success = response.status === 200

  return {
    data: response.data as unknown as Ambassador[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
