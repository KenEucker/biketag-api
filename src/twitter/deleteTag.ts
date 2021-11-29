import { deleteTagPayload } from '../common/payloads'
import TwitterClient from 'twitter-v2'
import { BikeTagApiResponse } from '../common/types'
import { Errors } from '../common/enums'

export async function deleteTag(
  client: TwitterClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<any>> {
  throw new Error(`deleteTag ${Errors.NotImplemented} Twitter`)
}
