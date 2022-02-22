import RedditClient from 'snoowrap'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getRedditPostTextFromTagData } from '../common/getters'

export async function updateTag(
  client: RedditClient,
  payload: updateTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const existingRedditPost = await this.getTag(client, payload)
  let error

  if (existingRedditPost) {
    /// Update tag
  } else {
    /// Create tag
    const redditPostText = getRedditPostTextFromTagData(
      payload as unknown as Tag,
      payload
    )

    let selfPostName

    // const renderOpts = merge(currentTagInfo, {
    //     region: config.region,
    //     subdomainIcon: config.images.logo
    //         ? `/public/img/${config.images.logo}${
    //               config.images.logo.indexOf('.') === -1 ? `-small.png` : ''
    //           }`
    //         : config.meta.image,
    //     host: `${config.requestSubdomain ? `${config.requestSubdomain}.` : ''}${
    //         config.requestHost || config.host
    //     }`,
    //     mapLink:
    //         config.map && config.map.url
    //             ? `[Check out the map for ${config.region}!](${config.map.url})`
    //             : '',
    // })

    const hasFlairId = false
    const flairOpts: any = {
      text: 'BikeTag',
    }

    if (hasFlairId) {
      flairOpts.flair_template_id = hasFlairId
      flairOpts.text = undefined
    }

    /// Create a new BikeTag self post
    const redditRequest = client
      .getSubreddit(payload.subreddit)
      .submitSelfpost({
        subredditName: payload.subreddit,
        title: `Bike Tag #${payload.tagnumber}`,
        text: redditPostText,
      })

    // if (payload.assignFlair) redditRequest.assignFlair(flairOpts)
    // if (payload.approveNewPost) redditRequest.approve()
    // if (payload.stickyNewPost) redditRequest.sticky()
    // if (payload.distinguishAsMod) redditRequest.distinguish()

    const selfPostResult = await redditRequest.then((response) => {
      if (!response) {
        error = 'error updating Reddit post'
        payload.discussionUrl = undefined
      } else {
        selfPostName = response.name
        payload.discussionUrl = `redd.it/${response.name}`
      }
    })

    /// this crosspost can't be submitted with a different user
    const crossPostResult = await (client.getSubmission(selfPostName) as any)
      .submitCrosspost({
        subredditName: 'biketag',
        title: `[X-Post r/${payload.subreddit}] Bike Tag #${payload.tagnumber} (${payload.game})`,
        resubmit: false,
      })
      .then((response) => {
        error = error || response.error
        // crossPostName = response.name
      })
  }

  return {
    data: createTagObject(payload),
    status: HttpStatusCode.Ok,
    error,
    success: !error,
    source: AvailableApis[AvailableApis.reddit],
  }
}
