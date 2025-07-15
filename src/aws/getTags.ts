import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse, S3ImageMeta } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  decodeMetadataValue,
  listAllS3Objects,
  loadIndex,
  saveIndex,
} from './helpers'
import { sortTags } from '../common/methods'
import {
  getBikeTagFromS3ImageSet,
  getTagNumbersFromText,
} from '../common/getters'

export async function getTags(
  client: S3Client,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    region,
    folder = 'main',
    tagnumbers,
    slugs,
    sort,
    limit,
    time,
  } = payload
  let { reindex } = payload

  const bucket = `${game}-biketag`
  let tags: Tag[] = []
  let success = true
  let error: string | undefined

  try {
    if (!reindex) {
      try {
        tags = await loadIndex(client, bucket, folder, region, payload.cached)
      } catch {
        reindex = true
      }
    }

    if (reindex) {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `${folder}/`,
      })

      const imageMap = new Map<
        number,
        { mystery?: S3ImageMeta; found?: S3ImageMeta }
      >()

      for (const obj of list) {
        const key = obj.Key
        if (!key) continue

        // Match file name structure: folder/denver-tag-368--mystery.webp
        const match = key.match(
          new RegExp(`${folder}/(.+?)--(mystery|found)\\.(webp|jpg|jpeg|png)$`)
        )
        if (!match) continue

        const filenameTagId = match[1] // denver-tag-368
        const type = match[2] as 'mystery' | 'found'

        const head = await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key })
        )

        // TODO: Make URL construction configurable for different S3-compatible services
        const meta: S3ImageMeta = {
          url: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`,
          title: decodeMetadataValue(head.Metadata?.title || ''),
          description: decodeMetadataValue(head.Metadata?.description || ''),
        }

        // Extract tagnumber from metadata
        const metadataTagnumber = getTagNumbersFromText(
          meta.description || ''
        )[0]
        if (!metadataTagnumber) continue

        // Validate filename and metadata agree on tagnumber
        const filenameOnly = filenameTagId.split('/').pop() ?? ''
        const filenameTagnumberMatch = filenameOnly.match(/-tag-(\d+)/)
        const filenameTagnumber = filenameTagnumberMatch
          ? parseInt(filenameTagnumberMatch[1], 10)
          : null

        if (filenameTagnumber !== metadataTagnumber) {
          console.warn(
            `Tagnumber mismatch for ${key}: filename=${filenameTagnumber}, metadata=${metadataTagnumber}`
          )
          continue
        }
        const existing = imageMap.get(metadataTagnumber) || {}
        imageMap.set(metadataTagnumber, {
          ...existing,
          [type]: meta,
        })
      }

      tags = Array.from(imageMap.entries())
        .map(([_, { mystery, found }]) =>
          getBikeTagFromS3ImageSet(mystery, found, { game })
        )
        .filter(Boolean)

      await saveIndex(client, bucket, folder, sortTags(tags))
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
