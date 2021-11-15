import type { ImgurClient, ImgurApiResponse } from 'imgur'
import { AvailableApis, BikeTagApiResponse, TagData } from '../common/types'
import {
  getImgurFoundImageHashFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getImageHashFromText,
} from '../common/getters'
import { createTag } from '../common/data'

export interface ImgurUploadPayload {
  imageHash: string
  title: string
  description: string
}
export type UpdateTagPayload = Partial<TagData> & ImgurUploadPayload

function isValidUpdatePayload(utp: UpdateTagPayload) {
  return (
    typeof utp.imageHash === 'string' &&
    (typeof utp.title === 'string' || typeof utp.description === 'string')
  )
}

export function getUpdateTagPayloadFromTagData(
  tagData: UpdateTagPayload,
  mystery = true
): UpdateTagPayload {
  return {
    imageHash: mystery
      ? getImgurMysteryImageHashFromBikeTagData(tagData as TagData)
      : getImgurFoundImageHashFromBikeTagData(tagData as TagData),
    title: mystery
      ? getImgurMysteryTitleFromBikeTagData(tagData as TagData)
      : getImgurFoundTitleFromBikeTagData(tagData as TagData),
    description: mystery
      ? getImgurMysteryDescriptionFromBikeTagData(tagData as TagData)
      : getImgurFoundDescriptionFromBikeTagData(tagData as TagData),
  }
}

export async function updateTag(
  client: ImgurClient,
  payload: UpdateTagPayload | UpdateTagPayload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUpdatePromise = (utp): Promise<BikeTagApiResponse<TagData>> => {
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
        data: createTag(utp),
        success,
        source: AvailableApis[AvailableApis.imgur],
        status: 200,
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
        status: 200,
      }
    })
}
