import { BikeTagClient } from '../client'
import { getTagPayload } from '../common/payloads'
import { Tag } from '../common/schema'
import { BikeTagApiResponse } from '../common/types'
import TinyCache from 'tinycache'

export async function getTag(
  client: BikeTagClient,
  payload: getTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  const getTagsResponse = await client.getTags(payload, cache)

  return {
    ...getTagsResponse,
    ...{
      data: (getTagsResponse.success
        ? getTagsResponse.data[0]
        : getTagsResponse.data) as Tag,
    },
  }
}
