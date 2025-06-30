import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getTagPrefix, indexKey, loadIndex, saveIndex } from './helpers'
import { Tag } from '../common/schema'

export async function deleteTag(
  client: S3Client,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<boolean[]>> {
  const { tagnumber, folder, game, awsRegion } = payload
  const bucket = `${game}-biketag`
  const prefix = getTagPrefix(folder, game, tagnumber) // e.g. "queue/denver-tag-368"
  const deleted: boolean[] = []

  let success = true
  let error = ''

  const list = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix, // Gets all files starting with the tagId
    })
  )

  const deleteOps = (list.Contents || []).map(async (obj) => {
    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: obj.Key,
        })
      )
      return true
    } catch {
      return false
    }
  })

  const results = await Promise.all(deleteOps)
  deleted.push(...results)

  let indexUpdateError = ''
  // Update the index.json
  try {
    const indexPath = indexKey(folder)
    const index: Tag[] = await loadIndex(
      client,
      bucket,
      indexPath,
      payload.awsRegion
    )
    const updatedIndex = index.filter((tag) => tag.tagnumber !== tagnumber)
    await saveIndex(client, bucket, indexPath, updatedIndex)
  } catch (indexErr: any) {
    indexUpdateError = `Index update failed: ${indexErr.message}`
  }

  success = deleted.every(Boolean)
  if (indexUpdateError) {
    success = false
    error = error ? `${error}; ${indexUpdateError}` : indexUpdateError
  }

  return {
    data: deleted,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
