import { BikeTagClient } from '../client'
import { getTagPayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'

export async function getTag(
  client: BikeTagClient,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const getTagsResponse = await client.getTags(payload)

  return {
    ...getTagsResponse,
    ...{
      data: (getTagsResponse.success
        ? getTagsResponse.data[0]
        : getTagsResponse.data) as Tag,
    },
  }
}
