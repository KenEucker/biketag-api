import {
  AccessToken,
} from './common/types';
import {
  isBikeTagAccessToken,
  isBikeTagClientId,
  isBikeTagLogin,
} from './common/methods';
import { BikeTagClient } from './client';
import { BIKETAG_API_PREFIX, AUTHORIZE_ENDPOINT } from './common/endpoints';

export async function getAuthorizationHeader(
  client: BikeTagClient
): Promise<string> {
  if (isBikeTagAccessToken(client.credentials)) {
    return `Bearer ${client.credentials.accessToken}`;
  }

  if (isBikeTagClientId(client.credentials) && !isBikeTagLogin(client.credentials)) {
    return `Client-ID ${client.credentials.clientId}`;
  }

  const { clientId, username, password } = client.credentials;

  const options: Record<string, unknown> = {
    prefixUrl: BIKETAG_API_PREFIX,
    searchParams: {
      client_id: clientId,
      response_type: 'token',
    },
  };

  let response = await client.plainRequest(AUTHORIZE_ENDPOINT, options);

  const cookies = Array.isArray(response.headers['set-cookie'])
    ? response.headers['set-cookie'][0]
    : response.headers['set-cookie'];

  if (!cookies) {
    throw new Error('No cookies were set during authorization');
  }

  const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)');

  if (!matches || matches.length < 3) {
    throw new Error('Unable to find authorize_token cookie');
  }

  const authorizeToken = matches[2];

  options.method = 'POST';
  options.form = {
    username,
    password,
    allow: authorizeToken,
  };

  options.followRedirect = false;
  options.headers = {
    cookie: `authorize_token=${authorizeToken}`,
  };

  response = await client.plainRequest(AUTHORIZE_ENDPOINT, options);
  const location = response.headers.location;
  if (!location) {
    throw new Error('Unable to parse location');
  }

  const token = JSON.parse(
    '{"' +
      decodeURI(location.slice(location.indexOf('#') + 1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );

  const accessToken = token.access_token;
  ((client.credentials as unknown) as AccessToken).accessToken = accessToken;
  return `Bearer ${accessToken}`;
}
