import { BikeTagClient } from '../client'
import { Errors } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'

export async function favoriteImage(
  client: BikeTagClient,
  imageHash: string
): Promise<BikeTagApiResponse<'favorited'>> {
  throw Errors.NotImplemented
}
