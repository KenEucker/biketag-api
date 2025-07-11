import { BikeTagClient } from '../client'
import { TOKEN_ENDPOINT } from '../common/endpoints'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { fetchSignedUrlPayload } from '../common/payloads'
import { getApiUrl } from './helpers'
import { BikeTagApiResponse } from '../common/types'

/**
 * Requests a signed URL from the BikeTag API using the provided payload.
 *
 * Validates the presence of a required key in the payload and sends a POST request to the API. Returns an object containing the signed URL data if successful, along with status and error information.
 *
 * @param payload - The request parameters, including the required key and other relevant data.
 * @returns An object containing the signed URL data, success status, error message if any, API source identifier, and HTTP status code.
 */
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
