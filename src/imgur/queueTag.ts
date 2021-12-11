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
  payload: queueTagPayload | queueTagPayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  const promises: Promise<BikeTagApiResponse<Tag>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUploadPromise = (
    utp: queueTagPayload
  ): Promise<BikeTagApiResponse<Tag>> => {
    let success = true
    const uploadFoundImage = utp.foundImage && !utp.foundImageUrl
    const uploadFoundImageUrl = !utp.foundImage && utp.foundImageUrl
    const isFoundQueuedTag =
      (uploadFoundImage || uploadFoundImageUrl) &&
      !utp.mysteryImageUrl &&
      !utp.mysteryImage
    const uploadMysteryImage = utp.mysteryImage && !utp.mysteryImageUrl
    const uploadMysteryImageUrl = !utp.mysteryImage && utp.mysteryImageUrl
    const isMysteryQueuedTag =
      !(uploadFoundImage || uploadFoundImageUrl) &&
      (uploadMysteryImage || uploadMysteryImageUrl)
    const isCompleteQueuedTag =
      (!isFoundQueuedTag && !isMysteryQueuedTag && uploadMysteryImage) ||
      uploadMysteryImageUrl

    if (isCompleteQueuedTag) {
      return this.updateTag(utp)
    } else if (isFoundQueuedTag || isMysteryQueuedTag) {
      return new Promise(async (resolve) => {
        const queuedTagUploadPayload = isCompleteQueuedTag
          ? getUploadTagImagePayloadFromTagData(utp)
          : null
        if (isValidUploadTagImagePayload(queuedTagUploadPayload)) {
          const queuedTagImageUpload = (await client.upload(
            queuedTagUploadPayload as Payload
          )) as ImgurApiResponse<ImgurImage>

          if (isFoundQueuedTag) {
            utp.foundImage = undefined
            utp.foundImageUrl = queuedTagImageUpload.data?.link
          } else if (isMysteryQueuedTag) {
            utp.mysteryImage = undefined
            utp.mysteryImageUrl = queuedTagImageUpload.data?.link
          }

          success = success && queuedTagImageUpload.success
        }

        resolve({
          data: createTagObject(utp),
          success,
          source: AvailableApis[AvailableApis.imgur],
          status: HttpStatusCode.Ok,
        })
      })
    } else {
      return Promise.resolve({
        data: createTagObject(utp),
        success: false,
        source: AvailableApis[AvailableApis.imgur],
        status: HttpStatusCode.NoContent,
      })
    }
  }

  payloads.map((p) => promises.push(createUploadPromise(p)))

  return Promise.all(promises)
    .then((results) => {
      return results
    })
    .catch((e) => {
      return {
        data: e.message,
        success: false,
        source: AvailableApis[AvailableApis.imgur],
        status: HttpStatusCode.Ok,
      }
    })
}
