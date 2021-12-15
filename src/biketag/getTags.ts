import { BikeTagClient } from '../client'
import {
  TAGS_ENDPOINT,
  BIKETAG_API_HOST,
  API_VERSION,
} from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getTagsPayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'

export async function getTags(
  client: BikeTagClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  delete payload.source

  const response = await client.cachedRequest({
    url: `https://${payload.game}.${BIKETAG_API_HOST}/${API_VERSION}/${TAGS_ENDPOINT}`,
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
