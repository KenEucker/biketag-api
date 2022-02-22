import RedditClient from 'snoowrap'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getTagsPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function getTags(
  client: RedditClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const query = `subreddit:${payload.subreddit} title:Bike Tag ${
    payload.tagnumbers?.length ? payload.tagnumbers.join(' ') : ''
  }`
  const maxPerRequest = 500

  payload.sort = payload.sort ?? 'new'
  payload.limit = payload.limit ?? maxPerRequest
  payload.time = payload.time ?? 'all'

  return client
    .getSubreddit(payload.subreddit)
    .search({ query, ...payload })
    .then(async (redditPosts) => {
      let fetcher = redditPosts
      while (!fetcher.isFinished) {
        fetcher = await fetcher.fetchMore({ amount: maxPerRequest })
        redditPosts.concat(fetcher)
      }

      const redditBikeTagData = await getBikeTagsFromRedditPosts(
        redditPosts,
        this.images
      )
      const bikeTags: Tag[] = []

      for (const biketagPost of redditBikeTagData) {
        bikeTags.push(
          await getBikeTagInformationFromRedditData(biketagPost, payload.game)
        )
      }

      return {
        data: bikeTags,
        status: HttpStatusCode.Ok,
        success: true,
        source: AvailableApis[AvailableApis.reddit],
      }
    })
}
