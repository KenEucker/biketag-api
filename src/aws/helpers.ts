import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ObjectCannedACL,
  _Object,
  ListObjectsV2CommandInput,
  GetObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3'
import { Tag } from '../common/schema'
import {
  getBikeTagFromS3ImageSet,
  getPlayerGroupingKey,
  getTagNumbersFromText,
} from '../common/getters'
import { Readable } from 'form-data'
import { ImgurImage, S3ImageMeta } from '../common/types'
import TinyCache from 'tinycache'
import { getApiUrl } from '../biketag/helpers'
import { CommonPayloadData } from '../common/types'
import { getImageExtension } from '../common/methods'
import {
  isFoundImage as isImugrFoundImage,
  isMysteryImage as isImgurMysteryImage,
} from '../imgur/helpers'
import { createTagObject } from '../common/data'

const indexCache = new TinyCache()
/** Returns the S3 key prefix for a given tag */
export const getTagPrefix = (
  folder: string,
  game: string,
  tagnumber: number
): string => {
  return `${folder}/${game}-tag-${tagnumber}`
}

export const getBikeTagImageKey = async (
  type,
  player,
  tagnumber,
  game,
  contentType = '',
  folder = 'queue'
) => {
  const suffix = `--${type}`
  const postfix =
    folder === 'queue' ? `--${await getHashedPlayerSuffix(player)}` : ''
  const extension = contentType?.length ? getImageExtension(contentType) : ''
  const key = `${folder}/${game}-tag-${tagnumber}${suffix}${postfix}${extension.length ? '.' + extension : ''}`

  return key
}

export const listAllS3Objects = async (
  client: S3Client,
  params: Omit<ListObjectsV2CommandInput, 'ContinuationToken'>
): Promise<_Object[]> => {
  const allObjects: _Object[] = []
  let continuationToken: string | undefined = undefined

  do {
    const command = new ListObjectsV2Command({
      ...params,
      ContinuationToken: continuationToken,
    })

    const response = await client.send(command)

    if (response.Contents) {
      allObjects.push(...response.Contents)
    }

    continuationToken = response.NextContinuationToken
  } while (continuationToken)

  return allObjects
}

export const streamToString = async (stream: any): Promise<string> => {
  const chunks: Uint8Array[] = []

  // For Node.js: stream is async iterable
  if (stream[Symbol.asyncIterator]) {
    for await (const chunk of stream) {
      chunks.push(
        typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk
      )
    }
    const all = Uint8Array.from(chunks.flatMap((c) => Array.from(c)))
    return new TextDecoder('utf-8').decode(all)
  }

  // For browser: stream is a ReadableStream
  if (typeof stream.getReader === 'function') {
    const reader = stream.getReader()
    let result = ''
    const decoder = new TextDecoder('utf-8')
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      result += decoder.decode(value, { stream: true })
    }
    return result
  }

  throw new Error('Unsupported stream type')
}

export const parseTagnumberFromQueueKey = (key: string): number | undefined => {
  const match = key.match(/-tag-(\d+)--(?:mystery|found)--/i)
  return match ? parseInt(match[1], 10) : undefined
}

export const collectQueueImageMetaList = async (
  client: S3Client,
  bucket: string,
  folder: string,
  region: string
): Promise<S3ImageMeta[]> => {
  const list = await listAllS3Objects(client, {
    Bucket: bucket,
    Prefix: `${folder}/`,
  })

  const metaList: S3ImageMeta[] = []

  for (const obj of list) {
    const key = obj.Key
    if (!key) continue
    if (/_medium\.webp$|_small\.webp$/i.test(key)) continue

    const match = key.match(
      new RegExp(
        `${folder}/(.+?)--(mystery|found)--([a-z0-9]+)\\.(webp|jpg|jpeg|png)$`,
        'i'
      )
    )
    if (!match) continue

    const head = await client.send(
      new HeadObjectCommand({ Bucket: bucket, Key: key })
    )

    const parsed = getTagMetadata(head.Metadata?.data)
    const tagnumberFromKey = parseTagnumberFromQueueKey(key)
    const data =
      parsed ??
      (typeof tagnumberFromKey === 'number'
        ? ({ tagnumber: tagnumberFromKey } as Partial<Tag>)
        : undefined)

    if (!data) continue

    metaList.push({
      url: `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`,
      title: decodeMetadataValue(head.Metadata?.title || ''),
      description: decodeMetadataValue(head.Metadata?.description || ''),
      data,
    })
  }

  return metaList
}

/** Rebuild queue tags by pairing submitter images across adjacent tag numbers. */
export const loadQueueTagsFromImages = async (
  client: S3Client,
  bucket: string,
  folder: string,
  region: string,
  cache?: typeof TinyCache
): Promise<Tag[]> => {
  const game = bucket.replace(/-biketag$/i, '')
  const metaList = await collectQueueImageMetaList(
    client,
    bucket,
    folder,
    region
  )
  const groupedImages = getGroupedImagesByTagnumber(metaList, cache)
  return getGroupedTagsByPlayer(groupedImages, { game }, cache)
}

export const loadIndex = async (
  client: S3Client,
  bucket: string,
  folder: string,
  region: string,
  cached?: boolean,
  reindex?: boolean
): Promise<Tag[]> => {
  const indexKey = `${folder}/index.json`
  const cacheKey = `${region}:${bucket}:${indexKey}`
  const CACHE_TTL_MS = 5000

  if (reindex) {
    const reindexedData = await loadIndexFromImages(
      client,
      bucket,
      folder,
      region
    )
    indexCache.put(cacheKey, reindexedData, CACHE_TTL_MS)
    await saveIndex(client, bucket, folder, reindexedData)
    return reindexedData
  }

  if (cached) {
    const cacheHit = indexCache.get(cacheKey)
    if (cacheHit) return cacheHit
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: indexKey,
    })
    const response = await client.send(command)
    const body = await streamToString(response.Body)
    const indexData = JSON.parse(body)

    if (!Array.isArray(indexData)) {
      throw new Error(`Invalid index format in ${indexKey}`)
    }

    indexCache.put(cacheKey, indexData, CACHE_TTL_MS)
    return indexData as Tag[]
  } catch (err: any) {
    if (err.name !== 'NoSuchKey') {
      console.warn(`Failed to load ${indexKey}:`, err)
    }

    // Fallback to rebuilding from images
    const fallbackData = await loadIndexFromImages(
      client,
      bucket,
      folder,
      region
    )
    indexCache.put(cacheKey, fallbackData, CACHE_TTL_MS)
    await saveIndex(client, bucket, folder, fallbackData)
    return fallbackData
  }
}

const loadIndexFromImages = async (
  client: S3Client,
  bucket: string,
  folder: string,
  region: string
): Promise<Tag[]> => {
  if (!region) {
    throw new Error('Missing or invalid region when calling loadIndex')
  }

  if (folder === 'queue') {
    return loadQueueTagsFromImages(client, bucket, folder, region)
  }

  const prefix = `${folder}/`
  const list = await listAllS3Objects(client, {
    Bucket: bucket,
    Prefix: prefix,
  })

  const imagesByTag: Record<string, { mystery?: any; found?: any }> = {}

  for (const item of list) {
    const key = item.Key
    if (
      !key ||
      !supportedImageExtensions.some((ext) => key.toLowerCase().endsWith(ext))
    ) {
      continue
    }

    // Ignore _medium and _small variants
    if (key.includes('_medium') || key.includes('_small')) {
      continue
    }

    const filename = key.replace(prefix, '').replace(/\.[^.]+$/, '')
    const [slug, suffix] = filename.split('--')
    const imageType = suffix === 'found' ? 'found' : 'mystery'

    try {
      const head = await client.send(
        new HeadObjectCommand({ Bucket: bucket, Key: key })
      )
      const metadata = head.Metadata || {}
      // TODO: Make URL construction configurable for different S3-compatible services
      const url = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`
      const metaImage = {
        url,
        title: decodeMetadataValue(metadata.title),
        description: decodeMetadataValue(metadata.description),
        data: getTagMetadata(metadata.data),
      }

      const entry = imagesByTag[slug] || {}
      entry[imageType] = metaImage
      imagesByTag[slug] = entry
    } catch (err) {
      console.error(`Failed to load metadata for ${key}:`, err)
    }
  }

  return Object.entries(imagesByTag).map(([slug, { mystery, found }]) => {
    const game = slug.split('-')[0]
    return getBikeTagFromS3ImageSet(mystery, found, { game })
  })
}

/** Writes the given tag array to index.json or deletes it if empty */
export const saveIndex = async (
  client: S3Client,
  bucket: string,
  folder: string,
  tags: Tag[],
  acl: ObjectCannedACL = 'public-read'
) => {
  const key = `${folder}/index.json`

  // if (tags.length === 0) {
  //   // Delete index.json if tags array is empty
  //   try {
  //     await client.send(
  //       new DeleteObjectCommand({
  //         Bucket: bucket,
  //         Key: key,
  //       })
  //     )
  //     console.log(
  //       `Deleted index.json from ${bucket}/${key} because tags array was empty.`
  //     )
  //   } catch (error) {
  //     console.error(`Failed to delete index from ${bucket}/${key}:`, error)
  //     throw error
  //   }
  //   return
  // }

  // Otherwise save the index.json
  try {
    if (typeof window === 'undefined') {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: JSON.stringify(tags),
          ContentType: 'application/json',
          ACL: acl,
          CacheControl: 'no-cache, no-store, must-revalidate',
        })
      )
    }
  } catch (error) {
    console.error(`Failed to save index to ${bucket}/${key}:`, error)
    throw error
  }
}

/**
 * Confirms if a given upload payload has the necessary properties for upload.
 */
export const isValidUploadTagImagePayload = (
  payload?: Partial<S3UploadPayload>
): payload is S3UploadPayload => {
  return !!(
    payload &&
    typeof payload.game === 'string' &&
    typeof payload.folder === 'string' &&
    typeof payload.tagnumber === 'number' &&
    typeof payload.image !== 'undefined'
  )
}

export const resizeAndSaveVariants = async ({
  client,
  tag,
  imageType,
  resizeHost,
  maxRetries = 2,
  folder = 'queue',
}: {
  client: S3Client
  tag: Tag
  imageType: 'mystery' | 'found'
  resizeHost?: string
  maxRetries?: number
  folder?: string
}): Promise<string> => {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const bucket = `${tag.game}-biketag`
  const url = imageType === 'mystery' ? tag.mysteryImageUrl : tag.foundImageUrl
  if (!url) throw new Error(`Missing ${imageType}ImageUrl for tag`)

  const match = url.match(/\/([^\/?#]+)$/)
  const originalFilename = match?.[1] ?? ''
  const filenameBase = originalFilename
    .replace(/\.\w+$/, '')
    .replace(/_(small|medium|original)$/, '')

  const baseKey = `${folder}/${filenameBase}`
  const resizeBackendBase = getApiUrl(resizeHost, 'resize')

  const transforms: Record<string, number> = {
    medium: 800,
    small: 300,
    original: 0,
    // original: 2400, // Optional large size for original replacement
  }

  let resizedOriginalUploaded = false

  const variantPromises = Object.entries(transforms).map(
    async ([variant, width]) => {
      const variantIsOriginal = variant === 'original'
      const suffix = variantIsOriginal ? '.webp' : `_${variant}.webp`
      const key = `${baseKey}${suffix}`

      try {
        await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
        return // Already exists; skip
      } catch (err: any) {
        if (err.$metadata?.httpStatusCode !== 404) {
          console.warn(`Unexpected error checking ${key}:`, err)
          return
        }
      }

      let attempt = 0
      let success = false

      while (attempt < maxRetries && !success) {
        try {
          const resizeUrl = `${resizeBackendBase}?url=${encodeURIComponent(url)}&format=webp${width ? `&width=${width}` : ''}`
          const res = await fetch(resizeUrl)
          if (!res.ok)
            throw new Error(`Resize backend failed: ${res.statusText}`)

          const arrayBuffer = await res.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          let Metadata

          if (variantIsOriginal) {
            // const title =
            //   imageType === 'mystery'
            //     ? getImgurMysteryTitleFromBikeTagData(tag)
            //     : getImgurFoundTitleFromBikeTagData(tag)
            // const description =
            //   imageType === 'mystery'
            //     ? getImgurMysteryDescriptionFromBikeTagData(tag)
            //     : getImgurFoundDescriptionFromBikeTagData(tag)
            Metadata = {
              // title: encodeMetadataValue(title.trim()),
              // description: encodeMetadataValue(description.trim()),
              data:
                imageType === 'mystery'
                  ? getMysteryMetadata(tag)
                  : getFoundMetadata(tag),
            }
          }

          await client.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: buffer,
              ContentType: 'image/webp',
              ACL: 'public-read',
              Metadata,
            })
          )

          success = true
          if (variant === 'original') resizedOriginalUploaded = true
        } catch (err) {
          attempt++
          if (attempt >= maxRetries) {
            console.error(
              `Failed to save ${variant} for ${filenameBase}: ${url}`,
              err
            )
          } else {
            await delay(500 * attempt)
          }
        }
      }
    }
  )

  await Promise.all(variantPromises)

  if (resizedOriginalUploaded) {
    try {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `${folder}/${filenameBase}`,
      })

      const nonWebp = (list || []).filter(
        (obj) => obj.Key && !obj.Key.endsWith('.webp')
      )

      await Promise.all(
        nonWebp.map(async (obj) => {
          try {
            await client.send(
              new DeleteObjectCommand({
                Bucket: bucket,
                Key: obj.Key,
              })
            )
          } catch (err) {
            console.error(
              `Failed to delete ${obj.Key} for ${filenameBase}:`,
              err
            )
          }
        })
      )
    } catch (err) {
      console.error(`Failed to list/delete originals for ${filenameBase}:`, err)
    }
  }

  return url.replace(/\.\w+$/, '.webp')
}

export const encodeMetadataValue = (value: string): string => {
  if (typeof window !== 'undefined' && typeof btoa !== 'undefined') {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(value)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  } else {
    return Buffer.from(value, 'utf-8').toString('base64')
  }
}

export const decodeMetadataValue = (value: string): string => {
  try {
    // Fail fast if not likely base64
    if (!value || !/^[A-Za-z0-9+/=]+$/.test(value)) return value

    if (typeof window !== 'undefined') {
      const binary = atob(value)
      const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)))
      return new TextDecoder().decode(bytes)
    } else {
      return Buffer.from(value, 'base64').toString('utf-8')
    }
  } catch {
    return value // fallback to raw input if decoding fails
  }
}

export const normalizeUploadBody = async (
  stream: string | Blob | ReadableStream | Uint8Array | Buffer | Readable | File
): Promise<Uint8Array | Buffer> => {
  if (!stream) throw new Error('No stream provided')

  // Handle string input
  if (typeof stream === 'string') {
    return new TextEncoder().encode(stream)
  }

  const isBlob = typeof Blob !== 'undefined' && stream instanceof Blob
  const isFile = typeof File !== 'undefined' && stream instanceof File

  if (typeof window !== 'undefined') {
    // --- BROWSER ENVIRONMENT ---
    if (isFile || isBlob) {
      const arrayBuffer = await (stream as Blob).arrayBuffer()
      return new Uint8Array(arrayBuffer)
    }

    if (stream instanceof ReadableStream) {
      const res = new Response(stream)
      const arrayBuffer = await res.arrayBuffer()
      return new Uint8Array(arrayBuffer)
    }

    if (stream instanceof Uint8Array) {
      return stream
    }

    throw new Error(
      `Unsupported input in browser: ${Object.prototype.toString.call(stream)}`
    )
  } else {
    // --- NODE ENVIRONMENT ---
    const isReadable =
      typeof stream === 'object' &&
      stream !== null &&
      typeof (stream as any).pipe === 'function'

    if (isReadable) {
      const chunks: any[] = []
      for await (const chunk of stream as AsyncIterable<any>) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      }
      return Buffer.concat(chunks)
    }

    if (stream instanceof Uint8Array || Buffer.isBuffer(stream)) {
      return stream
    }

    if (isBlob) {
      const arrayBuffer = await (stream as Blob).arrayBuffer()
      return Buffer.from(arrayBuffer)
    }

    throw new Error(
      `Unsupported input in Node: ${Object.prototype.toString.call(stream)}`
    )
  }
}

export const getGroupedTagsByPlayer = (
  groupedImages: S3ImageMeta[][] = [],
  appendToTagData = {},
  cache?: typeof TinyCache
) => {
  if (!groupedImages.length) return []

  const playerGroupedImages: Record<string, S3ImageMeta[]> = {}
  const playerGroupedTags: any[] = []

  // Determine the highest tagnumber (assumes array index = tagnumber)
  const highestTagnumber = groupedImages.reduce((max, group, index) => {
    return group?.length ? Math.max(max, index) : max
  }, 0)

  // Group player images from the current and previous round
  for (const image of groupedImages[highestTagnumber] ?? []) {
    const player = getPlayerGroupingKey(image, cache)
    if (!player) continue
    playerGroupedImages[player] = playerGroupedImages[player] ?? []
    playerGroupedImages[player].push(image)
  }

  for (const image of groupedImages[highestTagnumber - 1] ?? []) {
    const player = getPlayerGroupingKey(image, cache)
    if (!player) continue
    playerGroupedImages[player] = playerGroupedImages[player] ?? []
    playerGroupedImages[player].push(image)
  }

  // Generate merged tags
  for (const player of Object.keys(playerGroupedImages)) {
    const images = playerGroupedImages[player]

    if (images.length === 1) {
      playerGroupedTags.push(
        getBikeTagFromS3ImageSet(
          isMysteryImage(images[0]) ? images[0] : undefined,
          isFoundImage(images[0]) ? images[0] : undefined,
          appendToTagData
        )
      )
    } else if (images.length === 2) {
      const mysteryImage = images.find(isMysteryImage)
      const foundImage = images.find(isFoundImage)

      playerGroupedTags.push(
        getBikeTagFromS3ImageSet(mysteryImage, foundImage, appendToTagData)
      )
    } else {
      console.warn('Unexpected image count for player:', player, images)
    }
  }

  return playerGroupedTags
}

export const getGroupedImagesByTagnumber = (
  ungroupedImages: S3ImageMeta[] = [],
  cache?: typeof TinyCache
): S3ImageMeta[][] => {
  const groupedImages: S3ImageMeta[][] = []

  ungroupedImages.forEach((image) => {
    const tagnumbers = getTagNumbersFromText(
      image.description!,
      [image.data?.tagnumber!],
      cache
    )
    const tagnumber = tagnumbers[0] // Assume the first is primary

    if (typeof tagnumber === 'number') {
      groupedImages[tagnumber] = groupedImages[tagnumber] ?? []
      groupedImages[tagnumber].push(image)
    }
  })

  return groupedImages
}

export const getKeyFromUrl = (urlStr: string) => {
  try {
    const url = new URL(urlStr)
    return url.pathname.slice(1) // remove leading slash
  } catch {
    return ''
  }
}

export const moveImage = async (
  client: S3Client,
  bucket: string,
  sourceKey: string,
  destinationKey: string,
  moveVariants: boolean = true
): Promise<{ success: boolean; error?: string }> => {
  const variants = moveVariants ? ['', '_small', '_medium'] : ['']
  let allSuccess = true
  const errors: string[] = []

  // Extract basename and extension from sourceKey:
  const match = sourceKey.match(/^(.*?)(\.\w+)$/)
  const baseSource = match ? match[1] : sourceKey
  const extension = match ? match[2] : ''

  const matchDest = destinationKey.match(/^(.*?)(\.\w+)$/)
  const baseDest = matchDest ? matchDest[1] : destinationKey
  const extDest = matchDest ? matchDest[2] : ''

  for (const variant of variants) {
    const src = `${baseSource}${variant}${extension}`
    const dest = `${baseDest}${variant}${extDest}`

    try {
      await client.send(
        new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `${bucket}/${src}`,
          Key: dest,
          ACL: 'public-read',
          MetadataDirective: 'COPY',
        })
      )

      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: src,
        })
      )
    } catch (err: any) {
      allSuccess = false
      errors.push(`${variant || 'original'}: ${err.message || String(err)}`)
    }
  }

  return {
    success: allSuccess,
    error: allSuccess ? undefined : errors.join('; '),
  }
}

export const getHashedPlayerSuffix = async (
  playerId: string
): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(playerId)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 6)
}

export const getMysteryMetadata = (
  tag: Tag,
  metadataOverrides: Record<string, any> = {}
): string => {
  const base = {
    t: tag.tagnumber,
    p: tag.playerId,
    mp: tag.mysteryPlayer,
    mt: tag.mysteryTime,
    h: tag.hint,
    d: tag.discussionUrl,
    s: tag.shareUrl,
    m: tag.mentionUrl,
  }

  const merged = { ...base, ...metadataOverrides }
  return encodeMetadataValue(JSON.stringify(merged))
}

export const getFoundMetadata = (
  tag: Tag,
  metadataOverrides: Record<string, any> = {}
): string => {
  const base = {
    t: tag.tagnumber,
    p: tag.playerId,
    fp: tag.foundPlayer,
    ft: tag.foundTime,
    fl: tag.foundLocation,
    g: tag.gps,
    c: tag.confirmedBoundary,
  }

  const merged = { ...base, ...metadataOverrides }
  return encodeMetadataValue(JSON.stringify(merged))
}

export const getTagMetadata = (
  metadata: string | undefined,
  metadataOverrides: Record<string, any> = {}
): Tag => {
  const decodeJson = (meta?: string): Record<string, any> => {
    if (!meta) return {}
    try {
      return JSON.parse(decodeMetadataValue(meta)) || {}
    } catch {
      return {}
    }
  }

  const tag = decodeJson(metadata)
  const merged = {
    tagnumber: tag.t,
    playerId: tag.p,
    mysteryPlayer: tag.mp,
    mysteryTime: tag.mt,
    hint: tag.h,
    discussionUrl: tag.d,
    shareUrl: tag.s,
    mentionUrl: tag.m,
    foundPlayer: tag.fp,
    foundTime: tag.ft,
    foundLocation: tag.fl,
    gps: tag.g,
    confirmedBoundary: tag.c,
    ...metadataOverrides,
  }

  if (typeof merged.tagnumber !== 'number') {
    return null
  }

  return createTagObject(merged)
}

export const isMysteryImage = (image: S3ImageMeta): boolean => {
  if (image?.data) {
    return !!(
      image.data.mysteryPlayer ||
      image.data.mysteryTime ||
      image.data.hint
    )
  }
  return isImgurMysteryImage(image as ImgurImage)
}

export const isFoundImage = (image: S3ImageMeta): boolean => {
  if (image?.data) {
    return !!(
      image.data.foundPlayer ||
      image.data.foundTime ||
      image.data.foundLocation
    )
  }
  return isImugrFoundImage(image as ImgurImage)
}

export interface S3UploadPayload {
  region: string
  game: string // e.g., 'denver' — used to build bucket name
  folder: string // e.g., 'queue' — which folder to upload to
  tagnumber: number // used in key naming
  image: Buffer | Uint8Array | Blob | string | File // binary data or base64 string or remote URL
  filenameSuffix?: string // '--mystery' or '--found'
  contentType?: string // 'image/jpeg', 'image/png', etc.
  resize?: boolean // default true — whether to make small/medium versions
}
export type uploadTagImagePayload = Partial<Tag> &
  Partial<S3UploadPayload> &
  CommonPayloadData
export type queueTagPayload = Partial<Tag> &
  Partial<S3UploadPayload> &
  CommonPayloadData
export type updateTagPayload = Partial<Tag> &
  Partial<S3UploadPayload> &
  CommonPayloadData

export const supportedImageExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
]
