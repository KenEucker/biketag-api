import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import TwitterClient from 'twitter-v2'
import { Errors } from '../common/enums'
import { Tag } from '../common/schema'

export async function updateTag(
  client: TwitterClient,
  payload: updateTagPayload | updateTagPayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  // const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  // const payloads = Array.isArray(payload) ? payload : [payload]

  throw new Error(`updateTag ${Errors.NotImplemented} Twitter`)
}
