import type { ImgurClient } from 'imgur'
import { ImgurApiResponse, Payload } from 'imgur/lib/common/types'
import { createTagObject } from '../common/data'
import {
  getQueueTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
  queueTagImagePayload,
} from './helpers'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { Tag } from '../common/schema'
import { queueTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function queueTag(
  client: ImgurClient,
  payload: queueTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const uploadFoundImage = payload.foundImage && !payload.foundImageUrl
  const uploadFoundImageUrl = !payload.foundImage && payload.foundImageUrl
  const isFoundQueuedTag =
    (uploadFoundImage || uploadFoundImageUrl) &&
    !payload.mysteryImageUrl &&
    !payload.mysteryImage
  const uploadMysteryImage = payload.mysteryImage && !payload.mysteryImageUrl
  const uploadMysteryImageUrl = !payload.mysteryImage && payload.mysteryImageUrl
  const isMysteryQueuedTag =
    !(uploadFoundImage || uploadFoundImageUrl) &&
    (uploadMysteryImage || uploadMysteryImageUrl)
  const isCompleteQueuedTag =
    (!isFoundQueuedTag && !isMysteryQueuedTag && uploadMysteryImage) ||
    !!uploadMysteryImageUrl
  let success = false
  let status = HttpStatusCode.Ok
  let data
  let error

  if (isCompleteQueuedTag) {
    return this.updateTag(payload)
  } else if (isFoundQueuedTag || isMysteryQueuedTag) {
    const queuedTagUploadPayload = await getQueueTagImagePayloadFromTagData(
      payload as queueTagImagePayload,
      isCompleteQueuedTag
    )

    if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
      const queuedTagImageUpload = (await client.upload(
        queuedTagUploadPayload as Payload
      )) as ImgurApiResponse<ImgurImage>[]

      const queuedTagImageUploadResponse: ImgurApiResponse<ImgurImage> =
        queuedTagImageUpload.length
          ? queuedTagImageUpload[0]
          : (queuedTagImageUpload as unknown as ImgurApiResponse<ImgurImage>)
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

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status,
  }
}
