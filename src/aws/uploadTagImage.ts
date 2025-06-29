import type { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import {
  getUploadTagImagePayloadFromTagData,
  isValidUploadTagImagePayload,
  uploadTagImagePayload,
} from './helpers'
import {
  getImgurFoundTitleFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
} from '../common/getters'

export async function uploadTagImage(
  client: S3Client,
  payload: uploadTagImagePayload
): Promise<BikeTagApiResponse<Tag>> {
  let success = true
  let error: any = false

  const mysteryImageUploadPayload =
    !payload.mysteryImageUrl && payload.mysteryImage
      ? getUploadTagImagePayloadFromTagData(payload, true)
      : null

  const foundImageUploadPayload =
    !payload.foundImageUrl && payload.foundImage
      ? getUploadTagImagePayloadFromTagData(payload)
      : null

  if (!mysteryImageUploadPayload && !foundImageUploadPayload) {
    return {
      data: createTagObject(payload),
      success: false,
      error: 'No images to upload',
      source: AvailableApis[AvailableApis.aws],
      status: HttpStatusCode.BadRequest,
    }
  }

  const uploadImage = async (
    p: uploadTagImagePayload,
    imageType: 'mystery' | 'found'
  ) => {
    const folder = p.folder ?? 'queue'
    const suffix = p.filenameSuffix ?? `--${imageType}`
    const extension = p.contentType?.includes('png') ? 'png' : 'jpg'
    const key = `${folder}/${p.game}-tag-${p.tagnumber}${suffix}.${extension}`
    const bucket = `${p.game}-biketag`
    const region = p.awsRegion ?? 'nyc3'

    const title =
      imageType === 'mystery'
        ? getImgurMysteryTitleFromBikeTagData(p as Tag)
        : getImgurFoundTitleFromBikeTagData(p as Tag)

    const description =
      imageType === 'mystery'
        ? getImgurMysteryDescriptionFromBikeTagData(p as Tag)
        : getImgurFoundDescriptionFromBikeTagData(p as Tag)

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Readable.from(p.image as any),
        ContentType: p.contentType,
        ACL: 'public-read',
        Metadata: {
          title: title.trim(),
          description: description.trim(),
        },
      })
    )

    return `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`
  }

  if (isValidUploadTagImagePayload(foundImageUploadPayload)) {
    try {
      payload.foundImageUrl = await uploadImage(
        foundImageUploadPayload,
        'found'
      )
    } catch (err) {
      success = false
      error = 'found image upload failed'
    }
  }

  if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
    try {
      payload.mysteryImageUrl = await uploadImage(
        mysteryImageUploadPayload,
        'mystery'
      )
    } catch (err) {
      success = false
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
