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
  const { tagnumber, folder, game } = payload
  const bucket = `${game}-biketag`
  const prefix = getTagPrefix(folder, game, tagnumber) // e.g. "queue/denver-tag-368"
  const deleted: boolean[] = []

  let success = true
  let error = ''

  try {
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
        deleted.push(true)
      } catch {
        deleted.push(false)
      }
    })

    await Promise.all(deleteOps)

    // Update the index.json
    const indexPath = indexKey(folder)
    const index: Tag[] = await loadIndex(client, bucket, indexPath)
    const updatedIndex = index.filter((tag) => tag.tagnumber !== tagnumber)
    await saveIndex(client, bucket, indexPath, updatedIndex)

    success = deleted.every(Boolean)
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data: deleted,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
