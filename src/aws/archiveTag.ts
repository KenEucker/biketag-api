import { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { archiveTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getOnlyFoundTagFromTagData } from '../common/getters'
import {
  getTagPrefix,
  listAllS3Objects,
  loadIndex,
  moveImage,
  saveIndex,
} from './helpers'

export async function archiveTag(
  client: S3Client,
  payload: archiveTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const bucket = `${payload.game}-biketag`
  const folderFrom = 'queue'
  const folderTo = 'archive'

  const prefix = getTagPrefix(folderFrom, payload.game, payload.tagnumber)
  const list = await listAllS3Objects(client, {
    Bucket: bucket,
    Prefix: prefix,
  })

  let success = true
  let error = ''
  let data: Tag | null = null

  try {
    for (const obj of list) {
      const sourceKey = obj.Key
      const destinationKey = sourceKey.replace(
        new RegExp(`^${folderFrom}/`),
        `${folderTo}/`
      )

      const result = await moveImage(client, bucket, sourceKey, destinationKey)
      if (!result.success) {
        throw new Error(`Failed to move ${sourceKey}: ${result.error}`)
      }
    }

    // Load and update indices
    const queueIndex = await loadIndex(
      client,
      bucket,
      folderFrom,
      payload.region
    )
    const archiveIndex = await loadIndex(
      client,
      bucket,
      folderTo,
      payload.region
    )

    const tagToMove = queueIndex.find((t) => t.tagnumber === payload.tagnumber)
    const updatedQueue = queueIndex.filter(
      (t) => t.tagnumber !== payload.tagnumber
    )
    const updatedArchive = tagToMove
      ? [...archiveIndex, tagToMove]
      : archiveIndex

    await Promise.all([
      saveIndex(client, bucket, folderFrom, updatedQueue),
      saveIndex(client, bucket, folderTo, updatedArchive),
    ])

    data = tagToMove ? getOnlyFoundTagFromTagData(tagToMove) : null
  } catch (err: any) {
    success = false
    error = err.message || String(err)
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.NoContent,
  }
}
