// @ts-ignore
import { ImgurClient } from './imgurClient'
import { BikeTagApiResponse, TagData } from '../common/types'
import {
  getImgurFoundImageHashFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
} from '../common/getters'

export interface ImgurUploadPayload {
  imageHash: string
  imageTitle?: string
  imageDescription?: string
}
export type UpdateTagPayload = Partial<TagData> & ImgurUploadPayload

function isValidUpdatePayload(utp: UpdateTagPayload) {
  return (
    (typeof utp.imageHash === 'string' && typeof utp.imageTitle === 'string') ||
    typeof utp.imageDescription === 'string'
  )
}

export function getUpdateTagPayloadFromTagData(
  tagData: UpdateTagPayload,
  mystery = true
): UpdateTagPayload {
  if (isValidUpdatePayload(tagData)) {
    return tagData
  }

  return {
    imageHash: mystery
      ? getImgurMysteryImageHashFromBikeTagData(tagData as TagData)
      : getImgurFoundImageHashFromBikeTagData(tagData as TagData),
    imageTitle: mystery
      ? getImgurMysteryTitleFromBikeTagData(tagData as TagData)
      : getImgurFoundTitleFromBikeTagData(tagData as TagData),
    imageDescription: mystery
      ? getImgurMysteryDescriptionFromBikeTagData(tagData as TagData)
      : getImgurFoundDescriptionFromBikeTagData(tagData as TagData),
  }
}

export async function updateTag(
  client: ImgurClient,
  payload: UpdateTagPayload | UpdateTagPayload[]
): Promise<BikeTagApiResponse<string> | BikeTagApiResponse<string>[]> {
  const success = false
  const successMessage = 'all images have been updated successfully!'

  const promises: Promise<BikeTagApiResponse<string>>[] = []

  const createUploadPromise = (utp): Promise<BikeTagApiResponse<string>> => {
    const imgurMysteryImagePayload = getUpdateTagPayloadFromTagData(utp)
    const imgurFoundImagePayload = getUpdateTagPayloadFromTagData(utp, false)

    return new Promise(async (resolve, reject) => {
      let currentSuccess = false

      if (
        isValidUpdatePayload(imgurMysteryImagePayload) &&
        isValidUpdatePayload(imgurFoundImagePayload)
      ) {
        const mysteryImageUpdated = await client.updateImage({
          imageHash: imgurMysteryImagePayload.imageHash,
          title: imgurMysteryImagePayload.imageTitle,
          description: imgurMysteryImagePayload.imageDescription,
        })
        const foundImageUpdated = await client.updateImage({
          imageHash: imgurFoundImagePayload.imageHash,
          title: imgurFoundImagePayload.imageTitle,
          description: imgurFoundImagePayload.imageDescription,
        })

        currentSuccess =
          success && mysteryImageUpdated.data && foundImageUpdated.data
      } else {
        reject('one update payload is invalid')
      }

      if (!currentSuccess) {
        reject('one update of Imgur image failed')
      }

      resolve({
        data: successMessage,
        success: currentSuccess,
        source: 'imgur',
        status: 200,
      })
    })
  }

  if (Array.isArray(payload)) {
    payload.map((p) => promises.push(createUploadPromise(p)))
  } else if (isValidUpdatePayload(payload)) {
    return createUploadPromise(payload)
  } else {
    throw new Error('Update requires a title and/or description')
  }

  return await Promise.all(promises)
    .then((results) => {
      return results
    })
    .catch((e) => {
      return {
        data: e.message,
        success: false,
        source: 'imgur',
        status: 200,
      }
    })
}
