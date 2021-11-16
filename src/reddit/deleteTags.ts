import RedditClient from 'snoowrap'
import { deleteTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function deleteTags(
  client: RedditClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error('deleteTags not implemented for Reddit adapter')
}
