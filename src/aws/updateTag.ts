import type { S3Client } from '@aws-sdk/client-s3'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import { getUpdateTagPayloadFromTagData } from './helpers'
import { uploadTagImage } from './uploadTagImage'
import TinyCache from 'tinycache'

export async function updateTag(
  client: S3Client,
  payload: updateTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  const mysteryImagePayload = getUpdateTagPayloadFromTagData(
    payload as Tag,
    true
  )
  const foundImagePayload = getUpdateTagPayloadFromTagData(
    payload as Tag,
    false
  )

  let success = true
  let error: any = undefined

  const tagExistsResponse = await this.getTags(
    {
      game: payload.game,
      tagnumbers: [payload.tagnumber],
      folder: 'main',
    },
    cache
  )

  const existingTag =
    tagExistsResponse.success && tagExistsResponse.data.length
      ? tagExistsResponse.data[0]
      : null

  // Handle mystery image
  if (!existingTag?.mysteryImageUrl?.length) {
    const mysteryUploadResponse = await uploadTagImage(client, {
      ...mysteryImagePayload,
      mysteryImage: payload.mysteryImageUrl,
      mysteryImageUrl: undefined,
    })

    if (mysteryUploadResponse.success) {
      payload.mysteryImageUrl = mysteryUploadResponse.data.mysteryImageUrl
    } else {
      success = false
      error = mysteryUploadResponse.error || true
    }
  }

  // Handle found image
  if (!existingTag?.foundImageUrl?.length) {
    const foundUploadResponse = await uploadTagImage(client, {
      ...foundImagePayload,
      foundImage: payload.foundImageUrl,
      foundImageUrl: undefined,
    })

    if (foundUploadResponse.success) {
      payload.foundImageUrl = foundUploadResponse.data.foundImageUrl
    } else {
      success = false
      error = foundUploadResponse.error || true
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
