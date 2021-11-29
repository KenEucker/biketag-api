import RedditClient from 'snoowrap'
import { Errors } from '../common/enums'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function updateTag(
  client: RedditClient,
  payload: updateTagPayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error(`updateTag ${Errors.NotImplemented} Reddit`)
}
