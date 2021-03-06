import RedditClient from 'snoowrap'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getTagPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function getTag(
  client: RedditClient,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag | undefined>> {
  if (!payload) {
    throw new Error('no payload options')
  }

  if (!payload.subreddit) {
    throw new Error('no subreddit set')
  }

  const query = `subreddit:${payload.subreddit} title:Bike Tag ${
    payload.tagnumber ?? ''
  }`

  payload.sort = payload.sort ?? 'new'
  payload.limit = 1
  payload.time = payload.time ?? 'all'

  return client
    .getSubreddit(payload.subreddit)
    .search({ query, ...payload })
    .then(async (redditPosts) => {
      const redditBikeTagData: Tag[] = await getBikeTagsFromRedditPosts(
        redditPosts,
        this.images
      )

      const response = {
        data: await getBikeTagInformationFromRedditData(
          redditBikeTagData[0],
          payload.game
        ),
        status: HttpStatusCode.Found,
        success: true,
        source: AvailableApis[AvailableApis.reddit],
      }

      return response as BikeTagApiResponse<Tag>
    })
}
