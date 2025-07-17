import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  getBikeTagImageKey,
  getTagPrefix,
  listAllS3Objects,
  loadIndex,
  saveIndex,
} from './helpers'
import { Tag } from '../common/schema'

export async function deleteTag(
  client: S3Client,
  payload: deleteTagPayload & { tag?: Tag }
): Promise<BikeTagApiResponse<boolean[]>> {
  const { tagnumber, folder, game, region, tag } = payload
  const bucket = `${game}-biketag`
  const deleted: boolean[] = []

  let success = true
  let error = ''

  if (folder === 'main') {
    // Delete everything with prefix (legacy behavior)
    const prefix = getTagPrefix(folder, game, tagnumber)
    const list = await listAllS3Objects(client, {
      Bucket: bucket,
      Prefix: prefix,
    })

    const deleteOps = list.map(async (obj) => {
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
  }

  if (folder === 'queue' && tag) {
    // Delete specific keys for mysteryPlayer and foundPlayer images
    const keys: string[] = []

    if (tag.mysteryPlayer) {
      const mysteryKey = await getBikeTagImageKey(
        'mystery',
        tag.mysteryPlayer,
        tagnumber,
        game,
        '',
        folder
      )
      keys.push(mysteryKey)
    }

    if (tag.foundPlayer) {
      const foundKey = await getBikeTagImageKey(
        'found',
        tag.foundPlayer,
        tagnumber,
        game,
        '',
        folder
      )
      keys.push(foundKey)
    }

    const deleteOps = keys.map(async (key) => {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          })
        )
        return true
      } catch {
        return false
      }
    })

    const results = await Promise.all(deleteOps)
    deleted.push(...results)
  }

  let indexUpdateError = ''
  try {
    await loadIndex(client, bucket, folder, region, false, true)
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
