import { BikeTagClient } from '../client'
import { QUEUE_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getQueuePayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function getQueue(
  client: BikeTagClient,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  delete payload.source
  const requestMethod = payload.cached ? client.cachedRequest : client.request

  const response = await requestMethod({
    url: getApiUrl(payload.host, QUEUE_ENDPOINT, payload.game),
    data: payload,
  })

  const success = response.status === 200

  return {
    data: response.data as unknown as Tag[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
