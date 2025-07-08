import { BikeTagClient } from './client'
export { BikeTagClient }

export type { BikeTagConfiguration, BikeTagCredentials } from './client'

export type { BikeTagApiResponse } from './common/types'

import * as helpers from './imgur/helpers'
export { helpers }

export type {
  Tag,
  Game,
  Player,
  Ambassador,
  Stat,
  Setting,
  Achievement,
  Region,
} from './common/schema'

export {
  createGameObject,
  createTagObject,
  createPlayerObject,
} from './common/data'

export default BikeTagClient
