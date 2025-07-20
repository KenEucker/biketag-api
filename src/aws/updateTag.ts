import type { S3Client } from '@aws-sdk/client-s3'
import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import {
  loadIndex,
  resizeAndSaveVariants,
  saveIndex,
  type updateTagPayload,
} from './helpers'
import { getKeyFromUrl, encodeMetadataValue } from './helpers'
import {
  getImgurFoundTitleFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getImgurMysteryTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
} from '../common/getters'
import TinyCache from 'tinycache'

export async function updateTag(
  client: S3Client,
  payload: updateTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  payload.folder = payload.folder ?? 'main'

  let success = true
  let error: string | undefined

  const bucket = `${payload.game}-biketag`
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

  const needsMystery = !!(
    payload.mysteryImageUrl?.length || payload.mysteryImage
  )
  const needsFound = !!(payload.foundImageUrl?.length || payload.foundImage)

  if (needsMystery || needsFound) {
    const uploadResponse = await this.uploadTagImage(payload)

    if (uploadResponse.success) {
      payload.mysteryImageUrl = uploadResponse.data.mysteryImageUrl
      payload.mysteryTime = uploadResponse.data.mysteryTime
      payload.foundImageUrl = uploadResponse.data.foundImageUrl
      payload.foundTime = uploadResponse.data.foundTime
      payload.mysteryImage = undefined
      payload.foundImage = undefined
    } else {
      success = false
      error = uploadResponse.error
    }
  } else if (existingTag) {
    // Metadata-only update
    payload = { ...existingTag, ...payload }

    // Explicit metadata refresh for mystery image
    if (existingTag.mysteryImageUrl) {
      const mysteryKey = getKeyFromUrl(existingTag.mysteryImageUrl)
      try {
        await client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${mysteryKey}`,
            Key: mysteryKey,
            ACL: 'public-read',
            MetadataDirective: 'REPLACE',
            Metadata: {
              title: encodeMetadataValue(
                getImgurMysteryTitleFromBikeTagData(payload as Tag).trim()
              ),
              description: encodeMetadataValue(
                getImgurMysteryDescriptionFromBikeTagData(payload as Tag).trim()
              ),
            },
          })
        )
      } catch (err: any) {
        success = false
        error =
          (error ?? '') +
          ` Failed to update metadata for mystery image: ${err.message || err}`
      }
    }

    // Explicit metadata refresh for found image
    if (existingTag.foundImageUrl) {
      const foundKey = getKeyFromUrl(existingTag.foundImageUrl)
      try {
        await client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${foundKey}`,
            Key: foundKey,
            ACL: 'public-read',
            MetadataDirective: 'REPLACE',
            Metadata: {
              title: encodeMetadataValue(
                getImgurFoundTitleFromBikeTagData(payload as Tag).trim()
              ),
              description: encodeMetadataValue(
                getImgurFoundDescriptionFromBikeTagData(payload as Tag).trim()
              ),
            },
          })
        )
      } catch (err: any) {
        success = false
        error =
          (error ?? '') +
          ` Failed to update metadata for found image: ${err.message || err}`
      }
    }
  } else {
    success = false
    error = `Tag ${payload.tagnumber} not found in folder ${payload.folder}`
  }

  if (success) {
    try {
      // 1️⃣ Load current index
      let index: Tag[] = await loadIndex(
        client,
        bucket,
        payload.folder,
        payload.region
      )
      const updatedTag = createTagObject(payload)

      // 2️⃣ Replace or add tag
      const existingIndex = index.findIndex(
        (t) => t.tagnumber === updatedTag.tagnumber
      )
      if (existingIndex !== -1) {
        index[existingIndex] = updatedTag
      } else {
        index.push(updatedTag)
      }

      // 3️⃣ Save new index.json atomically
      await saveIndex(client, bucket, payload.folder, index)
    } catch (err: any) {
      success = false
      error =
        (error ?? '') +
        ` Failed to atomically update index: ${err.message || err}`
    }
  }

  if (success && payload.resize === true) {
    let resizeErrors: string[] = []
    const tag = createTagObject(payload)

    if (payload.mysteryImageUrl) {
      try {
        await resizeAndSaveVariants({
          client,
          tag,
          imageType: 'mystery',
          resizeHost: payload.host,
          folder: payload.folder,
        })
      } catch (resizeErr: any) {
        success = false
        resizeErrors.push(
          `Failed to resize mystery image: ${resizeErr.message || resizeErr}`
        )
      }
    }

    if (payload.foundImageUrl) {
      try {
        await resizeAndSaveVariants({
          client,
          tag,
          imageType: 'found',
          resizeHost: payload.host,
          folder: payload.folder,
        })
      } catch (resizeErr: any) {
        success = false
        resizeErrors.push(
          `Failed to resize found image: ${resizeErr.message || resizeErr}`
        )
      }
    }

    if (resizeErrors.length > 0) {
      error = (error ?? '') + ' ' + resizeErrors.join('; ')
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
