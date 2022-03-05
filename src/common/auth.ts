import { AccessToken, BikeTagCredentials } from './types'
import { hasClientKey, hasAccessToken } from './methods'
import { BikeTagClient } from '../client'
import {
  BIKETAG_API_HOST,
  AUTHORIZE_ENDPOINT,
  TOKEN_ENDPOINT,
} from './endpoints'

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
      client_id: clientKey,
      access_token: clientToken,
      grant_type: 'refresh_token',
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

export async function getClaims(
  client: BikeTagClient,
  authorization?: string
): Promise<Partial<BikeTagCredentials>> {
  // @ts-ignore
  // const { clientKey, clientToken } = client.config.biketag

  try {
    if (!authorization) {
      const options: Record<string, unknown> = {
        url: TOKEN_ENDPOINT,
        baseURL: BIKETAG_API_HOST,
      }
      const response = await client.request(options)
      return response.data as unknown as BikeTagCredentials
    }
  } catch (e) {
    /// swallow self whole
  }
  const config = client.config()

  if (config.biketag.accessToken === authorization) {
    /// TODO: get all claims
    return config as unknown as BikeTagCredentials
  } else if (config.imgur?.refreshToken === authorization) {
    /// TODO: get all Imgur claims
    return {
      imgur: {
        accessToken: config.imgur.accessToken,
      },
    } as unknown as BikeTagCredentials
  } else if (config.sanity?.token === authorization) {
    /// TODO: get all Sanity claims
    return {
      sanity: {
        token: config.sanity.token,
        projectId: config.imgur.clientSecret,
        dataset: config.sanity.dataset,
        apiVersion: config.sanity.apiVersion,
        useCdn: config.sanity.useCdn,
        username: config.sanity.username,
        password: config.sanity.password,
      },
    } as unknown as BikeTagCredentials
  } else if (config.reddit?.refreshToken === authorization) {
    /// TODO: get all Reddit claims
    return {
      reddit: {
        userAgent: config.reddit.userAgent,
        username: config.reddit.username,
        password: config.reddit.password,
        subreddit: config.reddit.subreddit,
        clientId: config.reddit.clientId,
        clientSecret: config.reddit.clientSecret,
        refreshToken: config.reddit.refreshToken,
      },
    } as unknown as BikeTagCredentials
  } else if (config.twitter?.bearer_token === authorization) {
    /// TODO: get all Twitter claims
    return {
      twitter: {
        access_token_key: config.twitter.access_token_key,
        access_token_secret: config.twitter.access_token_secret,
        bearer_token: config.twitter.bearer_token,
        consumer_secret: config.twitter.consumer_secret,
        consumer_key: config.twitter.consumer_key,
        account: config.twitter.account,
      },
    } as unknown as BikeTagCredentials
  } else {
    /// invalid auth
    return {}
  }
}
