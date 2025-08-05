import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  CopyObjectCommand,
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
  getKeyFromUrl,
  getMysteryMetadata,
} from './helpers'
import { Tag } from '../common/schema'

export async function deleteTag(
  client: S3Client,
  payload: deleteTagPayload & { tag?: Tag }
): Promise<BikeTagApiResponse<boolean[]>> {
  payload.folder = payload.folder ?? 'queue'

  const logVerbose = payload.verbose ? console.log : () => {}

  const { tagnumber, folder, game, region, mysteryPlayer, foundPlayer } =
    payload
  const bucket = `${game}-biketag`
  const deleted: boolean[] = []
  let success = true
  let errors: string[] = []

  if (!tagnumber) {
    success = false
    errors.push('tagnumber not set')
    logVerbose('[deleteTag] Missing tagnumber.')
  }

  if (folder === 'main' && tagnumber) {
    logVerbose(`[deleteTag] Deleting tag #${tagnumber} from main folder...`)
    const prefix = getTagPrefix(folder, game, tagnumber)
    const list = await listAllS3Objects(client, {
      Bucket: bucket,
      Prefix: prefix,
    })
    logVerbose(`[deleteTag] Found ${list.length} object(s) to delete.`)

    const deleteOps = list.map(async (obj) => {
      try {
        await client.send(
          new DeleteObjectCommand({ Bucket: bucket, Key: obj.Key })
        )
        logVerbose(`[deleteTag] Deleted: ${obj.Key}`)
        return true
      } catch (err) {
        logVerbose(`[deleteTag] Failed to delete ${obj.Key}:`, err.message)
        errors.push(err.message)
        return false
      }
    })

    const results = await Promise.all(deleteOps)
    deleted.push(...results)
  }

  if (folder === 'queue' && tagnumber) {
    logVerbose(`[deleteTag] Deleting tag #${tagnumber} from queue folder...`)
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
      logVerbose(
        `[deleteTag] Found ${mysteryObjects.length} mystery objects to delete.`
      )
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
      logVerbose(
        `[deleteTag] Found ${foundObjects.length} found objects to delete.`
      )
      keysToDelete.push(...foundObjects.map((obj) => ({ Key: obj.Key! })))
    }

    if (keysToDelete.length > 0) {
      try {
        logVerbose(`[deleteTag] Deleting ${keysToDelete.length} object(s)...`)
        const result = await client.send(
          new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: { Objects: keysToDelete },
          })
        )
        deleted.push(...keysToDelete.map(() => true))

        if (result.Errors && result.Errors.length > 0) {
          result.Errors.forEach((err) => {
            logVerbose(
              `[deleteTag] Failed to delete ${err.Key}: ${err.Message}`
            )
            errors.push(`${err.Key}: ${err.Message}`)
          })
        }
      } catch (err: any) {
        errors.push(err.message)
        deleted.push(false)
        logVerbose('[deleteTag] DeleteObjectsCommand failed:', err.message)
      }
    }
  }

  let indexUpdateError = ''
  if (success && tagnumber) {
    try {
      logVerbose('[deleteTag] Loading current index...')
      let index = await loadIndex(client, bucket, folder, region)
      let newIndex = index.filter((t) => t.tagnumber !== tagnumber)

      if (folder === 'main' && newIndex.length > 0) {
        const idx = newIndex.findIndex((t) => t.tagnumber === tagnumber - 1)

        if (idx === -1) {
          const errMsg = `Previous tag ${tagnumber - 1} not found in index`
          logVerbose('[deleteTag] ' + errMsg)
          errors.push(errMsg)
          success = false
        } else {
          logVerbose('[deleteTag] Resetting latest tag to mystery state...')
          const latestTag = { ...newIndex[idx] }
          latestTag.gps = { lat: 0, long: 0, alt: 0 }
          latestTag.foundPlayer = ''
          latestTag.foundImageUrl = ''
          latestTag.foundTime = 0
          latestTag.foundLocation = ''

          if (latestTag.mysteryImageUrl) {
            const mysteryKey = getKeyFromUrl(latestTag.mysteryImageUrl)
            try {
              logVerbose('[deleteTag] Refreshing mystery metadata...')
              await client.send(
                new CopyObjectCommand({
                  Bucket: bucket,
                  CopySource: `${bucket}/${mysteryKey}`,
                  Key: mysteryKey,
                  ACL: 'public-read',
                  MetadataDirective: 'REPLACE',
                  Metadata: {
                    data: getMysteryMetadata(latestTag),
                  },
                })
              )
            } catch (err: any) {
              success = false
              const errMsg = `Failed to refresh metadata for mystery image: ${err.message}`
              logVerbose('[deleteTag] ' + errMsg)
              errors.push(errMsg)
            }
          }

          newIndex[idx] = latestTag
        }
      } else {
        logVerbose('[deleteTag] Removing tag from queue index...')
        newIndex = newIndex.filter((t) => t.foundPlayer !== foundPlayer)
      }

      logVerbose('[deleteTag] Saving updated index...')
      await saveIndex(client, bucket, folder, newIndex)
    } catch (indexErr: any) {
      indexUpdateError = `Index update failed: ${indexErr.message}`
      logVerbose('[deleteTag] ' + indexUpdateError)
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
    error: errors.join('; '),
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
