import { CopyObjectCommand, HeadObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import type { Tag } from '../common/schema'
import type { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  decodeMetadataValue, encodeMetadataValue, getAwsBucketName, getKeyFromUrl,
  loadIndex, saveIndex,
} from './helpers'

type Patch = Partial<Tag> & { game: string; tagnumber: number; region?: string }
const mysteryFields = ['mysteryPlayer', 'mysteryTime', 'hint', 'discussionUrl', 'mentionUrl', 'shareUrl'] as const
const foundFields = ['foundPlayer', 'foundTime', 'foundLocation', 'gps', 'confirmedBoundary'] as const
const repairFields = ['foundImageUrl', 'foundPlayer', 'playerId', 'foundTime', 'foundLocation', 'gps', 'title', 'description'] as const

const imageKey = (url: string, game: string, n: number, side: 'mystery' | 'found') => {
  const key = getKeyFromUrl(url)
  if (!new RegExp(`^main/${game.toLowerCase()}-tag-${n}--${side}\\.(webp|jpe?g|png|gif|avif)$`).test(key)) {
    throw new Error(`Image does not belong to tag #${n}`)
  }
  return key
}

/** Patch an existing main tag; never create a new tag or change its number. */
const patchIndex = async (
  client: S3Client, patch: Patch,
  edit: (original: Tag, bucket: string) => Promise<Partial<Tag>>
): Promise<BikeTagApiResponse<Tag>> => {
  try {
    if (!patch.game || !Number.isSafeInteger(patch.tagnumber) || patch.tagnumber < 1) {
      throw new Error('A valid game and tag number are required')
    }
    const bucket = getAwsBucketName(patch.game)
    const tags = await loadIndex(client, bucket, 'main', patch.region ?? '')
    const original = tags.find(t => t.tagnumber === patch.tagnumber)
    if (!original) throw new Error(`Tag #${patch.tagnumber} not found in main`)
    const changes = await edit(original, bucket)
    // Re-read before writing so edits don't replace rounds published during image metadata copies.
    const latest = await loadIndex(client, bucket, 'main', patch.region ?? '')
    const i = latest.findIndex(t => t.tagnumber === patch.tagnumber)
    if (i < 0) throw new Error(`Tag #${patch.tagnumber} no longer exists`)
    const updated = { ...latest[i], ...changes } as Tag
    latest[i] = updated
    await saveIndex(client, bucket, 'main', latest)
    return { success: true, data: updated, status: HttpStatusCode.Ok, source: AvailableApis[AvailableApis.aws] }
  } catch (error: any) {
    return {
      success: false, data: null, error: error?.message ?? String(error),
      status: HttpStatusCode.BadRequest, source: AvailableApis[AvailableApis.aws],
    }
  }
}

/** Apply an explicit metadata-only AWS update, copying metadata only on affected images. */
export const updateStoredTagMetadata = (client: S3Client, patch: Patch) =>
  patchIndex(client, patch, async (original, bucket) => {
    if (patch.game.toLowerCase() !== original.game.toLowerCase()) throw new Error('Tag game mismatch')
    for (const field of ['mysteryImageUrl', 'foundImageUrl'] as const) {
      if (patch[field] !== undefined && patch[field] !== original[field]) {
        throw new Error(`${field} does not match tag #${original.tagnumber}`)
      }
    }
    const changes = Object.fromEntries(
      Object.entries(patch).filter(([key]) =>
        [...mysteryFields, ...foundFields, 'slug', 'name', 'playerId'].includes(key as any)
      )
    ) as Partial<Tag>
    const updated = { ...original, ...changes }

    for (const side of ['mystery', 'found'] as const) {
      const fields: readonly string[] = side === 'mystery' ? mysteryFields : foundFields
      if (!Object.keys(changes).some(key => fields.includes(key))) continue
      const url = original[`${side}ImageUrl`]
      if (!url) throw new Error(`Tag #${patch.tagnumber} has no ${side} image`)
      const key = imageKey(url, patch.game, patch.tagnumber, side)
      const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      const previous = head.Metadata?.data
        ? JSON.parse(decodeMetadataValue(head.Metadata.data)) : {}
      const fieldsToSave = side === 'mystery'
        ? { t: updated.tagnumber, p: updated.playerId, mp: updated.mysteryPlayer,
            mt: updated.mysteryTime, h: updated.hint, d: updated.discussionUrl,
            m: updated.mentionUrl, s: updated.shareUrl }
        : { t: updated.tagnumber, p: updated.playerId, fp: updated.foundPlayer,
            ft: updated.foundTime, fl: updated.foundLocation, g: updated.gps,
            c: updated.confirmedBoundary }
      await client.send(new CopyObjectCommand({
        Bucket: bucket, Key: key, CopySource: `${bucket}/${key}`,
        MetadataDirective: 'REPLACE', ACL: 'public-read',
        Metadata: { ...head.Metadata, data: encodeMetadataValue(JSON.stringify({ ...previous, ...fieldsToSave })) },
        ContentType: head.ContentType, CacheControl: head.CacheControl,
        ContentDisposition: head.ContentDisposition, ContentEncoding: head.ContentEncoding,
        ContentLanguage: head.ContentLanguage, Expires: head.Expires,
      }))
    }
    return changes
  })

/** Repair only the stored found fields; image copying and validation stay in Vue. */
export const patchStoredTagFoundFields = (client: S3Client, patch: Patch) =>
  patchIndex(client, patch, async (original) => {
    const changes: Record<string, unknown> = {}
    for (const field of repairFields) {
      const value = (patch as any)[field]
      if (value === undefined || value === null || value === '') continue
      if (field === 'foundImageUrl') {
        const next = imageKey(String(value), patch.game, patch.tagnumber, 'found')
        if (original.foundImageUrl) {
          const old = getKeyFromUrl(original.foundImageUrl)
          if (old.startsWith('main/') && old !== next) {
            throw new Error(`Tag #${patch.tagnumber} already points to a different main found image`)
          }
        }
      }
      changes[field] = value
    }
    return changes
  })
