import TwitterClient from 'twitter-v2'
import { getTagPayload } from '../common/payloads'
import { BikeTagApiResponse, Tag } from '../common/types'
import { getBikeTagFromTwitterPost } from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function getTag(
  client: TwitterClient,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const tagsData: Tag[] = []

  const data: any = await client.get(
    `tweets/search/recent?expansions=attachments.media_keys&media.fields=preview_image_url,url`,
    {
      query: `from: ${payload.account} ${
        payload.tagnumber ? `bike tag ${payload.tagnumber}` : ''
      }`,
      max_results: '1',
    }
  )

  if (data) {
    console.log('count:', data.data.length, data)
    for (const datum of data.data) {
      tagsData.push(
        getBikeTagFromTwitterPost(datum, payload.game, data.includes?.media)
      )
    }
  }

  return {
    data: tagsData,
    success: true,
    source: AvailableApis[AvailableApis.twitter],
    status: HttpStatusCode.Ok,
  }
}
