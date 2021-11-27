import type { ImgurClient, ImgurApiResponse } from 'imgur'
import { updateTagPayload } from '../common/payloads'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import {
  getImgurFoundImageHashFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getImageHashFromText,
} from '../common/getters'
import { createTagObject } from '../common/data'
import { HttpStatusCode } from '../common/responses'

export interface ImgurUploadPayload {
  imageHash: string
  title: string
  description: string
}
export type UpdateTagPayload = Partial<Tag> & ImgurUploadPayload

function isValidUpdatePayload(utp: UpdateTagPayload) {
  return (
    (typeof utp.imageHash === 'string' &&
      (typeof utp.title === 'string' || typeof utp.description === 'string')) ||
    typeof utp.title === 'string' ||
    typeof utp.description === 'string'
  )
}

export function getUpdateTagPayloadFromTagData(
  tagData: UpdateTagPayload,
  mystery = true
): UpdateTagPayload {
  return {
    imageHash: mystery
      ? getImgurMysteryImageHashFromBikeTagData(tagData as Tag)
      : getImgurFoundImageHashFromBikeTagData(tagData as Tag),
    title: mystery
      ? getImgurMysteryTitleFromBikeTagData(tagData as Tag)
      : getImgurFoundTitleFromBikeTagData(tagData as Tag),
    description: mystery
      ? getImgurMysteryDescriptionFromBikeTagData(tagData as Tag)
      : getImgurFoundDescriptionFromBikeTagData(tagData as Tag),
  }
}

export async function updateTag(
  client: ImgurClient,
  payload: updateTagPayload | updateTagPayload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  const promises: Promise<BikeTagApiResponse<Tag>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUpdatePromise = (utp): Promise<BikeTagApiResponse<Tag>> => {
    const imgurMysteryImagePayload = getUpdateTagPayloadFromTagData(utp)
    const imgurFoundImagePayload = getUpdateTagPayloadFromTagData(utp, false)

    return new Promise(async (resolve) => {
      let success = true

      if (
        isValidUpdatePayload(imgurMysteryImagePayload) &&
        isValidUpdatePayload(imgurFoundImagePayload)
      ) {
        const tagExistsForBikeTagAlbum = await this.getTag(utp.tagnumber)
        if (
          tagExistsForBikeTagAlbum.success &&
          tagExistsForBikeTagAlbum.data?.mysteryImageUrl?.length
        ) {
          const mysteryImageUpdated = (await client.updateImage({
            ...imgurMysteryImagePayload,
            imageHash: getImageHashFromText(
              tagExistsForBikeTagAlbum.data.mysteryImageUrl
            ),
          })) as ImgurApiResponse<boolean>

          success = mysteryImageUpdated.data
        } else {
          const mysteryImageUploaded = await this.uploadTagImage({
            ...imgurMysteryImagePayload,
            mysteryImage: utp.mysteryImageUrl,
            mysteryImageUrl: undefined,
          })
          if (mysteryImageUploaded?.length && mysteryImageUploaded[0].success) {
            utp.mysteryImageUrl = mysteryImageUploaded[0].data.mysteryImageUrl
          } else {
            success = false
          }
        }

        if (
          tagExistsForBikeTagAlbum.success &&
          tagExistsForBikeTagAlbum.data?.foundImageUrl?.length
        ) {
          const foundImageUpdated = (await client.updateImage({
            ...imgurFoundImagePayload,
            imageHash: getImageHashFromText(
              tagExistsForBikeTagAlbum.data.foundImageUrl
            ),
          })) as ImgurApiResponse<boolean>
          success = success && foundImageUpdated.data
        } else {
          const foundImageUploaded = await this.uploadTagImage({
            ...imgurFoundImagePayload,
            foundImage: utp.foundImageUrl,
            foundImageUrl: undefined,
          })
          if (foundImageUploaded?.length && foundImageUploaded[0].success) {
            utp.foundImageUrl = foundImageUploaded[0].data.foundImageUrl
          } else {
            success = false
          }
        }
      } else {
        console.error('one update payload is invalid', utp)
      }

      resolve({
        data: createTagObject(utp),
        success,
        source: AvailableApis[AvailableApis.imgur],
        status: HttpStatusCode.Ok,
      })
    })
  }

  payloads.map((p) => promises.push(createUpdatePromise(p)))

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
