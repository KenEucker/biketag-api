import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import {
  getQueueTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
  queueTagPayload,
} from './helpers'
import TinyCache from 'tinycache'

/**
 * Handles queuing and uploading of tag images for a game, managing both "found" and "mystery" tag states, and updates tag data in AWS S3.
 *
 * Determines the type of tag operation (found, mystery, or complete), validates player eligibility, uploads images if necessary, and updates tag records accordingly. Returns a response indicating the result of the operation, including success status, error messages, and the updated tag data.
 *
 * @param payload - The tag data and images to be queued or uploaded.
 * @returns An API response containing the tag data, success status, error message if any, and HTTP status code.
 */
export async function queueTag(
  client: S3Client,
  payload: queueTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  const uploadFoundImage = payload?.foundImage && !payload?.foundImageUrl
  const uploadFoundImageUrl = !payload?.foundImage && !!payload?.foundImageUrl
  const isFoundQueuedTag =
    (uploadFoundImage || uploadFoundImageUrl) &&
    !payload?.mysteryImageUrl &&
    !payload?.mysteryImage

  const uploadMysteryImage = payload?.mysteryImage && !payload?.mysteryImageUrl
  const uploadMysteryImageUrl =
    !payload?.mysteryImage && !!payload?.mysteryImageUrl
  const isMysteryQueuedTag =
    !isFoundQueuedTag && (uploadMysteryImage || uploadMysteryImageUrl)

  const isCompleteQueuedTag = uploadFoundImageUrl && uploadMysteryImageUrl

  let success = false
  let status = HttpStatusCode.Ok
  let data: Tag | undefined
  let error: string | undefined

  const queuedTagsResponse = await this.getQueue({ game: payload.game }, cache)
  const currentTagsResponse = await this.getTags({ game: payload.game }, cache)
  const queuedTags = queuedTagsResponse.data || []
  const currentTag = currentTagsResponse?.data?.[0]

  const playerAlreadyQueuedError =
    !isCompleteQueuedTag &&
    queuedTags.some((t) => t.foundPlayer === payload.foundPlayer)

  if (playerAlreadyQueuedError) {
    data = payload as Tag
    success = false
    error = 'player already has queued tag'
    status = HttpStatusCode.Conflict
  } else if (currentTag?.mysteryPlayer === payload.foundPlayer) {
    data = payload as Tag
    success = false
    error = 'player created previous round'
    status = HttpStatusCode.Conflict
  } else {
    if (isCompleteQueuedTag) {
      const mysteryTagUpdatePayload = payload
      const foundTagUpdatePayload = {
        ...payload,
        tagnumber: payload.tagnumber - 1,
      }

      const [mysteryTagUpdateResponse, foundTagUpdateResponse] =
        await Promise.all([
          this.updateTag(client, mysteryTagUpdatePayload),
          this.updateTag(client, foundTagUpdatePayload),
        ])

      if (mysteryTagUpdateResponse.success && foundTagUpdateResponse.success) {
        data = payload as Tag
        success = true
      } else {
        success = false
        error = `found: ${foundTagUpdateResponse.error}, mystery: ${mysteryTagUpdateResponse.error}`
      }
    } else if (isFoundQueuedTag || isMysteryQueuedTag) {
      const isMystery = isMysteryQueuedTag
      const queuedTagUploadPayload = await getQueueTagImagePayloadFromTagData(
        payload,
        payload.region,
        isMystery
      )

      if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
        const uploadResponse = await this.uploadTagImage(
          client,
          queuedTagUploadPayload
        )

        if (uploadResponse.success) {
          const uploaded = uploadResponse.data
          if (isFoundQueuedTag && uploaded.foundImageUrl) {
            payload.foundImage = undefined
            payload.foundImageUrl = uploaded.foundImageUrl
          } else if (isMysteryQueuedTag && uploaded.mysteryImageUrl) {
            payload.mysteryImage = undefined
            payload.mysteryImageUrl = uploaded.mysteryImageUrl
          }

          data = createTagObject(payload)
          success = true
        } else {
          error = uploadResponse.error
        }

        status = uploadResponse.status
      } else {
        success = false
        status = HttpStatusCode.BadRequest
        error = 'Invalid image payload'
      }
    } else {
      data = createTagObject(payload)
      success = false
      status = HttpStatusCode.NoContent
    }
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status,
  }
}
