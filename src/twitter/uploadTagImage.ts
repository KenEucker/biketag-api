import { uploadTagImagePayload } from '../common/payloads'
import { BikeTagApiResponse, TagData } from '../common/types'
import TwitterClient from 'twitter-v2'

export async function uploadTagImage(
  client: TwitterClient,
  payload: uploadTagImagePayload | uploadTagImagePayload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  // const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  // const payloads = Array.isArray(payload) ? payload : [payload]

  throw new Error('uploadTagImage not implemented for Twitter adapter')
}
