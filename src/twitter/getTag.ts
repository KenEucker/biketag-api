import TwitterClient from 'twitter-v2'
import { getTagPayload } from '../common/payloads'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import { getBikeTagFromTwitterPost } from './helpers'

export async function getTag(
  client: TwitterClient,
  options: getTagPayload
): Promise<BikeTagApiResponse<TagData[]>> {
  const tagsData: TagData[] = []

  const data: any = await client.get(
    `tweets/search/recent?expansions=attachments.media_keys&media.fields=preview_image_url,url`,
    {
      query: `from: ${options.account} ${
        options.tagnumber ? `bike tag ${options.tagnumber}` : ''
      }`,
      max_results: '1',
    }
  )

  if (data) {
    console.log('count:', data.data.length, data)
    for (const datum of data.data) {
      tagsData.push(
        getBikeTagFromTwitterPost(datum, options.game, data.includes?.media)
      )
    }
  }

  return {
    data: tagsData,
    success: true,
    source: AvailableApis[AvailableApis.twitter],
    status: 200,
  }
}
