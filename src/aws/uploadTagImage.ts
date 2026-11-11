import {
  S3Client,
  CopyObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  uploadTagImagePayload,
  getKeyFromUrl,
  getBikeTagImageKey,
  moveImage,
  normalizeUploadBody,
  getMysteryMetadata,
  getFoundMetadata,
} from './helpers'
import {
  getContentTypeFromExtension,
  getExtensionFromUrl,
} from '../common/methods'

export async function uploadTagImage(
  client: S3Client,
  payload: uploadTagImagePayload
): Promise<BikeTagApiResponse<Tag>> {
  const logVerbose = payload.verbose ? console.log : () => {}

  let success = true
  const errors: string[] = []

  const maybeDownloadImage = async (
    url?: string
  ): Promise<{ blob: Blob; contentType: string } | undefined> => {
    if (!url) return
    logVerbose('[uploadTagImage] Downloading image from', url)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to download image: ${url}`)
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const blob = await res.blob()
    return { blob, contentType }
  }

  const tryUploadImage = async (
    type: 'mystery' | 'found'
  ): Promise<string | undefined> => {
    logVerbose(`[uploadTagImage] Processing ${type} image...`)

    const urlField = `${type}ImageUrl`
    const blobField = `${type}Image`

    const bucket = `${payload.game}-biketag`
    const region = payload.region ?? 'nyc3'
    const folder = payload.folder ?? 'queue'
    const player =
      type === 'mystery' ? payload.mysteryPlayer : payload.foundPlayer
    const isCompleteQueuedTag =
      folder === 'queue' &&
      !!(payload.mysteryImageUrl || payload.mysteryImage) &&
      !!(payload.foundImageUrl || payload.foundImage)
    const imageTagnumber =
      type === 'found' &&
      isCompleteQueuedTag &&
      typeof payload.tagnumber === 'number'
        ? payload.tagnumber - 1
        : payload.tagnumber

    if (type === 'mystery' && !payload.mysteryTime) {
      payload.mysteryTime = Math.floor(Date.now() / 1000)
    } else if (type === 'found' && !payload.foundTime) {
      payload.foundTime = Math.floor(Date.now() / 1000)
    }

    const metadataPayload = { ...payload, tagnumber: imageTagnumber } as Tag
    const metadata = {
      data:
        type === 'mystery'
          ? getMysteryMetadata(metadataPayload)
          : getFoundMetadata(metadataPayload),
    }
    let contentType = payload.contentType
    const replaceExistingImageMetadata = async (key: string) => {
      try {
        await client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${key}`,
            Key: key,
            ACL: 'public-read',
            ContentType: contentType,
            MetadataDirective: 'REPLACE',
            Metadata: metadata,
          })
        )
        return true
      } catch (err: any) {
        success = false
        errors.push(`Failed to update ${type} image metadata: ${err.message}`)
        return false
      }
    }

    const existingUrl = payload[urlField]
    const currentKey = existingUrl ? getKeyFromUrl(existingUrl) : ''
    const isBucketUrl = existingUrl?.includes(`${bucket}.${region}`)

    if (isBucketUrl) {
      // 🔔 Ensure inferredContentType is populated before key comparison
      if (!contentType) {
        const ext = getExtensionFromUrl(existingUrl)
        if (ext) contentType = getContentTypeFromExtension(ext)
      }

      // If it's already our bucket, but wrong key (wrong folder, missing hash, etc.)
      const expectedKey = await getBikeTagImageKey(
        type,
        player,
        imageTagnumber,
        payload.game,
        contentType,
        folder
      )
      const expectedUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${expectedKey}`

      if (currentKey === expectedKey) {
        logVerbose(
          `[uploadTagImage] ${type} image already in correct location.`
        )
        const metadataUpdated = await replaceExistingImageMetadata(expectedKey)
        if (!metadataUpdated) return undefined
        return existingUrl
      }

      logVerbose(`[uploadTagImage] Moving ${type} image to correct key...`)
      const moveResult = await moveImage(
        client,
        bucket,
        currentKey,
        expectedKey
      )
      if (moveResult.success) {
        logVerbose(`[uploadTagImage] Moved ${type} image successfully.`)
        const metadataUpdated = await replaceExistingImageMetadata(expectedKey)
        if (!metadataUpdated) return undefined
        return expectedUrl
      }

      success = false
      errors.push(
        moveResult.error
          ? `${type}: ${moveResult.error}`
          : `${type} image move failed`
      )
      return undefined
    }

    if (!payload[blobField] && existingUrl) {
      try {
        logVerbose(
          `[uploadTagImage] Downloading ${type} image from external URL...`
        )
        const result = await maybeDownloadImage(existingUrl)
        if (result) {
          payload[blobField] = result.blob
          contentType ||= result.contentType
        }
      } catch {
        success = false
        errors.push(`Failed to download ${type} image from URL`)
        return undefined
      }
    }

    if (!contentType && existingUrl) {
      const ext = getExtensionFromUrl(existingUrl)
      if (ext) contentType = getContentTypeFromExtension(ext)
    }

    const key = await getBikeTagImageKey(
      type,
      player,
      imageTagnumber,
      payload.game,
      contentType,
      folder
    )
    const fullUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`

    if (!payload[blobField]) {
      success = false
      errors.push(`${type} image missing`)
      return undefined
    }

    try {
      if (typeof window === 'undefined') {
        logVerbose(`[uploadTagImage] Uploading ${type} image to S3 (Node)...`)
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: await normalizeUploadBody(payload[blobField]),
            ContentType: contentType,
            ACL: 'public-read',
            Metadata: metadata,
          })
        )
      } else if (this.fetchSignedUrl && this.plainFetcher) {
        logVerbose(
          `[uploadTagImage] Uploading ${type} image to S3 (browser via signed URL)...`
        )
        const signedUrlResponse = await this.fetchSignedUrl({
          key,
          p_id: payload.playerId,
          contentType: contentType,
        })

        if (!signedUrlResponse.success || !signedUrlResponse.data) {
          errors.push(`Failed to get signed URL for ${type} image`)
          return undefined
        }

        await this.plainFetcher(signedUrlResponse.data, {
          method: 'PUT',
          headers: {
            'Content-Type': contentType,
            'x-amz-meta-data': metadata.data,
            'x-amz-acl': 'public-read',
          },
          data: await normalizeUploadBody(payload[blobField]),
        })
      }
    } catch (uploadError: any) {
      success = false
      errors.push(`Failed to upload ${type} image: ${uploadError.message}`)
      return undefined
    }

    logVerbose(
      `[uploadTagImage] Successfully uploaded ${type} image to ${fullUrl}`
    )
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
