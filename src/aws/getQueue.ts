import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse, S3ImageMeta } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  loadIndex,
  saveIndex,
  resizeAndSaveVariants,
  listAllS3Objects,
  getGroupedImagesByTagnumber,
  getGroupedTagsByPlayer,
  decodeMetadataValue,
} from './helpers'

export async function getQueue(
  client: S3Client,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    rebuildIndex: shouldForceRebuild = false,
    handleResize = false,
    region,
  } = payload
  const bucket = `${game}-biketag`
  const folder = 'queue'

  let tags: Tag[] = []
  let success = true
  let error: string | undefined
  let needsRebuild = shouldForceRebuild

  try {
    if (!needsRebuild) {
      try {
        tags = await loadIndex(client, bucket, folder, region)
      } catch {
        needsRebuild = true
      }
    }

    if (needsRebuild) {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `${folder}/`,
      })
      const files = list.map((obj) => obj.Key).filter(Boolean) as string[]

      const metaList: S3ImageMeta[] = []
      for (const key of files) {
        const match = key.match(
          new RegExp(
            `${folder}/(.+?)--(mystery|found)\\.(webp|jpg|jpeg|png)$`,
            'i'
          )
        )
        if (!match) continue

        const head = await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key })
        )

        const meta: S3ImageMeta = {
          url: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`,
          title: decodeMetadataValue(head.Metadata?.title || ''),
          description: decodeMetadataValue(head.Metadata?.description || ''),
        }

        metaList.push(meta)
      }

      const groupedImages = getGroupedImagesByTagnumber(metaList)
      tags = getGroupedTagsByPlayer(groupedImages, { game })

      if (handleResize) {
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i]
          const tagId = tag.slug ?? `tag-${tag.tagnumber}`
          const types: ('mystery' | 'found')[] = []
          if (tag.mysteryImageUrl) types.push('mystery')
          if (tag.foundImageUrl) types.push('found')

          for (const type of types) {
            const base = `queue/${tagId}--${type}`
            const hasVariants =
              files.includes(`${base}.webp`) &&
              files.includes(`${base}--medium.webp`) &&
              files.includes(`${base}--small.webp`)

            if (!hasVariants) {
              const newUrl = await resizeAndSaveVariants({
                client,
                tag,
                imageType: type,
              })
              if (type === 'mystery') tags[i].mysteryImageUrl = newUrl
              else tags[i].foundImageUrl = newUrl
            }
          }
        }
      }

      await saveIndex(client, bucket, folder, tags)
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
