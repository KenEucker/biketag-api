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
  let success = false

  const foundImageHash = getImgurFoundImageHashFromBikeTagData(payload as Tag)
  const existingFoundImageResponse: any = await client.getImage(foundImageHash)
  if (existingFoundImageResponse.success) {
    const archiveFoundImageResponse = await client.upload({
      image: payload.foundImageUrl,
      description: existingFoundImageResponse.data.description,
      title: existingFoundImageResponse.data.title,
      type: 'url',
      album: payload.archivehash,
    })
    if (archiveFoundImageResponse.success) {
      payload.foundImageUrl = archiveFoundImageResponse.data.link
      const deleteFoundImageResponse = await client.deleteImage(
        existingFoundImageResponse.data.deletehash
      )

      if (!deleteFoundImageResponse.success) {
        existingFoundImageResponse.data =
          'archive of image succeeded but delete of existing found image failed'
        existingFoundImageResponse.success = false
      }
    }
  }

  const mysteryImageHash = getImgurMysteryImageHashFromBikeTagData(
    payload as Tag
  )
  const existingMysteryImageResponse = await client.getImage(mysteryImageHash)
  const mysteryTagDeleteResponse = existingMysteryImageResponse.success
    ? await client.deleteImage(existingMysteryImageResponse.data.deletehash)
    : { success: false, data: 'delete of existing mystery image failed' }

  if (existingFoundImageResponse.success && mysteryTagDeleteResponse.success) {
    data = getOnlyFoundTagFromTagData(payload as Tag)
    success = true
  } else {
    success = false
    error = `found: ${existingFoundImageResponse.data}, mystery: ${mysteryTagDeleteResponse.data}`
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.NoContent,
  }
}
