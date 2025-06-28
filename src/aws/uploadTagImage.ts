import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import {
  getUploadTagImagePayloadFromTagData,
  uploadImageAndResize,
  isValidUploadTagImagePayload,
  uploadTagImagePayload,
} from './helpers'

export async function uploadTagImage(
  client: S3Client,
  payload: uploadTagImagePayload
): Promise<BikeTagApiResponse<Tag>> {
  let success = true
  let error: any = false

  const resize = payload.resize !== false

  const mysteryImageUploadPayload =
    !payload.mysteryImageUrl && payload.mysteryImage
      ? getUploadTagImagePayloadFromTagData(payload, true)
      : null
  const foundImageUploadPayload =
    !payload.foundImageUrl && payload.foundImage
      ? getUploadTagImagePayloadFromTagData(payload)
      : null

  if (isValidUploadTagImagePayload(foundImageUploadPayload)) {
    const foundImageUpload = await uploadImageAndResize(
      client,
      foundImageUploadPayload,
      resize
    )
    payload.foundImageUrl = foundImageUpload?.url
    success = success && !!foundImageUpload

    if (!foundImageUpload) {
      error = 'found image upload failed'
    }
  }

  if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
    const mysteryImageUpload = await uploadImageAndResize(
      client,
      mysteryImageUploadPayload,
      resize
    )
    payload.mysteryImageUrl = mysteryImageUpload?.url
    success = success && !!mysteryImageUpload

    if (!mysteryImageUpload) {
      error = 'mystery image upload failed'
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
