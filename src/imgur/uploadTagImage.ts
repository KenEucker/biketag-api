import type { ImgurClient } from 'imanagur'
import { ImgurApiResponse, Payload } from 'imanagur/lib/common/types'
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
  payload: UploadTagImagePayload | UploadTagImagePayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  const promises: Promise<BikeTagApiResponse<Tag>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUploadPromise = (
    utp: UploadTagImagePayload
  ): Promise<BikeTagApiResponse<Tag>> => {
    let success = true
    const mysteryImageUploadPayload =
      !utp.mysteryImageUrl && utp.mysteryImage
        ? getUploadTagImagePayloadFromTagData(utp, true)
        : null
    const foundImageUrlUploadPayload =
      !utp.foundImageUrl && utp.foundImage
        ? getUploadTagImagePayloadFromTagData(utp)
        : null

    return new Promise(async (resolve) => {
      if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
        const mysteryImageUpload = (await client.upload(
          mysteryImageUploadPayload as Payload
        )) as ImgurApiResponse<ImgurImage>
        utp.mysteryImageUrl = mysteryImageUpload.data?.link
        success = success && mysteryImageUpload.success
      }

      if (isValidUploadTagImagePayload(foundImageUrlUploadPayload)) {
        const foundImageUpload = (await client.upload(
          foundImageUrlUploadPayload as Payload
        )) as ImgurApiResponse<ImgurImage>
        utp.foundImageUrl = foundImageUpload.data?.link
        success = success && foundImageUpload.success
      }

      resolve({
        data: createTagObject(utp),
        success,
        source: AvailableApis[AvailableApis.imgur],
        status: HttpStatusCode.Ok,
      })
    })
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
