import { BikeTagClient } from '../client'
import { IMAGE_ENDPOINT } from '../common/endpoints'
import { BikeTagApiResponse, Tag } from '../common/types'

export async function getTagImage(
  client: BikeTagClient,
  imageHash: string
): Promise<BikeTagApiResponse<Tag>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`
  return (await client.request({ url, method: 'DELETE' }))
    .data as unknown as BikeTagApiResponse<Tag>
}
