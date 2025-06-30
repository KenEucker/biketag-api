import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse, S3ImageMeta } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { loadIndex, saveIndex } from './helpers'
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
  const indexPath = `${folder}/index.json`
  let tags: Tag[] = []
  let success = true
  let error: string | undefined

  try {
    if (!rebuildIndex) {
      try {
        tags = await loadIndex(client, bucket, indexPath, awsRegion)
      } catch {
        rebuildIndex = true
      }
    }

    if (rebuildIndex) {
      const result = await client.send(
        new ListObjectsV2Command({ Bucket: bucket, Prefix: `${folder}/` })
      )

      const imageMap = new Map<
        number,
        { mystery?: S3ImageMeta; found?: S3ImageMeta }
      >()

      for (const obj of result.Contents || []) {
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

        const meta: S3ImageMeta = {
          url: `https://${bucket}.${awsRegion}.cdn.digitaloceanspaces.com/${key}`,
          title: head.Metadata?.title || '',
          description: head.Metadata?.description || '',
        }

        // Extract tagnumber from metadata
        const metadataTagnumber = getTagNumbersFromText(
          meta.description || ''
        )[0]
        if (!metadataTagnumber) continue

        // Validate filename and metadata agree on tagnumber
        const filenameTagnumberMatch = filenameTagId.match(/-(\d+)(--.*)?$/)
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
