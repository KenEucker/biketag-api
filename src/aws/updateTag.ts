import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { createTagObject } from '../common/data'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'
import {
  getKeyFromUrl,
  getUpdateTagPayloadFromTagData,
  moveImage,
  type updateTagPayload,
} from './helpers'
import { uploadTagImage } from './uploadTagImage'
import TinyCache from 'tinycache'

export async function updateTag(
  client: S3Client,
  payload: updateTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  /// TODO: put the payload logic into getDefaultOptions?
  payload.folder = payload.folder ?? 'main'

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
      folder: payload.folder,
    },
    cache
  )

  const existingTag =
    tagExistsResponse.success && tagExistsResponse.data.length
      ? tagExistsResponse.data[0]
      : null

  const getCanonicalFilename = (
    key: string,
    type: 'mystery' | 'found'
  ): string => {
    const match = key.match(
      new RegExp(
        `^(?:.+/)?(.*)--${type}(?:--[a-z0-9]+)?\\.(webp|jpg|jpeg|png)$`,
        'i'
      )
    )
    if (!match) throw new Error(`Invalid filename for canonicalization: ${key}`)
    return `${match[1]}--${type}.webp`
  }

  // Handle mystery image
  if (!existingTag?.mysteryImageUrl?.length) {
    const currentKey = getKeyFromUrl(payload.mysteryImageUrl)
    const canonicalFilename = getCanonicalFilename(currentKey, 'mystery')
    const targetKey = `${payload.folder}/${canonicalFilename}`

    if (
      payload.mysteryImageUrl?.includes(`${payload.game}-biketag`) &&
      !currentKey.startsWith(`${payload.folder}/`)
    ) {
      const moveResult = await moveImage(
        client,
        `${payload.game}-biketag`,
        currentKey,
        targetKey
      )
      if (moveResult.success) {
        payload.mysteryImageUrl = payload.mysteryImageUrl.replace(
          currentKey,
          targetKey
        )
      } else {
        success = false
        error = moveResult.error || 'Image move failed'
      }
    } else {
      const mysteryUploadResponse = await uploadTagImage(client, {
        ...mysteryImagePayload,
        mysteryImage: payload.mysteryImageUrl,
        mysteryImageUrl: undefined,
        game: payload.game,
        tagnumber: payload.tagnumber,
        region: payload.region,
        folder: payload.folder,
      })
      if (mysteryUploadResponse.success) {
        payload.mysteryImageUrl = mysteryUploadResponse.data.mysteryImageUrl
      } else {
        success = false
        error = mysteryUploadResponse.error || 'Image upload failed'
      }
    }
  }

  // Handle found image
  if (!existingTag?.foundImageUrl?.length) {
    const currentKey = getKeyFromUrl(payload.foundImageUrl)
    const canonicalFilename = getCanonicalFilename(currentKey, 'found')
    const targetKey = `${payload.folder}/${canonicalFilename}`

    if (
      payload.foundImageUrl?.includes(`${payload.game}-biketag`) &&
      !currentKey.startsWith(`${payload.folder}/`)
    ) {
      const moveResult = await moveImage(
        client,
        `${payload.game}-biketag`,
        currentKey,
        targetKey
      )
      if (moveResult.success) {
        payload.foundImageUrl = payload.foundImageUrl.replace(
          currentKey,
          targetKey
        )
      } else {
        success = false
        error = moveResult.error || 'Image move failed'
      }
    } else {
      const foundUploadResponse = await uploadTagImage(client, {
        ...foundImagePayload,
        foundImage: payload.foundImageUrl,
        foundImageUrl: undefined,
        game: payload.game,
        tagnumber: payload.tagnumber,
        region: payload.region,
        folder: payload.folder,
      })
      if (foundUploadResponse.success) {
        payload.foundImageUrl = foundUploadResponse.data.foundImageUrl
      } else {
        success = false
        error = foundUploadResponse.error || 'Image upload failed'
      }
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
