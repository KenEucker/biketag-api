import TwitterClient from 'twitter-v2'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { HttpStatusCode, AvailableApis } from '../common/enums'
import { getBikeTagFromTwitterPost } from './helpers'
import { Tag } from '../common/schema'

export async function getTags(
  client: TwitterClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const tagsData: Tag[] = []
  // let fetching = true
  const tenYearsAgo = new Date()
  // const nowYearsAgo = new Date()
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)
  // while (fetching) {
  const data: any = await client.get(
    `tweets/search/recent?expansions=attachments.media_keys&media.fields=preview_image_url,url`,
    {
      query: `from: ${payload.account}`,
      // start_time: nowYearsAgo.toISOString(),
      // end_time: tenYearsAgo.toISOString(),
      max_results: '100',
    }
  )

  if (data) {
    console.log('count:', data.data.length, data)
    for (const datum of data.data) {
      tagsData.push(
        getBikeTagFromTwitterPost(datum, payload.game, data.includes?.media)
      )
    }
    // } else {
    //   fetching = false
    // }
  }

  return {
    data: tagsData,
    success: true,
    source: AvailableApis[AvailableApis.twitter],
    status: HttpStatusCode.Ok,
  }
}
