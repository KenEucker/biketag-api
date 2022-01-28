import type { ImgurClient } from 'imgur'
import { ImgurApiResponse, Payload } from 'imgur/lib/common/types'
import { createTagObject } from '../common/data'
import {
  UploadTagImagePayload,
  isValidUploadTagImagePayload,
  getUploadTagImagePayloadFromTagData,
} from './helpers'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { Tag } from '../common/schema'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function uploadTagImage(
  client: ImgurClient,
  payload: UploadTagImagePayload
): Promise<BikeTagApiResponse<Tag>> {
  let success = true
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
      console.log({ foundImageUpload, success })
      success = success && foundImageUpload.success
    }
    if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
      const mysteryImageUpload = (await client.upload(
        mysteryImageUploadPayload as Payload
      )) as ImgurApiResponse<ImgurImage>
      payload.mysteryImageUrl = mysteryImageUpload.data?.link
      console.log({ mysteryImageUpload, success })
      success = success && mysteryImageUpload.success
    }

    resolve({
      data: createTagObject(payload),
      success,
      source: AvailableApis[AvailableApis.imgur],
      status: HttpStatusCode.Ok,
    })
  })
}
