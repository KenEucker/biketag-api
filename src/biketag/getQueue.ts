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
  payload.source = undefined
  const opts = {
    url: getApiUrl(payload.host, QUEUE_ENDPOINT, payload.game),
    data: payload,
  }

  if (payload.resize || payload.reindex) {
    const params = []
    if (payload.resize) params.push('resize=true')
    if (payload.reindex) params.push('reindex=true')
    opts.url = `${opts.url}?${params.join('&')}`
  }

  const response = await (payload.cached
    ? client.cachedRequest(opts)
    : client.request(opts))

  const success = response.status === 200

  return {
    data: response.data as unknown as Tag[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
