import { deleteTagsPayload } from '../common/payloads'
import TwitterClient from 'twitter-v2'
import { BikeTagApiResponse } from '../common/types'

export async function deleteTag(
  client: TwitterClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<any>> {
  throw new Error('deleteTags not implemented for Twitter adapter')
}
