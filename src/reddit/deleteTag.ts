import RedditClient from 'snoowrap'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function deleteTag(
  client: RedditClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error('deleteTag not implemented for Reddit adapter')
}
