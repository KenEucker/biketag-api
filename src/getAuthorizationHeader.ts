import { AccessToken } from './common/types'
import { hasClientKey, hasAccessToken } from './common/methods'
import { BikeTagClient } from './client'
import { BIKETAG_API_HOST, AUTHORIZE_ENDPOINT } from './common/endpoints'

export async function getAuthorizationHeader(
  client: BikeTagClient
): Promise<string> {
  const config = client.config()

  if (hasAccessToken(config.biketag) && config.biketag.clientKey) {
    return `Bearer ${config.biketag.accessToken}`
  }

  if (hasClientKey(config.biketag) && !hasAccessToken(config)) {
    return `Client-ID ${config.biketag.clientKey}`
  }

  // @ts-ignore
  const { clientKey, clientToken } = client.config.biketag

  const options: Record<string, unknown> = {
    url: AUTHORIZE_ENDPOINT,
    baseURL: BIKETAG_API_HOST,
    params: {
      clientKey,
      type: 'token',
    },
  }

  let response = await client.request(options)

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

  const accessToken = token.access_token
  ;(client.config as unknown as AccessToken).accessToken = accessToken

  return `Bearer ${accessToken}`
}
