import { uploadTagImagePayload } from '../common/payloads'
import { BikeTagApiResponse, Tag } from '../common/types'
import TwitterClient from 'twitter-v2'
import { Errors } from '../common/enums'

export async function uploadTagImage(
  client: TwitterClient,
  payload: uploadTagImagePayload | uploadTagImagePayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  // const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  // const payloads = Array.isArray(payload) ? payload : [payload]

  throw new Error(`uploadTagImage ${Errors.NotImplemented} Twitter`)
}
