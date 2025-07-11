import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import { resizeAndSaveVariants, type updateTagPayload } from './helpers'
import TinyCache from 'tinycache'

/**
 * Updates a bike tag's data and associated images in AWS S3, optionally resizing image variants.
 *
 * If the tag does not exist or is missing images, uploads the provided images to S3 and updates the tag with new image URLs. If requested, resizes and saves image variants. Returns the updated tag data, success status, error messages if any, the API source, and an HTTP status code.
 *
 * @param payload - The tag update data, including game, tagnumber, folder, images, and resize flag
 * @returns An object containing the updated tag, success status, error message (if any), API source, and HTTP status code
 */
export async function updateTag(
  client: S3Client,
  payload: updateTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  payload.folder = payload.folder ?? 'main'

  let success = true
  let error: any = undefined

  const tagExistsResponse = await this.getTags(
    {
      game: payload.game,
      tagnumbers: [payload.tagnumber],
      folder: payload.folder,
    },
    cache
  )

  const existingTag =
    tagExistsResponse.success && tagExistsResponse.data.length
      ? tagExistsResponse.data[0]
      : null

  const needsMystery = !existingTag?.mysteryImageUrl?.length
  const needsFound = !existingTag?.foundImageUrl?.length

  if (needsMystery || needsFound) {
    const uploadResponse = await this.uploadTagImage(client, payload)

    if (uploadResponse.success) {
      payload.mysteryImageUrl = uploadResponse.data.mysteryImageUrl
      payload.foundImageUrl = uploadResponse.data.foundImageUrl
      payload.mysteryImage = undefined
      payload.foundImage = undefined
    } else {
      success = false
      error = uploadResponse.error
    }
  } else {
    payload.mysteryImageUrl = existingTag.mysteryImageUrl
    payload.foundImageUrl = existingTag.foundImageUrl
  }

  // ✅ Resize variants if requested
  if (success && payload.resize === true) {
    let resizeErrors = []
    const tag = createTagObject(payload)

    if (payload.mysteryImageUrl) {
      try {
        await resizeAndSaveVariants({
          client,
          tag,
          imageType: 'mystery',
          folder: payload.folder,
        })
      } catch (resizeErr) {
        success = false
        resizeErrors.push(`Failed to resize mystery image: ${resizeErr}`)
      }
    }

    if (payload.foundImageUrl) {
      try {
        await resizeAndSaveVariants({
          client,
          tag,
          imageType: 'found',
          folder: payload.folder,
        })
      } catch (resizeErr) {
        success = false
        resizeErrors.push(`Failed to resize found image: ${resizeErr}`)
      }
    }

    if (resizeErrors.length > 0) {
      error += ' ' + resizeErrors.join('; ')
    }
  }

  return {
    data: createTagObject(payload),
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
