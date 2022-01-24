import { BIKETAG_API_HOST, API_VERSION } from '../common/endpoints'

export const getApiUrl = (host = '', endpoint = '', subdomain = ''): string =>
  `${
    host.length && host.indexOf('http') === 0
      ? host // full host
      : `https://${subdomain.length ? `${subdomain}.` : ''}${
          host.length ? host : BIKETAG_API_HOST // partial host
        }/${API_VERSION}` // version
  }/${endpoint}` // path
