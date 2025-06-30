import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getQueuePayload } from '../common/payloads'
import { BikeTagApiResponse, S3ImageMeta } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  loadIndex,
  saveIndex,
  resizeAndSaveVariants,
  listAllS3Objects,
} from './helpers'
import { getBikeTagFromS3ImageSet } from '../common/getters'
import { getTagNumbersFromText, getPlayerFromText } from '../imgur/helpers'

export async function getQueue(
  client: S3Client,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    rebuildIndex: shouldForceRebuild = false,
    handleResize = false,
  } = payload
  const bucket = `${game}-biketag`
  const region = payload.region
  const queueFolder = 'queue'

  let tags: Tag[] = []
  let success = true
  let error: string | undefined
  let needsRebuild = shouldForceRebuild

  try {
    if (!needsRebuild) {
      try {
        tags = await loadIndex(client, bucket, queueFolder, region)
      } catch {
        needsRebuild = true
      }
    }

    if (needsRebuild) {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: 'queue/',
      })

      const filesInQueue = list.map((obj) => obj.Key ?? '') ?? []

      const imageMap = new Map<
        number,
        { type: 'mystery' | 'found'; meta: S3ImageMeta }[]
      >()

      for (const key of filesInQueue) {
        const match = key.match(
          /queue\/(.+?)--(mystery|found)\.(webp|jpg|jpeg|png)$/i
        )
        if (!match) continue

        const type = match[2] as 'mystery' | 'found'

        const head = await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key })
        )

        // TODO: Make URL construction configurable for different S3-compatible services
        const meta: S3ImageMeta = {
          url: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`,
          title: head.Metadata?.title || '',
          description: head.Metadata?.description || '',
        }

        const tagnumber = getTagNumbersFromText(meta.description)[0]
        if (!tagnumber) continue

        const group = imageMap.get(tagnumber) || []
        group.push({ type, meta })
        imageMap.set(tagnumber, group)
      }

      const tagnumbers = [...imageMap.keys()]
      const maxTagNumber = Math.max(...tagnumbers)
      const currentRound = maxTagNumber - 1

      // Group mystery/found images by player across current and next round
      const playerMap = new Map<
        string,
        { found?: S3ImageMeta; mystery?: S3ImageMeta; tagnumber: number }
      >()

      for (const [tagnumber, imageEntries] of imageMap.entries()) {
        for (const { type, meta } of imageEntries) {
          const player = getPlayerFromText(meta.description)
          if (!player) continue

          const existing = playerMap.get(player) || { tagnumber: maxTagNumber }
          if (type === 'found' && tagnumber === currentRound) {
            existing.found = meta
          }
          if (type === 'mystery' && tagnumber === maxTagNumber) {
            existing.mystery = meta
          }
          playerMap.set(player, existing)
        }
      }

      tags = Array.from(playerMap.values())
        .map(({ mystery, found }) =>
          getBikeTagFromS3ImageSet(mystery, found, { game })
        )
        .filter(Boolean)

      // Resize if needed
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
              filesInQueue.includes(`${base}.webp`) &&
              filesInQueue.includes(`${base}--medium.webp`) &&
              filesInQueue.includes(`${base}--small.webp`)

            if (!hasVariants) {
              await resizeAndSaveVariants({ client, tag, imageType: type })
              // TODO: Make URL construction configurable for different S3-compatible services
              const newUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${base}.webp`
              if (type === 'mystery') tags[i].mysteryImageUrl = newUrl
              else tags[i].foundImageUrl = newUrl
            }
          }
        }
      }

      await saveIndex(client, bucket, queueFolder, tags)
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
