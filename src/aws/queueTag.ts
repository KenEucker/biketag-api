import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import {
  getQueueTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
  getUpdateTagPayloadFromTagData,
  queueTagPayload,
} from './helpers'
import { uploadTagImage } from './uploadTagImage'
import TinyCache from 'tinycache'

/// TODO: this function is incomplete. It should be saving to a title and description field just like we do with Imgur for storing all of the tag data.
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
      const mysteryTagUpdatePayload = getUpdateTagPayloadFromTagData(
        payload,
        true
      )
      const foundTagUpdatePayload = getUpdateTagPayloadFromTagData({
        ...payload,
        tagnumber: payload.tagnumber - 1,
      })

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
        isMystery
      )

      if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
        const uploadResponse = await uploadTagImage(
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
