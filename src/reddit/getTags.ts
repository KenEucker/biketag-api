import RedditClient from 'snoowrap'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import { getTagsPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'

export async function getTags(
  client: RedditClient,
  options: getTagsPayload
): Promise<BikeTagApiResponse<TagData[]>> {
  if (!options) {
    throw new Error('no options')
  }

  const query = `subreddit:${options.subreddit} title:Bike Tag`

  options.sort = options.sort ?? 'new'
  options.limit = options.limit ?? 10
  options.time = options.time ?? 'all'

  return client
    .getSubreddit(options.subreddit)
    .search({ query, ...options })
    .then(async (redditPosts) => {
      const redditBikeTagData = await getBikeTagsFromRedditPosts(
        redditPosts,
        this.images
      )
      const bikeTags: TagData[] = []

      for (const biketagPost of redditBikeTagData) {
        bikeTags.push(await getBikeTagInformationFromRedditData(biketagPost))
      }

      const response = {
        data: bikeTags,
        status: 1,
        success: true,
        source: AvailableApis.reddit,
      }

      return response as BikeTagApiResponse<TagData[]>
    })
}
