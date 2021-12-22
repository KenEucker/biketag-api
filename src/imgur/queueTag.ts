import type { ImgurClient } from 'imanagur'
import { ImgurApiResponse, Payload } from 'imanagur/lib/common/types'
import { createTagObject } from '../common/data'
import {
  getUploadTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
} from './helpers'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { Tag } from '../common/schema'
import { queueTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function queueTag(
  client: ImgurClient,
  payload: queueTagPayload
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
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
    uploadMysteryImageUrl
  let success = false

  if (isCompleteQueuedTag) {
    return this.updateTag(payload)
  } else if (isFoundQueuedTag || isMysteryQueuedTag) {
    return new Promise(async (resolve) => {
      const queuedTagUploadPayload = isCompleteQueuedTag
        ? getUploadTagImagePayloadFromTagData(payload)
        : null

      if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
        const queuedTagImageUpload = (await client.upload(
          queuedTagUploadPayload as Payload
        )) as ImgurApiResponse<ImgurImage>

        if (isFoundQueuedTag) {
          payload.foundImage = undefined
          payload.foundImageUrl = queuedTagImageUpload.data?.link
        } else if (isMysteryQueuedTag) {
          payload.mysteryImage = undefined
          payload.mysteryImageUrl = queuedTagImageUpload.data?.link
        }

        success = queuedTagImageUpload.success
      }

      resolve({
        data: createTagObject(payload),
        success,
        source: AvailableApis[AvailableApis.imgur],
        status: HttpStatusCode.Ok,
      })
    })
  } else {
    return Promise.resolve({
      data: createTagObject(payload),
      success: false,
      source: AvailableApis[AvailableApis.imgur],
      status: HttpStatusCode.NoContent,
    })
  }
}
