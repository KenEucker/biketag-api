import AWS from 'aws-sdk'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { getGroupedImagesByTagnumber, getGroupedTagsByPlayer } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGameAlbumFromCache, sortTags } from '../common/methods'
import TinyCache from 'tinycache'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function getQueue(
  payload: getQueuePayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag[]>> {
  if (!payload.queuehash) {
    const game = await this.getGame(payload.game)
    if (game.data) {
      payload.queuehash = game.data.queuehash
    }
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: payload.queuehash,
  }

  const s3Objects = await s3.listObjects(params).promise()

  const images = getGroupedImagesByTagnumber(s3Objects.Contents, cache)
  const queuedTags = getGroupedTagsByPlayer(images, payload)

  return {
    data: sortTags(queuedTags, 'relevance'),
    success: true,
    source: AvailableApis[AvailableApis.s3],
    status: HttpStatusCode.Ok,
  }
}
