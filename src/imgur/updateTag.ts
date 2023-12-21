import type { ImgurClient, ImgurApiResponse } from 'imgur'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { getImageHashFromText } from '../common/getters'
import { createTagObject } from '../common/data'
import { getUpdateTagPayloadFromTagData, isValidUpdatePayload } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import TinyCache from 'tinycache'

export async function updateTag(
  client: ImgurClient,
  payload: updateTagPayload,
  cache?: typeof TinyCache,
): Promise<BikeTagApiResponse<Tag>> {
  /// Construct imgur payloads for both mystery and found images separately
  const imgurMysteryImagePayload = getUpdateTagPayloadFromTagData(payload, true)
  const imgurFoundImagePayload = getUpdateTagPayloadFromTagData(payload)

  return new Promise(async (resolve) => {
    let success = true
    let error

    /// Validate payloads
    if (
      isValidUpdatePayload(imgurMysteryImagePayload) &&
      isValidUpdatePayload(imgurFoundImagePayload)
    ) {
      /// Check if tag exists
      const tagExistsForBikeTagAlbum = await this.getTags(payload.tagnumber, cache)
      const tagExists =
        tagExistsForBikeTagAlbum.success && tagExistsForBikeTagAlbum.data.length
      const existingTag = tagExists ? tagExistsForBikeTagAlbum.data[0] : null

      /// If the tag already exists, update the image data (title, description)
      if (existingTag?.mysteryImageUrl?.length) {
        const mysteryImageUpdated = (await client.updateImage({
          /// Pass in the contents of the mystery image payload
          ...imgurMysteryImagePayload,
          /// Use the image hash from the existing tag, not what was passed in
          imageHash: getImageHashFromText(existingTag.mysteryImageUrl),
        })) as ImgurApiResponse<boolean>

        success = mysteryImageUpdated.success
      } else {
        /// If the tag does not exist, create the mystery image with the tag data
        const mysteryImageUploaded = await this.uploadTagImage({
          ...imgurMysteryImagePayload,
          mysteryImage: payload.mysteryImageUrl,
          mysteryImageUrl: undefined,
          hash: imgurMysteryImagePayload.hash ?? (payload as any).hash,
        })
        if (mysteryImageUploaded.success) {
          /// If update was successful, update the payload with the new image url
          payload.mysteryImageUrl = mysteryImageUploaded.data.mysteryImageUrl
        } else {
          success = false
          error =
            mysteryImageUploaded.error ?? mysteryImageUploaded.data ?? true
        }
      }

      /// If the tag already exists, update the image data (title, description)
      if (existingTag?.foundImageUrl?.length) {
          /// Pass in the contents of the found image payload
        const foundImageUpdated = (await client.updateImage({
          ...imgurFoundImagePayload,
          /// Use the image hash from the existing tag, not what was passed in
          imageHash: getImageHashFromText(existingTag.foundImageUrl),
        })) as ImgurApiResponse<boolean>
        success = success && foundImageUpdated.success
      } else {
        /// If the tag does not exist, create the found image with the tag data
        const foundImageUploaded = await this.uploadTagImage({
          ...imgurFoundImagePayload,
          foundImage: payload.foundImageUrl,
          foundImageUrl: undefined,
          hash: imgurFoundImagePayload.hash ?? (payload as any).hash,
        })
        if (foundImageUploaded.success) {
          /// If update was successful, update the payload with the new image url
          payload.foundImageUrl = foundImageUploaded.data.foundImageUrl
        } else {
          success = false
          error = foundImageUploaded.error ?? foundImageUploaded.data ?? true
        }
      }
    } else {
      const errorMessage = 'at least one update payload is invalid'
      console.error(errorMessage, payload)
      error = errorMessage
    }

    resolve({
      data: createTagObject(payload),
      success,
      error,
      source: AvailableApis[AvailableApis.imgur],
      status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
    })
  })
}
