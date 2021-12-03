import type { ImgurClient } from 'imgur'
import { ImgurApiResponse, Payload } from 'imgur/lib/common/types'
import { createTagObject } from '../common/data'
import {
  getUploadTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
} from './helpers'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { Tag } from '../common/schema'
import { queueTagImagePayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function queueTagImage(
  client: ImgurClient,
  payload: queueTagImagePayload | queueTagImagePayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  const promises: Promise<BikeTagApiResponse<Tag>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUploadPromise = (
    utp: queueTagImagePayload
  ): Promise<BikeTagApiResponse<Tag>> => {
    let success = true
    const mysteryImageUploadPayload =
      !utp.mysteryImageUrl && utp.mysteryImage
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
