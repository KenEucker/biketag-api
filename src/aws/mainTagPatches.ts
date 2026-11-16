import {
  CopyObjectCommand,
  HeadObjectCommand,
  type S3Client,
} from '@aws-sdk/client-s3'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import type { Tag } from '../common/schema'
import type { BikeTagApiResponse } from '../common/types'
import {
  decodeMetadataValue,
  encodeMetadataValue,
  getAwsBucketName,
  getKeyFromUrl,
  loadIndex,
  saveIndex,
} from './helpers'

type MainIndexPatch = Partial<Tag> & {
  game: string
  tagnumber: number
  region?: string
}

const mysteryFields = ['mysteryPlayer', 'mysteryTime', 'hint'] as const
const foundFields = ['foundPlayer', 'foundTime', 'foundLocation', 'gps'] as const
const foundRepairFields = [
  'foundImageUrl', 'foundPlayer', 'playerId', 'foundTime',
  'foundLocation', 'gps', 'title', 'description',
] as const

const result = (
  success: boolean,
  data: Tag | null,
  error?: string
): BikeTagApiResponse<Tag> => ({
  data,
  success,
  error,
  source: AvailableApis[AvailableApis.aws],
  status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
})

const patchIndexRecord = async (
  client: S3Client,
  patch: MainIndexPatch,
  merge: (existing: Tag) => Promise<Tag>
): Promise<BikeTagApiResponse<Tag>> => {
  try {
    if (!Number.isSafeInteger(patch.tagnumber) || patch.tagnumber < 1) {
      throw new Error('A valid tag number is required')
    }
    if (!patch.game) throw new Error('Game is required')
    const bucket = getAwsBucketName(patch.game)
    const tags = await loadIndex(client, bucket, 'main', patch.region ?? '')
    const index = tags.findIndex((tag) => tag.tagnumber === patch.tagnumber)
    if (index < 0) throw new Error(`Tag #${patch.tagnumber} not found in main`)
    const original = tags[index]
    const updated = await merge(original)

    // Another round may have been published while image metadata was copied.
    // Reload immediately before writing and apply only fields that changed.
    const latest = await loadIndex(client, bucket, 'main', patch.region ?? '')
    const latestIndex = latest.findIndex((tag) => tag.tagnumber === patch.tagnumber)
    if (latestIndex < 0) throw new Error(`Tag #${patch.tagnumber} disappeared from main`)
    const changed = Object.fromEntries(
      Object.keys(updated)
        .filter((key) => JSON.stringify((updated as any)[key]) !== JSON.stringify((original as any)[key]))
        .map((key) => [key, (updated as any)[key]])
    )
    const finalTag = { ...latest[latestIndex], ...changed } as Tag
    latest[latestIndex] = finalTag
    await saveIndex(client, bucket, 'main', latest)
    return result(true, finalTag)
  } catch (err: any) {
    return result(false, null, err?.message ?? String(err))
  }
}

const assertSameTagUrl = (
  url: string,
  game: string,
  tagnumber: number,
  type: 'mystery' | 'found'
): string => {
  const key = getKeyFromUrl(url)
  const name = game.toLowerCase()
  const prefix = `main/${name}-tag-${tagnumber}--${type}.`
  if (!key.startsWith(prefix) ||
      !['webp', 'jpg', 'jpeg', 'png', 'gif', 'avif'].includes(key.slice(prefix.length))) {
    throw new Error(`Invalid ${type} image URL for tag #${tagnumber}`)
  }
  return key
}

/**
 * Update only explicitly editable fields on an existing main tag.
 * Preserve both halves of the tag and all unrelated image metadata.
 * The caller remains responsible for authorizing the edit.
 */
export const updateMainTagMetadata = async (
  client: S3Client,
  patch: MainIndexPatch
): Promise<BikeTagApiResponse<Tag>> => {
  return patchIndexRecord(client, patch, async (existing) => {
    if (patch.game.toLowerCase() !== existing.game.toLowerCase()) {
      throw new Error('Tag game does not match request game')
    }
    if (patch.mysteryImage || patch.foundImage) {
      throw new Error('Image uploads are not supported when editing tag metadata')
    }
    for (const field of ['mysteryImageUrl', 'foundImageUrl'] as const) {
      if (patch[field] !== undefined && patch[field] !== existing[field]) {
        throw new Error(`${field} does not match tag #${existing.tagnumber}`)
      }
    }
    const changes: Partial<Tag> = {}
    for (const field of [...mysteryFields, ...foundFields]) {
      if (patch[field] !== undefined) (changes as any)[field] = patch[field]
    }
    const updated: Tag = { ...existing, ...changes }
    const bucket = getAwsBucketName(patch.game)
    const copies: Array<{
      key: string
      metadata: Record<string, string>
      contentType?: string
      cacheControl?: string
      contentDisposition?: string
      contentEncoding?: string
      contentLanguage?: string
      expires?: Date
    }> = []
    for (const [type, fields] of [
      ['mystery', mysteryFields],
      ['found', foundFields],
    ] as const) {
      if (!fields.some((field) => patch[field] !== undefined)) continue
      const url = existing[`${type}ImageUrl`]
      if (!url) throw new Error(`Tag #${patch.tagnumber} has no ${type} image`)
      const key = assertSameTagUrl(url, patch.game, patch.tagnumber, type)
      const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      let metadata: Record<string, any> = {}
      if (head.Metadata?.data) {
        metadata = JSON.parse(decodeMetadataValue(head.Metadata.data))
      }
      const data = type === 'mystery'
        ? { t: updated.tagnumber, p: updated.playerId, mp: updated.mysteryPlayer,
            mt: updated.mysteryTime, h: updated.hint, d: updated.discussionUrl,
            s: updated.shareUrl, m: updated.mentionUrl }
        : { t: updated.tagnumber, p: updated.playerId, fp: updated.foundPlayer,
            ft: updated.foundTime, fl: updated.foundLocation, g: updated.gps,
            c: updated.confirmedBoundary }
      copies.push({
        key,
        metadata: {
          ...head.Metadata,
          data: encodeMetadataValue(JSON.stringify({ ...metadata, ...data })),
        },
        contentType: head.ContentType,
        cacheControl: head.CacheControl,
        contentDisposition: head.ContentDisposition,
        contentEncoding: head.ContentEncoding,
        contentLanguage: head.ContentLanguage,
        expires: head.Expires,
      })
    }
    for (const copy of copies) {
      await client.send(new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${copy.key}`,
        Key: copy.key,
        MetadataDirective: 'REPLACE',
        Metadata: copy.metadata,
        ContentType: copy.contentType,
        CacheControl: copy.cacheControl,
        ContentDisposition: copy.contentDisposition,
        ContentEncoding: copy.contentEncoding,
        ContentLanguage: copy.contentLanguage,
        Expires: copy.expires,
        ACL: 'public-read',
      }))
    }
    return updated
  })
}

/**
 * Queue orphan repair: change only the found portion of an existing main index
 * entry. This intentionally does not upload, move or rewrite image objects.
 */
export const repairMainFoundIndex = async (
  client: S3Client,
  patch: MainIndexPatch
): Promise<BikeTagApiResponse<Tag>> => {
  return patchIndexRecord(client, patch, async (existing) => {
    const updated = { ...existing }
    for (const field of foundRepairFields) {
      const value = patch[field as keyof Tag]
      if (value === undefined || value === null || value === '') continue
      if (field === 'foundImageUrl') {
        const newKey = assertSameTagUrl(String(value), patch.game, patch.tagnumber, 'found')
        if (existing.foundImageUrl) {
          const oldKey = getKeyFromUrl(existing.foundImageUrl)
          // A queue URL is still repairable. Only a conflicting main/ URL
          // indicates that the tag was already completed with another image.
          if (oldKey.startsWith('main/') && oldKey !== newKey) {
            throw new Error(`Tag #${patch.tagnumber} already points to a different found image`)
          }
        }
        updated.foundImageUrl = String(value)
      } else {
        ;(updated as any)[field] = value
      }
    }
    return updated
  })
}
