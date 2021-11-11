import type { ImgurClient } from 'imgur'
import { ImgurApiResponse, Payload } from 'imgur/lib/common/types'
import { createTag } from '../common/data'
import {
  getImgurFoundDescriptionFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
} from '../common/getters'
import { BikeTagApiResponse, ImgurImage, TagData } from '../common/types'
import { getBikeTagFromImgurImageSet } from './helpers'

export interface ImgurUploadPayload {
  image: string
  title?: string
  description?: string
  type?: string
  hash?: string
  album?: string
}
export type UploadTagImagePayload = Partial<TagData> & ImgurUploadPayload

export function getUploadTagImagePayloadFromTagData(
  tagData: UploadTagImagePayload,
  mystery = true
): ImgurUploadPayload {
  return {
    album: tagData.album ?? tagData.hash,
    type: tagData.type ?? 'url',
    image: mystery ? tagData.mysteryImage : tagData.foundImage,
    title:
      tagData.title ??
      (mystery
        ? getImgurMysteryTitleFromBikeTagData(tagData as TagData)
        : getImgurFoundTitleFromBikeTagData(tagData as TagData)),
    description:
      tagData.description ??
      (mystery
        ? getImgurMysteryDescriptionFromBikeTagData(tagData as TagData)
        : getImgurFoundDescriptionFromBikeTagData(tagData as TagData)),
  }
}

function isValidUploadTagImagePayload(utp: UploadTagImagePayload) {
  return (
    /// TODO: do better type checking here
    utp &&
    typeof utp.image !== 'undefined' &&
    (typeof utp.title === 'string' || typeof utp.description === 'string')
  )
}

export async function uploadTagImage(
  client: ImgurClient,
  payload: UploadTagImagePayload | UploadTagImagePayload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  const promises: Promise<BikeTagApiResponse<TagData>>[] = []
  const payloads = Array.isArray(payload) ? payload : [payload]

  const createUploadPromise = (
    utp: UploadTagImagePayload
  ): Promise<BikeTagApiResponse<TagData>> => {
    let success = true
    const mysteryImageUploadPayload =
      !utp.mysteryImageUrl && utp.mysteryImage
        ? getUploadTagImagePayloadFromTagData(utp)
        : null
    const foundImageUrlUploadPayload =
      !utp.foundImageUrl && utp.foundImage
        ? getUploadTagImagePayloadFromTagData(utp, false)
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
        data: createTag(utp),
        success,
        source: 'imgur',
        status: 200,
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
        source: 'imgur',
        status: 200,
      }
    })
}
