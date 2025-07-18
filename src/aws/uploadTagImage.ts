import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  getImgurMysteryTitleFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
} from '../common/getters'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import {
  uploadTagImagePayload,
  getKeyFromUrl,
  getBikeTagImageKey,
  moveImage,
  normalizeUploadBody,
  encodeMetadataValue,
} from './helpers'
import {
  getContentTypeFromExtension,
  getExtensionFromUrl,
} from '../common/methods'

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
    const urlField = `${type}ImageUrl`
    const blobField = `${type}Image`

    const bucket = `${payload.game}-biketag`
    const region = payload.region ?? 'nyc3'
    const folder = payload.folder ?? 'queue'

    const player =
      type === 'mystery' ? payload.mysteryPlayer : payload.foundPlayer

    let contentType = payload.contentType

    const existingUrl = payload[urlField]
    const currentKey = existingUrl ? getKeyFromUrl(existingUrl) : ''

    const isBucketUrl = existingUrl?.includes(`${bucket}.${region}`)

    if (isBucketUrl) {
      // 🔔 Ensure inferredContentType is populated before key comparison
      if (!contentType) {
        const ext = getExtensionFromUrl(existingUrl)
        if (ext) {
          contentType = getContentTypeFromExtension(ext)
        }
      }

      // If it's already our bucket, but wrong key (wrong folder, missing hash, etc.)
      const expectedKey = await getBikeTagImageKey(
        type,
        player,
        payload.tagnumber,
        payload.game,
        contentType,
        folder
      )

      const expectedUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${expectedKey}`

      if (currentKey === expectedKey) {
        return existingUrl // Correct location → nothing to do.
      }

      // 🔧 Move it if it's not at the right key
      const moveResult = await moveImage(
        client,
        bucket,
        currentKey,
        expectedKey
      )
      if (moveResult.success) return expectedUrl

      success = false
      errors.push(
        moveResult.error
          ? `${type}: ${moveResult.error}`
          : `${type} image move failed`
      )
      return undefined
    }

    // If not our bucket → download before inferring key
    if (!payload[blobField] && existingUrl) {
      try {
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
      if (ext) {
        contentType = getContentTypeFromExtension(ext)
      }
    }

    const key = await getBikeTagImageKey(
      type,
      player,
      payload.tagnumber,
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

    if (type === 'mystery') {
      payload.mysteryTime = Math.floor(Date.now() / 1000)
    } else if (type === 'found') {
      payload.foundTime = Math.floor(Date.now() / 1000)
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
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: await normalizeUploadBody(payload[blobField]),
            ContentType: contentType,
            ACL: 'public-read',
            Metadata: {
              title: encodeMetadataValue(title.trim()),
              description: encodeMetadataValue(description.trim()),
            },
          })
        )
      } else if (this.fetchSignedUrl && this.plainFetcher) {
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
            'x-amz-meta-title': encodeMetadataValue(title.trim()),
            'x-amz-meta-description': encodeMetadataValue(description.trim()),
            'x-amz-acl': 'public-read',
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
