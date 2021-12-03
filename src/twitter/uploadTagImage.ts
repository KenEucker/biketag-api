import { uploadTagImagePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import TwitterClient from 'twitter-v2'
import { Errors } from '../common/enums'
import { Tag } from '../common/schema'

export async function uploadTagImage(
  client: TwitterClient,
  payload: uploadTagImagePayload | uploadTagImagePayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  // const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  // const payloads = Array.isArray(payload) ? payload : [payload]

  throw new Error(`uploadTagImage ${Errors.NotImplemented} Twitter`)
}
