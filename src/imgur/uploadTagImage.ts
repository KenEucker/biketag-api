import type { ImgurClient } from 'imgur'
import { ImgurApiResponse, Payload } from 'imgur/dist/common/types'
import { createTagObject } from '../common/data'
import {
  uploadTagImagePayload,
  isValidUploadTagImagePayload,
  getUploadTagImagePayloadFromTagData,
} from './helpers'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { Tag } from '../common/schema'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function uploadTagImage(
  client: ImgurClient,
  payload: uploadTagImagePayload
): Promise<BikeTagApiResponse<Tag>> {
  let success = true
  let error: any = false

  const mysteryImageUploadPayload =
    !payload.mysteryImageUrl && payload.mysteryImage
      ? getUploadTagImagePayloadFromTagData(payload, true)
      : null
  const foundImageUrlUploadPayload =
    !payload.foundImageUrl && payload.foundImage
      ? getUploadTagImagePayloadFromTagData(payload)
      : null

  return new Promise(async (resolve) => {
    if (isValidUploadTagImagePayload(foundImageUrlUploadPayload)) {
      const foundImageUpload = (await client.upload(
        foundImageUrlUploadPayload as Payload
      )) as ImgurApiResponse<ImgurImage>
      payload.foundImageUrl = foundImageUpload.data?.link
      success = success && foundImageUpload.success

      if (!foundImageUpload.success) {
        error = foundImageUpload.data
      }
    }
    if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
      const mysteryImageUpload = (await client.upload(
        mysteryImageUploadPayload as Payload
      )) as ImgurApiResponse<ImgurImage>
      payload.mysteryImageUrl = mysteryImageUpload.data?.link
      success = success && mysteryImageUpload.success

      if (!mysteryImageUpload.success) {
        error = mysteryImageUpload.data
      }
    }

    resolve({
      data: createTagObject(payload),
      success,
      error,
      source: AvailableApis[AvailableApis.imgur],
      status: HttpStatusCode.Ok,
    })
  })
}
