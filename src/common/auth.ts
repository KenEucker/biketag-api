import { PartialBikeTagConfiguration } from './types'
import { BikeTagClient } from '../client'
import { AUTHORIZE_ENDPOINT } from './endpoints'
import { getApiUrl } from '../biketag/helpers'

async function legacyImgurAuthorizationFlow(
  client: BikeTagClient
): Promise<string> {
  const config = client.config()
  const { clientKey, clientToken } = config.biketag ?? {}

  const options: Record<string, unknown> = {
    url: getApiUrl(config.biketag.host, AUTHORIZE_ENDPOINT),
    params: {
      client_id: clientKey,
      access_token: clientToken,
      grant_type: 'refresh_token',
    },
  }

  let response = await client.plainRequest(options)

  const cookies = Array.isArray(response.headers['set-cookie'])
    ? response.headers['set-cookie'][0]
    : response.headers['set-cookie']

  if (!cookies) {
    throw new Error('No cookies were set during authorization')
  }

  const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)')

  if (!matches || matches.length < 3) {
    throw new Error('Unable to find authorize_token cookie')
  }

  const authorizeToken = matches[2]

  options.method = 'POST'
  options.data = {
    clientKey,
    clientToken,
    allow: authorizeToken,
  }

  options.followRedirect = false
  options.headers = {
    cookie: `authorize_token=${authorizeToken}`,
  }

  response = await client.request(options)
  const location = response.headers.location

  if (!location) {
    throw new Error('Unable to parse location')
  }

  const token = JSON.parse(
    '{"' +
      decodeURI(location.slice(location.indexOf('#') + 1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )

  return token.access_token
}

export async function getAuthorizationHeader(
  client: BikeTagClient
): Promise<string> {
  const config = client.config()

  // 🔎 1️⃣ Check if we have a valid biketag accessToken (JWT):
  if (config.biketag?.accessToken) {
    return `JWT ${config.biketag.accessToken}`
  }

  // 🔎 2️⃣ Check if we have a valid Imgur accessToken (OAuth2):
  if (config.imgur?.accessToken) {
    return `Bearer ${config.imgur.accessToken}`
  }

  // 🔎 3️⃣ Check if we have a legacy Imgur clientKey:
  if (config.imgur?.clientId) {
    return `Client-ID ${config.imgur.clientId}`
  }

  // 🔎 4️⃣ If biketag API config exists but no token yet, auto-authorize:
  if (config.biketag?.clientKey && config.biketag?.clientToken) {
    const jwt = await retrieveBiketagJwt(client, config.biketag.clientKey)
    client.config({ biketag: { accessToken: jwt } }, false, false)
    return `JWT ${jwt}`
  }

  // 🔎 5️⃣ If Imgur fallback required (legacy web OAuth2 flow):
  if (config.imgur?.clientId && config.imgur?.clientSecret) {
    const token = await legacyImgurAuthorizationFlow(client)
    client.config({ imgur: { accessToken: token } }, false, false)
    return `Bearer ${token}`
  }

  throw new Error('Unable to determine appropriate authorization header')
}

// Internal helper to run the biketag auth flow:
async function retrieveBiketagJwt(
  client: BikeTagClient,
  authorization?: string
): Promise<string> {
  const config = client.config()
  const clientId =
    typeof window !== 'undefined'
      ? window.location.hostname
      : config.biketag?.host?.replace(/^https?:\/\//, '') || 'localhost'
  const sharedKey = authorization || config.biketag.clientKey
  const accessToken = config.biketag.accessToken

  const authorizePayload = {
    client_id: clientId,
    client_secret: sharedKey,
    access_token: accessToken,
    grant_type: 'refresh_token',
  }

  const response = await client.plainRequest({
    url: `${config.biketag.host}/authorize`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: authorizePayload,
  })

  return response.data // JWT as plain string body
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
 * - If the provided `authorization` matches the configured biketag accessToken,
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

  if (config.biketag?.accessToken === authorization) {
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
