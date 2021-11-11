import RedditClient from 'snoowrap'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import { getTagPayload } from '../common/payloads'
import {
  getBikeTagInformationFromRedditData,
  getBikeTagsFromRedditPosts,
} from './helpers'

export async function getTag(
  client: RedditClient,
  options: getTagPayload
): Promise<BikeTagApiResponse<TagData | undefined>> {
  if (!options) {
    throw new Error('no options')
  }

  if (!options.subreddit) {
    throw new Error('no subreddit set')
  }

  const query = `subreddit:${options.subreddit} title:Bike Tag`

  options.sort = options.sort ?? 'new'
  options.limit = 1
  options.time = options.time ?? 'all'

  return client
    .getSubreddit(options.subreddit)
    .search({ query, ...options })
    .then(async (redditPosts) => {
      const redditBikeTagData: TagData[] = await getBikeTagsFromRedditPosts(
        redditPosts,
        this.images
      )

      const response = {
        data: await getBikeTagInformationFromRedditData(redditBikeTagData[0]),
        status: 1,
        success: true,
        source: AvailableApis.reddit,
      }

      return response as BikeTagApiResponse<TagData>
    })
}
