import { BikeTagClient } from '../client'
import { TOKEN_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { fetchSignedUrlPayload } from '../common/payloads'
import { getApiUrl } from './helpers'
import { BikeTagApiResponse } from '../common/types'

export async function fetchSignedUrl(
  client: BikeTagClient,
  payload: fetchSignedUrlPayload
): Promise<BikeTagApiResponse<string>> {
  let data,
    error,
    success = false

  if (!payload.key) {
    error = 'Missing key for signed URL request'
  }

  const opts = {
    url: getApiUrl(payload.host, TOKEN_ENDPOINT, payload.game),
    method: 'POST',
    data: payload,
  }

  const response = await client.request(opts)

  if (response.status !== 200 || !response.data) {
    error = `Failed to fetch signed URL for key: ${payload.key}`
  } else {
    success = true
    data = response.data
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.biketag],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
