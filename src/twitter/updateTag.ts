import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse, TagData } from '../common/types'
import TwitterClient from 'twitter-v2'

export async function updateTag(
  client: TwitterClient,
  payload: updateTagPayload | updateTagPayload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  // const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  // const payloads = Array.isArray(payload) ? payload : [payload]

  throw new Error('updateTag not implemented for Twitter adapter')
}
