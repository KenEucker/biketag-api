import RedditClient from 'snoowrap'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function updateTag(
  client: RedditClient,
  payload: updateTagPayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error('updateTag not implemented for Reddit adapter')
}
