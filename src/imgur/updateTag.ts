import type { ImgurClient, ImgurApiResponse } from 'imgur'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { getImageHashFromText } from '../common/getters'
import { createTagObject } from '../common/data'
import { getUpdateTagPayloadFromTagData, isValidUpdatePayload } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'

export async function updateTag(
  client: ImgurClient,
  payload: updateTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const imgurMysteryImagePayload = getUpdateTagPayloadFromTagData(payload, true)
  const imgurFoundImagePayload = getUpdateTagPayloadFromTagData(payload)

  return new Promise(async (resolve) => {
    let success = true

    if (
      isValidUpdatePayload(imgurMysteryImagePayload) &&
      isValidUpdatePayload(imgurFoundImagePayload)
    ) {
      const tagExistsForBikeTagAlbum = await this.getTags(payload.tagnumber)
      const tagExists =
        tagExistsForBikeTagAlbum.success && tagExistsForBikeTagAlbum.data.length
      const existingTag = tagExists ? tagExistsForBikeTagAlbum.data[0] : null
      if (existingTag && existingTag.mysteryImageUrl?.length) {
        const mysteryImageUpdated = (await client.updateImage({
          ...imgurMysteryImagePayload,
          imageHash: getImageHashFromText(existingTag.mysteryImageUrl),
        })) as ImgurApiResponse<boolean>

        success = mysteryImageUpdated.success
      } else {
        const mysteryImageUploaded = await this.uploadTagImage({
          ...imgurMysteryImagePayload,
          mysteryImage: payload.mysteryImageUrl,
          mysteryImageUrl: undefined,
          hash: imgurMysteryImagePayload.hash ?? (payload as any).hash,
        })
        if (mysteryImageUploaded.success) {
          payload.mysteryImageUrl = mysteryImageUploaded.data.mysteryImageUrl
        } else {
          success = false
        }
      }

      if (existingTag && existingTag.foundImageUrl?.length) {
        const foundImageUpdated = (await client.updateImage({
          ...imgurFoundImagePayload,
          imageHash: getImageHashFromText(existingTag.foundImageUrl),
        })) as ImgurApiResponse<boolean>
        success = success && foundImageUpdated.success
      } else {
        const foundImageUploaded = await this.uploadTagImage({
          ...imgurFoundImagePayload,
          foundImage: payload.foundImageUrl,
          foundImageUrl: undefined,
          hash: imgurFoundImagePayload.hash ?? (payload as any).hash,
        })
        if (foundImageUploaded.success) {
          payload.foundImageUrl = foundImageUploaded.data.foundImageUrl
        } else {
          success = false
        }
      }
    } else {
      console.error('one update payload is invalid', payload)
    }

    resolve({
      data: createTagObject(payload),
      success,
      source: AvailableApis[AvailableApis.imgur],
      status: HttpStatusCode.Ok,
    })
  })
}
