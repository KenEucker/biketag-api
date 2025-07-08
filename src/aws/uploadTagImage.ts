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
  let error: any = undefined

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
        error = `Failed to download ${type} image from URL`
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
      error = moveResult.error || `${type} image move failed`
      return undefined
    }

    if (!payload[blobField]) {
      success = false
      error = `${type} image missing`
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

    return fullUrl
  }

  // Attempt both uploads
  payload.mysteryImageUrl = await tryUploadImage('mystery')
  payload.foundImageUrl = await tryUploadImage('found')
  payload.mysteryImage = undefined
  payload.foundImage = undefined

  return {
    data: createTagObject(payload),
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
