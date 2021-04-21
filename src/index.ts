import {
  BikeTagClient,
  BikeTagConfiguration,
  BikeTagCredentials,
} from './client'

export { BikeTagClient, BikeTagConfiguration, BikeTagCredentials }

export default (opts) => new BikeTagClient(opts)
