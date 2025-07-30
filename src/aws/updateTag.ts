import type { S3Client } from '@aws-sdk/client-s3'
import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import {
  getFoundMetadata,
  getMysteryMetadata,
  loadIndex,
  resizeAndSaveVariants,
  saveIndex,
  type updateTagPayload,
} from './helpers'
import { getKeyFromUrl } from './helpers'
import TinyCache from 'tinycache'

export async function updateTag(
  client: S3Client,
  payload: updateTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  payload.folder = payload.folder ?? 'main'

  const logVerbose = payload.verbose ? console.log : () => {}

  let success = true
  let error: string | undefined

  const bucket = `${payload.game}-biketag`
  logVerbose('[updateTag] Checking for existing tag in', payload.folder)

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
    logVerbose('[updateTag] Uploading new images...')
    const uploadResponse = await this.uploadTagImage(payload)

    if (uploadResponse.success) {
      logVerbose('[updateTag] Image upload successful.')
      payload.mysteryImageUrl = uploadResponse.data.mysteryImageUrl
      payload.mysteryTime = uploadResponse.data.mysteryTime
      payload.foundImageUrl = uploadResponse.data.foundImageUrl
      payload.foundTime = uploadResponse.data.foundTime
      payload.mysteryImage = undefined
      payload.foundImage = undefined
    } else {
      success = false
      error = uploadResponse.error
      logVerbose('[updateTag] Upload failed:', error)
    }
  } else if (existingTag) {
    logVerbose('[updateTag] Performing metadata-only update...')
    payload = { ...existingTag, ...payload }

    if (existingTag.mysteryImageUrl) {
      const mysteryKey = getKeyFromUrl(existingTag.mysteryImageUrl)
      try {
        logVerbose('[updateTag] Updating metadata for mystery image...')
        await client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${mysteryKey}`,
            Key: mysteryKey,
            ACL: 'public-read',
            MetadataDirective: 'REPLACE',
            Metadata: {
              data: getMysteryMetadata(payload as Tag),
            },
          })
        )
      } catch (err: any) {
        success = false
        error =
          (error ?? '') +
          ` Failed to update metadata for mystery image: ${err.message || err}`
        logVerbose('[updateTag] Mystery metadata update failed:', err)
      }
    }

    if (existingTag.foundImageUrl) {
      const foundKey = getKeyFromUrl(existingTag.foundImageUrl)
      try {
        logVerbose('[updateTag] Updating metadata for found image...')
        await client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${foundKey}`,
            Key: foundKey,
            ACL: 'public-read',
            MetadataDirective: 'REPLACE',
            Metadata: {
              data: getFoundMetadata(payload as Tag),
            },
          })
        )
      } catch (err: any) {
        success = false
        error =
          (error ?? '') +
          ` Failed to update metadata for found image: ${err.message || err}`
        logVerbose('[updateTag] Found metadata update failed:', err)
      }
    }
  } else {
    success = false
    error = `Tag ${payload.tagnumber} not found in folder ${payload.folder}`
    logVerbose('[updateTag] Tag not found for metadata update.')
  }

  if (success) {
    try {
      logVerbose('[updateTag] Loading existing index...')
      let index: Tag[] = await loadIndex(
        client,
        bucket,
        payload.folder,
        payload.region
      )
      const updatedTag = createTagObject(payload)

      const existingIndex = index.findIndex(
        (t) => t.tagnumber === updatedTag.tagnumber
      )
      if (existingIndex !== -1) {
        index[existingIndex] = updatedTag
        logVerbose('[updateTag] Replacing existing tag in index.')
      } else {
        index.push(updatedTag)
        logVerbose('[updateTag] Adding new tag to index.')
      }

      logVerbose('[updateTag] Saving updated index...')
      await saveIndex(client, bucket, payload.folder, index)
    } catch (err: any) {
      success = false
      error =
        (error ?? '') +
        ` Failed to atomically update index: ${err.message || err}`
      logVerbose('[updateTag] Index update failed:', err)
    }
  }

  if (success && payload.resize === true) {
    const tag = createTagObject(payload)
    let resizeErrors: string[] = []

    if (payload.mysteryImageUrl) {
      try {
        logVerbose('[updateTag] Resizing mystery image...')
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
        logVerbose('[updateTag] Resize failed for mystery image:', resizeErr)
      }
    }

    if (payload.foundImageUrl) {
      try {
        logVerbose('[updateTag] Resizing found image...')
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
        logVerbose('[updateTag] Resize failed for found image:', resizeErr)
      }
    }

    /// TODO: needs to get the updated tag image urls and then update the index

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
