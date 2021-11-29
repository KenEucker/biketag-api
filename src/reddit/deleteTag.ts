import RedditClient from 'snoowrap'
import { Errors } from '../common/enums'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function deleteTag(
  client: RedditClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error(`deleteTag ${Errors.NotImplemented} Reddit`)
}
