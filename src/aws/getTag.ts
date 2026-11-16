import type { S3Client } from '@aws-sdk/client-s3'
import type { getTagPayload } from '../common/payloads'
import type { BikeTagApiResponse } from '../common/types'
import type { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getAwsBucketName, loadCurrentMainTag, isMissingAwsIndex } from './helpers'
import { getTags } from './getTags'

/** AWS current-tag lookup uses only index-0; legacy games fall back to the numbered history. */
export async function getTag(
  client: S3Client,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const bucket = getAwsBucketName(payload.game)
  const isCurrent = !payload.tagnumber && (!payload.slug || payload.slug === 'current')
  if (isCurrent) {
    try {
      const tag = await loadCurrentMainTag(client, bucket)
      if (tag) return {
        data: tag,
        success: true,
        source: AvailableApis[AvailableApis.aws],
        status: HttpStatusCode.Ok,
      }
    } catch (err: any) {
      if (!isMissingAwsIndex(err)) {
        return {
          data: null,
          success: false,
          error: err.message,
          source: AvailableApis[AvailableApis.aws],
          status: HttpStatusCode.BadRequest,
        }
      }
    }
  }

  const { data, ...response } = await getTags(client, {
    ...payload,
    limit: isCurrent ? 1 : payload.limit,
    ...(payload.tagnumber ? { tagnumbers: [payload.tagnumber] } : {}),
    ...(payload.slug && payload.slug !== 'current' ? { slugs: [payload.slug] } : {}),
  })
  return { ...response, data: data[0] ?? null }
}
