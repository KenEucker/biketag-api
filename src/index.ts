import { BikeTagClient, BikeTagConfiguration } from './client'

export type {
  BikeTagClient as BikeTagClient,
  BikeTagConfiguration as BikeTagConfiguration,
  BikeTagCredentials,
} from './client'

export default (opts: BikeTagConfiguration) => new BikeTagClient(opts)
