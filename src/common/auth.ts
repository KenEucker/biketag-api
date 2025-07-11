import { PartialBikeTagConfiguration } from './types'
import { BikeTagClient } from '../client'
import { AUTHORIZE_ENDPOINT } from './endpoints'
import { getApiUrl } from '../biketag/helpers'

/**
 * Performs the legacy Imgur OAuth2 authorization flow using the provided BikeTagClient and returns an Imgur access token.
 *
 * This function exchanges BikeTag client credentials for an Imgur access token by simulating the legacy Imgur OAuth2 flow, including handling cookies and redirects.
 *
 * @returns The Imgur access token as a string.
 * @throws If required cookies or tokens are missing or malformed during the authorization process.
 */
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

/**
 * Determines and returns the appropriate authorization header string for the given BikeTagClient.
 *
 * Checks for available authentication credentials in priority order: BikeTag JWT, Imgur OAuth2 token, legacy Imgur client ID, or attempts to auto-authorize using available client credentials. Throws an error if no valid authorization method is found.
 *
 * @returns The authorization header string to use for API requests.
 */
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

/**
 * Retrieves a BikeTag JWT token using the client's credentials and optional authorization override.
 *
 * Sends a POST request to the BikeTag `/authorize` endpoint with the client ID, shared secret, and access token to obtain a new JWT.
 *
 * @param authorization - Optional override for the shared secret used in the authorization request
 * @returns The BikeTag JWT token as a plain string
 */
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
 * Passively introspects an authorization token and returns the matching adapter credentials from the BikeTagClient configuration.
 *
 * If the provided token matches the configured BikeTag, Imgur, AWS, or Sanity credentials, returns the corresponding partial configuration. Returns an empty object if no match is found or if no token is provided.
 *
 * @param authorization - The authorization token to introspect.
 * @returns The matched adapter credentials as a partial configuration, or an empty object if no match is found.
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
