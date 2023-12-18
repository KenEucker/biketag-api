import type { ImgurClient } from 'imgur'
import { Payload } from 'imgur/lib/common/types'
import { createTagObject } from '../common/data'
import {
  getQueueTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
  queueTagImagePayload,
  getUpdateTagPayloadFromTagData,
} from './helpers'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { queueTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { UpdateImagePayload } from 'imgur/lib/image'
import TinyCache from 'tinycache'

export async function queueTag(
  client: ImgurClient,
  payload: queueTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  const uploadFoundImage =
    payload?.foundImage && !(payload?.foundImageUrl?.length > 0)
  const uploadFoundImageUrl =
    !payload?.foundImage && payload?.foundImageUrl?.length > 0
  const isFoundQueuedTag =
    (uploadFoundImage || uploadFoundImageUrl) &&
    !(payload?.mysteryImageUrl?.length > 0) &&
    !payload?.mysteryImage
  const uploadMysteryImage =
    payload?.mysteryImage && !(payload?.mysteryImageUrl?.length > 0)
  const uploadMysteryImageUrl =
    !payload?.mysteryImage && payload?.mysteryImageUrl?.length > 0
  const isMysteryQueuedTag =
    !(uploadFoundImage || uploadFoundImageUrl) &&
    (uploadMysteryImage || uploadMysteryImageUrl)
  const isCompleteQueuedTag = uploadFoundImageUrl && uploadMysteryImageUrl
  let success = false
  let status = HttpStatusCode.Ok
  let data
  let error

  const queuedTags = await this.getQueue(
    { queuehash: payload.queuehash },
    cache
  )
  const playerAlreadyQueuedError =
    !isCompleteQueuedTag &&
    queuedTags.data?.find((t) => t.foundPlayer === payload.foundPlayer)
  const currentTags = await this.getTags(undefined, cache)
  const currentTag = currentTags?.data?.length ? currentTags.data[0] : undefined

  if (playerAlreadyQueuedError) {
    data = payload
    success = false
    error = 'player already has queued tag'
    status = HttpStatusCode.Conflict
  } else if (currentTag.mysteryPlayer === payload.foundPlayer) {
    data = payload
    success = false
    error = 'player created previous round'
    status = HttpStatusCode.Conflict
  } else {
    if (isCompleteQueuedTag) {
      /// Update just the mystery image (current.tagnumber + 1)
      const mysteryTagUpdatePayload = getUpdateTagPayloadFromTagData(
        payload,
        true
      )
      const mysteryTagUpdateResponse = await client.updateImage(
        mysteryTagUpdatePayload as UpdateImagePayload
      )

      /// Update just the found image (current.tagnumber)
      payload.tagnumber = payload.tagnumber - 1
      const foundTagUpdatePayload = getUpdateTagPayloadFromTagData(payload)
      const foundTagUpdateResponse = await client.updateImage(
        foundTagUpdatePayload as UpdateImagePayload
      )
      if (foundTagUpdateResponse.success && mysteryTagUpdateResponse.success) {
        data = payload
        success = true
      } else {
        success = false
        error = `found: ${foundTagUpdateResponse.data}, mystery: ${mysteryTagUpdateResponse.data}`
      }
    } else if (isFoundQueuedTag || isMysteryQueuedTag) {
      const queuedTagUploadPayload = await getQueueTagImagePayloadFromTagData(
        payload as queueTagImagePayload,
        isMysteryQueuedTag
      )

      if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
        const queuedTagImageUploadResponse = await client.upload(
          queuedTagUploadPayload as Payload
        )
        if (queuedTagImageUploadResponse.success) {
          const queuedTagImage = queuedTagImageUploadResponse.data
          if (queuedTagImage) {
            if (isFoundQueuedTag) {
              payload.foundImage = undefined
              payload.foundImageUrl = queuedTagImage.link
            } else if (isMysteryQueuedTag) {
              payload.mysteryImage = undefined
              payload.mysteryImageUrl = queuedTagImage.link
            }
          }
          data = createTagObject(payload)
        } else {
          error = queuedTagImageUploadResponse.data
        }

        status = queuedTagImageUploadResponse.status
        success = queuedTagImageUploadResponse.success
      } else {
        success = false
        status = HttpStatusCode.BadRequest
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
    source: AvailableApis[AvailableApis.imgur],
    status,
  }
}
