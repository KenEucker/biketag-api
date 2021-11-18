import RedditClient from 'snoowrap'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import { getTagsPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'

export async function getTags(
  client: RedditClient,
  options: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!options) {
    throw new Error('no options')
  }

  const query = `subreddit:${options.subreddit} title:Bike Tag`
  const maxPerRequest = 500

  options.sort = options.sort ?? 'new'
  options.limit = options.limit ?? maxPerRequest
  options.time = options.time ?? 'all'

  return client
    .getSubreddit(options.subreddit)
    .search({ query, ...options })
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
          await getBikeTagInformationFromRedditData(biketagPost, options.game)
        )
      }

      const response = {
        data: bikeTags,
        status: 1,
        success: true,
        source: AvailableApis[AvailableApis.reddit],
      }

      return response as BikeTagApiResponse<Tag[]>
    })
}
