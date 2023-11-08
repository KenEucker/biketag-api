import AWS from 'aws-sdk'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  getGroupedImagesByTagnumber,
  getGroupedTagsByTagnumber,
} from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGameAlbumFromCache, sortTags } from '../common/methods'
import TinyCache from 'tinycache'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function getTags(
  payload: getTagsPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag[]>> {
  let albumImages: any[] = []
  let error
  let success = true

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: payload.hash,
  }

  const s3Objects = await s3.listObjects(params).promise()

  if (payload.tagnumbers?.length) {
    albumImages = s3Objects.Contents?.filter(
      (image: any) =>
        payload.tagnumbers.indexOf(getBikeTagNumberFromImage(image, cache)) !==
        -1
    )
  } else {
    if (s3Objects.Contents) {
      albumImages = s3Objects.Contents
    } else {
      success = false
      error = 'Failed to fetch images from S3'
    }
  }

  const images = getGroupedImagesByTagnumber(albumImages, cache)
  const tags = getGroupedTagsByTagnumber(images, payload)

  return {
    data: sortTags(tags, payload.sort, payload.limit),
    success,
    error,
    source: AvailableApis[AvailableApis.s3],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
