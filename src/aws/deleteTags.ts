import { S3Client } from '@aws-sdk/client-s3'
import { deleteTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { deleteTag } from './deleteTag'

export async function deleteTags(
  client: S3Client,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<boolean[]>> {
  const { tags = [], folder, game } = payload

  const results: boolean[] = new Array(tags.length)

  // Fire off all deletions in parallel
  await Promise.allSettled(
    tags.map(async (tag, index) => {
      try {
        if (!tag.tagnumber) {
          results[index] = false
          return
        }

        const res = await deleteTag(client, {
          tagnumber: tag.tagnumber,
          folder,
          game,
        })
        results[index] = res.success
      } catch {
        results[index] = false
      }
    })
  )

  const success = results.every(Boolean)

  return {
    data: results,
    success,
    error: success ? undefined : 'One or more deletions failed',
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
