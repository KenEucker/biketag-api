import { BIKETAG_API_HOST, API_VERSION } from '../common/endpoints'

export const getApiUrl = (host = '', endpoint = '', subdomain = ''): string =>
  `${
    host.length
      ? host
      : `https://${
          subdomain.length ? `${subdomain}.` : ''
        }${BIKETAG_API_HOST}/${API_VERSION}`
  }/${endpoint}`
