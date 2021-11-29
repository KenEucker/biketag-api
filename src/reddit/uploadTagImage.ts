import RedditClient from 'snoowrap'
import { Errors } from '../common/enums'
import { uploadTagImagePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function uploadTagImage(
  client: RedditClient,
  payload: uploadTagImagePayload
): Promise<BikeTagApiResponse<boolean>> {
  throw new Error(`uploadTagImage ${Errors.NotImplemented} Reddit`)
}
