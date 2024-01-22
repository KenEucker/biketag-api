import { BikeTagClient } from './client'
export { BikeTagClient }

export type { BikeTagConfiguration, BikeTagCredentials } from './client'

export type { BikeTagApiResponse } from './common/types'

export {
  createGameObject,
  createTagObject,
  createPlayerObject,
} from './common/data'

export default BikeTagClient
