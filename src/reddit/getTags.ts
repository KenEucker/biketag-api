import RedditClient from 'snoowrap'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import { getTagsPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'
import { HttpStatusCode } from '../common/responses'

export async function getTags(
  client: RedditClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!payload) {
    throw new Error('no options')
  }

  const query = `subreddit:${payload.subreddit} title:Bike Tag`
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

      const response = {
        data: bikeTags,
        status: HttpStatusCode.Ok,
        success: true,
        source: AvailableApis[AvailableApis.reddit],
      }

      return response as BikeTagApiResponse<Tag[]>
    })
}
