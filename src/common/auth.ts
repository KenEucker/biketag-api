import { PartialBikeTagConfiguration } from './types'
import { BikeTagClient } from '../client'
import { AUTHORIZE_ENDPOINT } from './endpoints'
import { getApiUrl } from '../biketag/helpers'

export async function getAuthorizationHeader(
  client: BikeTagClient
): Promise<string> {
  const config = client.config()

  if (config.biketag?.clientToken) {
    return `JWT ${config.biketag.clientToken}`
  } else if (config.biketag?.clientKey) {
    const jwt = await retrieveBiketagJwt(client, config.biketag.clientKey)
    return `JWT ${jwt}`
  }

  throw new Error('Unable to determine appropriate authorization header')
}

// Internal helper to run the biketag auth flow:
export const retrieveBiketagJwt = async (
  client: BikeTagClient,
  clientAssertionOverride?: string
): Promise<string> => {
  const config = client.config()

  const rawHost =
    typeof window !== 'undefined'
      ? window.location.hostname
      : config.biketag?.host ||
        `${config.biketag.game ? config.biketag.game + '.' : ''}localhost`

  const origin = rawHost
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/:\d+$/, '')

  const clientAssertion = clientAssertionOverride || config.biketag?.clientKey

  const authorizePayload = {
    client_id: origin,
    client_assertion: clientAssertion,
    grant_type: 'biketag_origin_assertion',
  }

  const response = await client.plainRequest({
    url: getApiUrl(config.biketag?.host, AUTHORIZE_ENDPOINT),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: authorizePayload,
  })

  if (!response.data) {
    throw new Error('Failed to retrieve biketag JWT')
  }

  const clientToken = response.data

  client.config({
    biketag: {
      clientToken,
    },
  })

  return clientToken
}

/**
 * getClaims
 *
 * Purpose:
 * -----------
 * Given an `authorization` token, this function passively introspects the token
 * and determines if it matches any configured adapter credentials
 * (biketag, imgur, aws, sanity) within this BikeTagClient instance.
 *
 * Behavior:
 * -----------
 * - If the provided `authorization` matches the configured biketag clientToken,
 *   returns the biketag adapter credentials.
 * - If it matches an imgur, aws, or sanity token, returns those credentials.
 * - If no match is found or if `authorization` is not provided, returns an empty object (`{}`).
 *
 * Notes:
 * -----------
 * - This function does NOT proactively obtain new credentials
 * - This utility serves primarily as a way to inspect "What does this token map to?"
 *
 * @param client - The BikeTagClient instance holding current adapter configurations.
 * @param authorization - The authorization token to introspect.
 * @returns PartialBikeTagConfiguration containing the matched adapter credentials
 *          or `{}` if no match is found.
 */
export async function getClaims(
  client: BikeTagClient,
  authorization?: string
): Promise<PartialBikeTagConfiguration | Record<string, never>> {
  const config = client.config()

  if (!authorization) {
    return {} // 🔒 No auth provided = reject.
  }

  if (config.biketag?.clientToken === authorization) {
    return {
      biketag: config.biketag,
    }
  }

  if (config.aws?.secretAccessKey == authorization) {
    return {
      aws: config.aws,
    }
  }

  if (config.imgur?.refreshToken === authorization) {
    return {
      imgur: config.imgur,
    }
  }

  if (config.sanity?.token === authorization) {
    return {
      sanity: config.sanity,
    }
  }

  return {}
}
