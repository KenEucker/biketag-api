import { BikeTagClient } from '../client'
import { IMAGE_ENDPOINT } from '../common/endpoints'
import { BikeTagApiResponse } from '../common/types'

export async function favoriteImage(
  client: BikeTagClient,
  imageHash: string
): Promise<BikeTagApiResponse<'favorited'>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}/favorite`
  return (await client.request({ url, method: 'POST' }))
    .data as unknown as BikeTagApiResponse<'favorited'>
}
