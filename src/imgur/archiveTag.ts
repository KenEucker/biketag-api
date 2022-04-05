import type { ImgurClient } from 'imgur'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { archiveTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  getImgurFoundImageHashFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getOnlyFoundTagFromTagData,
} from '../common/getters'

export async function archiveTag(
  client: ImgurClient,
  payload: archiveTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  let data
  let error
  let success = true
  let mysteryTagDeleteResponse
  let archiveFoundImageResponse
  let deleteFoundImageResponse
  let existingFoundImageResponse

  if (payload.foundImageUrl?.length) {
    const foundImageHash = getImgurFoundImageHashFromBikeTagData(payload as Tag)
    existingFoundImageResponse = await client.getImage(foundImageHash)
    if (existingFoundImageResponse.success) {
      archiveFoundImageResponse = await client.upload({
        image: payload.foundImageUrl,
        description: existingFoundImageResponse.data.description,
        title: existingFoundImageResponse.data.title,
        type: 'url',
        album: payload.archivehash,
      })
      if (archiveFoundImageResponse.success) {
        payload.foundImageUrl = archiveFoundImageResponse.data.link
        deleteFoundImageResponse = await client.deleteImage(
          existingFoundImageResponse.data.deletehash
        )

        if (!deleteFoundImageResponse?.success) {
          existingFoundImageResponse.data =
            'archive of image succeeded but delete of existing found image failed'
          existingFoundImageResponse.success = false
        }
      }
    }
  }

  if (payload.mysteryImageUrl?.length) {
    const mysteryImageHash = getImgurMysteryImageHashFromBikeTagData(
      payload as Tag
    )
    const existingMysteryImageResponse = await client.getImage(mysteryImageHash)
    mysteryTagDeleteResponse = existingMysteryImageResponse.success
      ? await client.deleteImage(existingMysteryImageResponse.data.deletehash)
      : { success: false, data: 'delete of existing mystery image failed' }
  }

  if (archiveFoundImageResponse?.success && deleteFoundImageResponse?.success) {
    data = getOnlyFoundTagFromTagData(payload as Tag)
  } else if (archiveFoundImageResponse.success) {
    data = getOnlyFoundTagFromTagData(payload as Tag)
    success = false
    error = `error deleting images [${
      existingFoundImageResponse
        ? `archive: ${existingFoundImageResponse.data}, `
        : ''
    }${
      deleteFoundImageResponse ? `delete: ${deleteFoundImageResponse.data}` : ''
    }]`
  } else {
    data = archiveFoundImageResponse?.data
    success = false
    error = `delete: ${deleteFoundImageResponse.data}, archive: ${existingFoundImageResponse.data}`
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.NoContent,
  }
}
