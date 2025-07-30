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
  getTagMetadata,
} from './helpers'

export async function getQueue(
  client: S3Client,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const { game, reindex, resize, cached, region, verbose } = payload
  const bucket = `${game}-biketag`
  const folder = 'queue'

  const logVerbose = payload.verbose ? console.log : () => {}

  let tags: Tag[] = []
  let success = true
  let error: string | undefined
  let needsRebuild = reindex

  try {
    if (!reindex) {
      try {
        logVerbose('[getQueue] Attempting to load index...')
        tags = await loadIndex(client, bucket, folder, region, cached, reindex)
        logVerbose(`[getQueue] Loaded ${tags.length} tags from index.`)
      } catch (err) {
        logVerbose('[getQueue] Failed to load index. Rebuilding...')
        needsRebuild = true
      }
    }

    if (needsRebuild) {
      logVerbose('[getQueue] Listing all S3 objects...')
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `${folder}/`,
      })
      const files = list.map((obj) => obj.Key).filter(Boolean) as string[]
      logVerbose(`[getQueue] Found ${files.length} files in ${folder}/`)

      const metaList: S3ImageMeta[] = []

      for (const key of files) {
        // Skip variants
        if (/_medium\.webp$|_small\.webp$/i.test(key)) continue

        const match = key.match(
          new RegExp(
            `${folder}/(.+?)--(mystery|found)--([a-z0-9]+)\\.(webp|jpg|jpeg|png)$`,
            'i'
          )
        )
        if (!match) continue

        logVerbose('[getQueue] Getting metadata for', key)
        const head = await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key })
        )

        const meta: S3ImageMeta = {
          url: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`,
          title: decodeMetadataValue(head.Metadata?.title || ''),
          description: decodeMetadataValue(head.Metadata?.description || ''),
          data: getTagMetadata(head.Metadata?.data),
        }

        metaList.push(meta)
      }

      logVerbose(`[getQueue] Collected metadata for ${metaList.length} images`)
      const groupedImages = getGroupedImagesByTagnumber(metaList)
      tags = getGroupedTagsByPlayer(groupedImages, { game })
      logVerbose(`[getQueue] Grouped into ${tags.length} tag(s)`)

      if (resize) {
        logVerbose('[getQueue] Resizing missing image variants...')
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i]
          const types: ('mystery' | 'found')[] = []
          if (tag.mysteryImageUrl) types.push('mystery')
          if (tag.foundImageUrl) types.push('found')

          for (const type of types) {
            const url =
              type === 'mystery' ? tag.mysteryImageUrl! : tag.foundImageUrl!
            const filename = url.split('/').pop() || ''
            const base = filename.replace(/\.(webp|jpg|jpeg|png)$/i, '')

            const hasVariants =
              files.includes(`${folder}/${base}_medium.webp`) &&
              files.includes(`${folder}/${base}_small.webp`)

            if (!hasVariants) {
              logVerbose(
                `Resizing ${type} image for tag #${tag.tagnumber} (${base})`
              )
              const newUrl = await resizeAndSaveVariants({
                client,
                tag,
                imageType: type,
                resizeHost: payload.host,
              })
              if (type === 'mystery') tags[i].mysteryImageUrl = newUrl
              else tags[i].foundImageUrl = newUrl
            }
          }
        }
      }

      logVerbose('[getQueue] Saving index...')
      await saveIndex(client, bucket, folder, tags)
    }
  } catch (err: any) {
    success = false
    error = err.message
    logVerbose('[getQueue] Error during getQueue:', error)
  }

  return {
    data: tags,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
