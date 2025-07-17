import { S3Client } from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { loadIndex } from './helpers'
import { sortTags } from '../common/methods'

export async function getTags(
  client: S3Client,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    region,
    folder = 'main',
    tagnumbers,
    slugs,
    sort,
    limit,
    time,
    reindex,
    cached,
  } = payload

  const bucket = `${game}-biketag`
  let tags: Tag[] = []
  let success = true
  let error: string | undefined

  try {
    tags = await loadIndex(client, bucket, folder, region, cached, reindex)

    if (tagnumbers?.length) {
      tags = tags.filter((tag) => tagnumbers.includes(tag.tagnumber))
    }

    if (slugs?.length) {
      tags = tags.filter((tag) => slugs.includes(tag.slug))
    }
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data: sortTags(tags, sort, limit, time),
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
