import { deleteTagsPayload } from '../common/payloads'
import TwitterClient from 'twitter-v2'
import { BikeTagApiResponse } from '../common/types'
import { Errors } from '../common/enums'

export async function deleteTag(
  client: TwitterClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<any>> {
  throw new Error(`deleteTags ${Errors.NotImplemented} Twitter`)
}
