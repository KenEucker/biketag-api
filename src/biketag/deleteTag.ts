import { BikeTagClient } from '../client'
import { DELETE_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getQueuePayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import { getApiUrl } from './helpers'

export async function deleteTag(
  client: BikeTagClient,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  payload.source = undefined
  const opts = {
    url: getApiUrl(payload.host, DELETE_ENDPOINT, payload.game),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  }

  const response = await client.request(opts)
  const success = response.status === 200

  return {
    data: response.data as unknown as Tag[],
    success,
    error: !success ? response.statusText : undefined,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : response.status,
  }
}
