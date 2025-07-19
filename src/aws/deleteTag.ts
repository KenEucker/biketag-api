import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3'
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
  payload.folder = payload.folder ?? 'queue'
  const { tagnumber, folder, game, region, mysteryPlayer, foundPlayer } =
    payload
  const bucket = `${game}-biketag`
  const deleted: boolean[] = []

  let success = true
  let errors = []

  if (!tagnumber) {
    success = false
    errors.push('tagnumber not set')
  }

  if (folder === 'main' && tagnumber) {
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
      } catch (err) {
        errors.push(err.message)
        return false
      }
    })

    const results = await Promise.all(deleteOps)
    deleted.push(...results)
  }

  if (folder === 'queue' && tagnumber) {
    const keysToDelete: { Key: string }[] = []

    if (mysteryPlayer) {
      const mysteryKey = await getBikeTagImageKey(
        'mystery',
        mysteryPlayer,
        tagnumber,
        game,
        '',
        folder
      )

      const mysteryObjects = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: mysteryKey,
      })

      keysToDelete.push(...mysteryObjects.map((obj) => ({ Key: obj.Key! })))
    }

    if (foundPlayer) {
      const foundKey = await getBikeTagImageKey(
        'found',
        foundPlayer,
        tagnumber,
        game,
        '',
        folder
      )

      const foundObjects = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: foundKey,
      })

      keysToDelete.push(...foundObjects.map((obj) => ({ Key: obj.Key! })))
    }

    if (keysToDelete.length > 0) {
      try {
        const result = await client.send(
          new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: { Objects: keysToDelete },
          })
        )

        deleted.push(...keysToDelete.map(() => true))

        if (result.Errors && result.Errors.length > 0) {
          result.Errors.forEach((err) =>
            errors.push(`${err.Key}: ${err.Message}`)
          )
        }
      } catch (err: any) {
        errors.push(err.message)
        deleted.push(false)
      }
    }
  }

  let indexUpdateError = ''
  if (success && tagnumber) {
    try {
      const index = await loadIndex(client, bucket, folder, region)
      const newIndex = index.filter((t) => t.tagnumber !== tagnumber)
      await saveIndex(client, bucket, folder, newIndex)
    } catch (indexErr: any) {
      indexUpdateError = `Index update failed: ${indexErr.message}`
    }
  }

  success = success && deleted.every(Boolean)
  if (indexUpdateError) {
    success = false
    errors.push(indexUpdateError)
  }

  return {
    data: deleted,
    success,
    error: errors.join(';'),
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
