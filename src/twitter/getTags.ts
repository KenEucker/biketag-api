import TwitterClient from 'twitter-v2'
import { getTagsPayload } from '../common/payloads'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import { getBikeTagFromTwitterPost } from './helpers'

export async function getTags(
  client: TwitterClient,
  options: getTagsPayload
): Promise<BikeTagApiResponse<TagData[]>> {
  const tagsData: TagData[] = []
  const data: any = await client.get(
    `users/${options.account}/tweets?expansions=attachments.media_keys&media.fields=preview_image_url,url`
  )

  if (data) {
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
