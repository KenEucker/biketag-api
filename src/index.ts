import { BikeTagClient } from './client'
export { BikeTagClient }

export type { BikeTagConfiguration, BikeTagCredentials } from './client'

export type { BikeTagApiResponse, BikeTagGameContext } from './common/types'

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
