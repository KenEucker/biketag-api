import type { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import {
  encodeMetadataValue,
  getHashedPlayerSuffix,
  normalizeUploadBody,
  uploadTagImagePayload,
  getKeyFromUrl,
  moveImage,
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
  const errors: string[] = []

  const maybeDownloadImage = async (
    url?: string
  ): Promise<{ blob: Blob; contentType: string } | undefined> => {
    if (!url) return
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to download image: ${url}`)
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const blob = await res.blob()
    return { blob, contentType }
  }

  const tryUploadImage = async (
    type: 'mystery' | 'found'
  ): Promise<string | undefined> => {
    const urlField = `${type}ImageUrl` as const
    const blobField = `${type}Image` as const

    const folder = payload.folder ?? 'queue'
    const suffix = `--${type}`
    const postfix =
      folder === 'queue'
        ? `--${await getHashedPlayerSuffix(payload.foundPlayer)}`
        : ''
    const extension = payload.contentType?.includes('png') ? 'png' : 'jpg'
    const key = `${folder}/${payload.game}-tag-${payload.tagnumber}${suffix}${postfix}.${extension}`
    const bucket = `${payload.game}-biketag`
    const region = payload.region ?? 'nyc3'
    const fullUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`

    // Download if blob is missing
    if (!payload[blobField] && payload[urlField]) {
      try {
        const result = await maybeDownloadImage(payload[urlField])
        if (result) {
          payload[blobField] = result.blob
          payload.contentType ||= result.contentType
        }
      } catch {
        success = false
        errors.push(`Failed to download ${type} image from URL`)
        return undefined
      }
    }

    const existingUrl = payload[urlField]
    const currentKey = existingUrl ? getKeyFromUrl(existingUrl) : ''

    if (existingUrl?.includes(bucket)) {
      if (currentKey === key) {
        return existingUrl // Already correct
      }
      // Move if possible
      const moveResult = await moveImage(client, bucket, currentKey, key)
      if (moveResult.success) return fullUrl
      success = false
      errors.push(`${type} ${moveResult.error}` || ` ${type} image move failed`)
      return undefined
    }

    if (!payload[blobField]) {
      success = false
      errors.push(`${type} image missing`)
      return undefined
    }

    const title =
      type === 'mystery'
        ? getImgurMysteryTitleFromBikeTagData(payload as Tag)
        : getImgurFoundTitleFromBikeTagData(payload as Tag)
    const description =
      type === 'mystery'
        ? getImgurMysteryDescriptionFromBikeTagData(payload as Tag)
        : getImgurFoundDescriptionFromBikeTagData(payload as Tag)

    try {
      if (typeof window === 'undefined') {
        // Backend path
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: await normalizeUploadBody(payload[blobField]),
            ContentType: payload.contentType,
            ACL: 'public-read',
            Metadata: {
              title: encodeMetadataValue(title.trim()),
              description: encodeMetadataValue(description.trim()),
            },
          })
        )
      } else if (this.fetchSignedUrl && this.plainFetcher) {
        // Frontend path: signed URL upload using plainFetcher
        const signedUrlResponse = await this.fetchSignedUrl({
          key,
          contentType: payload.contentType,
        })

        if (!signedUrlResponse.success || !signedUrlResponse.data) {
          errors.push(`Failed to get signed URL for ${type} image`)
          return undefined
        }

        await this.plainFetcher(signedUrlResponse.data, {
          method: 'PUT',
          headers: {
            'Content-Type': payload.contentType,
            'x-amz-meta-title': encodeMetadataValue(title.trim()),
            'x-amz-meta-description': encodeMetadataValue(description.trim()),
          },
          data: await normalizeUploadBody(payload[blobField]),
        })
      }
    } catch (uploadError) {
      success = false
      errors.push(`Failed to upload ${type} image: ${uploadError.message}`)
      return undefined
    }

    return fullUrl
  }

  if (payload.foundImageUrl || payload.foundImage) {
    payload.foundImageUrl = await tryUploadImage('found')
    payload.foundImage = undefined
  }

  if (payload.mysteryImageUrl || payload.mysteryImage) {
    payload.mysteryImageUrl = await tryUploadImage('mystery')
    payload.mysteryImage = undefined
  }

  return {
    data: createTagObject(payload),
    success,
    error: errors.length ? errors.join(' ') : undefined,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
