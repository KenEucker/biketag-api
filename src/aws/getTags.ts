import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import TinyCache from 'tinycache'

export async function getTags(
  client: S3Client,
  payload: getTagsPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag[]>> {
  let error
  let success = true
  const tags = []

  if (payload.tagnumbers?.length) {
    payload.tagnumbers.forEach(async (tagNumber: number) => {
      client.send(
        new GetObjectCommand({
          Bucket: 'biketag-portland',
          Key: `biketag-portland-${tagNumber}`,
        })
      )
    })
  } else if (payload.slugs?.length) {
    const imagePromises: Promise<Tag>[] = []
    success = true
  } else {
    if (albumInfo.success) {
      albumImages = albumInfo.data?.images ?? []
    } else {
      success = false
      error = albumInfo.data
    }
  }

  return {
    data: sortTags(tags, payload.sort, payload.limit, payload.time),
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
