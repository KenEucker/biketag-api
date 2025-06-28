import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { indexKey, loadIndex, saveIndex } from './helpers'

export async function getQueue(
  client: S3Client,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const { game, rebuildIndex: shouldForceRebuild = false } = payload
  const bucket = `${game}-biketag`
  const region = payload.awsRegion
  const indexPath = indexKey('queue')

  let tags: Tag[] = []
  let success = true
  let error: string | undefined
  let needsRebuild = shouldForceRebuild

  try {
    if (!needsRebuild) {
      try {
        tags = await loadIndex(client, bucket, indexPath)
      } catch {
        needsRebuild = true
      }
    }

    if (needsRebuild) {
      const prefix = 'queue/'
      const result = await client.send(
        new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix })
      )

      const foundTags: Record<string, Partial<Tag>> = {}

      for (const obj of result.Contents || []) {
        const key = obj.Key
        const match = key.match(/queue\/(.+?)(--(small|medium))?\.webp$/)
        if (!match) continue

        const tagId = match[1] // e.g. denver-tag-368--mystery
        const tagnumberMatch = tagId.match(/-(\d+)(--.*)?$/)
        const tagnumber = tagnumberMatch ? parseInt(tagnumberMatch[1], 10) : 0

        const base = foundTags[tagId] ?? {}
        foundTags[tagId] = {
          ...base,
          tagnumber,
          game,
          mysteryImageUrl: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/queue/${tagId}.webp`,
        }
      }

      tags = Object.values(foundTags) as Tag[]
      await saveIndex(client, bucket, indexPath, tags)
    }
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data: tags,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
