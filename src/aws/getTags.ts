import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { loadIndex, saveIndex, indexKey } from './helpers'
import { sortTags } from '../common/methods'

export async function getTags(
  client: S3Client,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    awsRegion,
    folder = 'main',
    tagnumbers,
    slugs,
    sort,
    limit,
    time,
  } = payload
  let { rebuildIndex } = payload

  const bucket = `${game}-biketag`
  const indexPath = indexKey(folder)
  let tags: Tag[] = []
  let success = true
  let error: string | undefined

  try {
    if (!rebuildIndex) {
      try {
        tags = await loadIndex(client, bucket, indexPath, payload.awsRegion)
      } catch {
        rebuildIndex = true
      }
    }

    if (rebuildIndex) {
      const result = await client.send(
        new ListObjectsV2Command({ Bucket: bucket, Prefix: `${folder}/` })
      )

      const tagMap: Record<string, Partial<Tag>> = {}

      for (const obj of result.Contents || []) {
        const key = obj.Key
        const match = key.match(
          new RegExp(`${folder}/(.+?)(--(small|medium))?\\.webp$`)
        )
        if (!match) continue

        const tagId = match[1]
        const tagnumberMatch = tagId.match(/-(\d+)(--.*)?$/)
        const tagnumber = tagnumberMatch ? parseInt(tagnumberMatch[1], 10) : 0

        const base = tagMap[tagId] ?? {}
        tagMap[tagId] = {
          ...base,
          tagnumber,
          game,
          mysteryImageUrl: `https://${bucket}.${awsRegion}.cdn.digitaloceanspaces.com/${folder}/${tagId}.webp`,
        }
      }

      tags = Object.values(tagMap) as Tag[]
      await saveIndex(client, bucket, indexPath, tags)
    }

    if (tagnumbers?.length) {
      tags = tags.filter((tag) => tagnumbers.includes(tag.tagnumber))
    }

    if (slugs?.length) {
      tags = tags.filter((tag) => slugs.includes(tag.slug))
    }
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data: sortTags(tags, sort, limit, time),
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
