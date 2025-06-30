import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ObjectCannedACL,
  _Object,
  ListObjectsV2CommandInput,
} from '@aws-sdk/client-s3'
import { Tag } from '../common/schema'
import {
  getImgurMysteryTitleFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
  getBikeTagFromS3ImageSet,
  getPlayerFromText,
  getTagNumbersFromText,
} from '../common/getters'
import { Readable } from 'form-data'
import { TextEncoder, TextDecoder } from 'util'
import { S3ImageMeta } from '../common/types'

/** Returns the S3 key prefix for a given tag */
export const getTagPrefix = (
  folder: string,
  game: string,
  tagnumber: number
): string => {
  return `${folder}/${game}-tag-${tagnumber}`
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

/** Loads the index.json file and returns parsed tag array */
export const loadIndex = async (
  client: S3Client,
  bucket: string,
  folder: string,
  region: string
): Promise<Tag[]> => {
  const prefix = `${folder}/`
  const list = await listAllS3Objects(client, {
    Bucket: bucket,
    Prefix: prefix,
  })

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const imagesByTag: Record<string, { mystery?: any; found?: any }> = {}

  for (const item of list) {
    const key = item.Key
    if (!key || !imageExtensions.some((ext) => key.toLowerCase().endsWith(ext)))
      continue

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

/** Writes the given tag array to index.json */
export const saveIndex = async (
  client: S3Client,
  bucket: string,
  folder: string,
  tags: Tag[],
  acl: ObjectCannedACL = 'public-read'
) => {
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${folder}/index.json`,
        Body: JSON.stringify(tags),
        ContentType: 'application/json',
        ACL: acl,
      })
    )
  } catch (error) {
    console.error(`Failed to save index to ${bucket}/${folder}:`, error)
    throw error
  }
}

/**
 * Builds a valid S3UploadPayload for either mystery or found image based on Tag data.
 */
export const getQueueTagImagePayloadFromTagData = (
  tag: uploadTagImagePayload,
  region: string,
  isMystery = false
): S3UploadPayload => {
  return {
    region,
    game: tag.game,
    folder: 'queue',
    tagnumber: tag.tagnumber,
    filenameSuffix: isMystery ? 'mystery' : 'found',
    image: isMystery ? tag.mysteryImage : tag.foundImage,
    contentType: 'image/jpeg',
    resize: tag.resize !== false,
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

/**
 * Builds a lightweight update payload from a Tag for use with updateTag.
 */
export const getUpdateTagPayloadFromTagData = (
  tag: Partial<Tag>,
  isMystery = false
): uploadTagImagePayload => {
  const payload: uploadTagImagePayload = {
    game: tag.game,
    folder: 'main',
    tagnumber: tag.tagnumber,
  }

  if (isMystery) {
    payload.mysteryImageUrl = tag.mysteryImageUrl
    payload.mysteryPlayer = tag.mysteryPlayer
    payload.hint = tag.hint
    payload.gps = tag.gps
  } else {
    payload.foundImageUrl = tag.foundImageUrl
    payload.foundPlayer = tag.foundPlayer
    payload.foundLocation = tag.foundLocation
  }

  return payload
}

export const getUploadTagImagePayloadFromTagData = (
  payload: uploadTagImagePayload,
  isMystery = false
): S3UploadPayload | null => {
  const imageFile = isMystery ? payload.mysteryImage : payload.foundImage
  const game = payload.game
  const tagnumber = payload.tagnumber
  const region = payload.region
  const folder = payload.folder
  const resize = payload.resize ?? true
  const contentType = payload.contentType ?? 'image/webp'
  const filenameSuffix = isMystery ? '--mystery' : '--found'

  if (!imageFile || !game || !tagnumber || !region || !folder) return null

  return {
    image: imageFile,
    region,
    game,
    folder,
    tagnumber,
    filenameSuffix,
    resize,
    contentType,
  }
}

export const resizeAndSaveVariants = async ({
  client,
  tag,
  imageType,
  maxRetries = 3,
  folder = 'queue',
}: {
  client: S3Client
  tag: Tag
  imageType: 'mystery' | 'found'
  maxRetries?: number
  folder?: string
}): Promise<string> => {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const bucket = `${tag.game}-biketag`
  const url = imageType === 'mystery' ? tag.mysteryImageUrl : tag.foundImageUrl
  if (!url) throw new Error(`Missing ${imageType}ImageUrl for tag`)

  const match = url.match(/\/([^\/?#]+)$/)
  if (!match) throw new Error(`Could not extract filename from URL: ${url}`)

  const originalFilename = match[1] // e.g. denver-tag-369--found.jpg
  const filenameBase = originalFilename.replace(/\.\w+$/, '') // strip extension
  const originalExt = originalFilename.split('.').pop()?.toLowerCase() || 'jpg'
  const baseKey = `${folder}/${filenameBase}`
  const imagekitBase = 'https://ik.imagekit.io/biketag'
  const imagekitPath = originalFilename.replace(/^.*?\//, '') // remove any folders

  const transforms: Record<string, string> = {
    medium: `${imagekitBase}/tr:w-800,f-webp/${imagekitPath}`,
    small: `${imagekitBase}/tr:w-300,f-webp/${imagekitPath}`,
  }

  if (originalExt !== 'webp') {
    transforms.original = `${imagekitBase}/tr:f-webp/${imagekitPath}`
  }

  const title =
    imageType === 'mystery'
      ? getImgurMysteryTitleFromBikeTagData(tag)
      : getImgurFoundTitleFromBikeTagData(tag)

  const description =
    imageType === 'mystery'
      ? getImgurMysteryDescriptionFromBikeTagData(tag)
      : getImgurFoundDescriptionFromBikeTagData(tag)

  let resizedOriginalUploaded = false

  for (const [variant, url] of Object.entries(transforms)) {
    const suffix = variant === 'original' ? '.webp' : `--${variant}.webp`
    const key = `${baseKey}${suffix}`

    try {
      await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      continue // already exists
    } catch (err: any) {
      const isNotFound =
        err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404
      if (!isNotFound) {
        console.warn(`Unexpected error checking ${key}:`, err)
      }
    }

    let attempt = 0
    let success = false

    while (attempt < maxRetries && !success) {
      try {
        const res = await fetch(url)
        if (!res.ok)
          throw new Error(`Failed to fetch ${variant} variant from ImageKit`)

        const blob = await res.blob()
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: await normalizeUploadBody(blob),
            ContentType: 'image/webp',
            ACL: 'public-read',
            Metadata: {
              title: encodeMetadataValue(title.trim()),
              description: encodeMetadataValue(description.trim()),
            },
          })
        )
        success = true
        if (variant === 'original') {
          resizedOriginalUploaded = true
        }
      } catch (err) {
        attempt++
        if (attempt >= maxRetries) {
          console.error(`Failed to save ${variant} for ${filenameBase}:`, err)
        } else {
          await delay(500 * attempt)
        }
      }
    }
  }

  // Delete old original (non-webp) only if we just replaced it with a webp
  if (resizedOriginalUploaded) {
    try {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `${folder}/${filenameBase}`,
      })

      const nonWebp = (list || []).filter(
        (obj) => obj.Key && !obj.Key.endsWith('.webp')
      )

      for (const obj of nonWebp) {
        try {
          await client.send(
            new DeleteObjectCommand({
              Bucket: bucket,
              Key: obj.Key,
            })
          )
        } catch (err) {
          console.error(`Failed to delete ${obj.Key} for ${filenameBase}:`, err)
        }
      }
    } catch (err) {
      console.error(`Failed to list/delete originals for ${filenameBase}:`, err)
    }
  }

  // Return updated .webp URL using original base path
  return url.replace(/\.\w+$/, '.webp')
}

export const encodeMetadataValue = (value: string): string => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return btoa(String.fromCharCode(...bytes))
}

export const decodeMetadataValue = (value: string): string => {
  try {
    // Fail fast if not likely base64
    if (!value || !/^[A-Za-z0-9+/=]+$/.test(value)) return value

    const binary = atob(value)
    const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)))
    return new TextDecoder().decode(bytes)
  } catch {
    return value // fallback to raw input if decoding fails
  }
}

export const normalizeUploadBody = async (
  stream: string | Blob | ReadableStream | Uint8Array | Buffer | Readable
): Promise<Uint8Array | Buffer> => {
  if (!stream) throw new Error('No stream provided')

  if (typeof stream === 'string') {
    return new TextEncoder().encode(stream)
  }

  const isBlob =
    typeof Blob !== 'undefined' &&
    (stream instanceof Blob ||
      Object.prototype.toString.call(stream) === '[object Blob]')

  if (typeof window !== 'undefined') {
    // --- BROWSER ENVIRONMENT ---
    if (stream instanceof Blob) {
      const arrayBuffer = await stream.arrayBuffer()
      return new Uint8Array(arrayBuffer)
    }

    if (stream instanceof ReadableStream) {
      const res = new Response(stream)
      const arrayBuffer = await res.arrayBuffer()
      return new Uint8Array(arrayBuffer)
    }

    throw new Error('Unsupported input in browser')
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

    throw new Error('Unsupported input in Node')
  }
}

export const getGroupedTagsByPlayer = (
  groupedImages: S3ImageMeta[][] = [],
  appendToTagData = {}
) => {
  if (!groupedImages.length) return []

  const playerGroupedImages: Tag[] = []
  const playerGroupedTags: any[] = []

  // Determine the highest tagnumber (assumes array index = tagnumber)
  const highestTagnumber = groupedImages.reduce((max, group, index) => {
    return group && group.length ? Math.max(max, index) : max
  }, 0)

  // Group player images from the current and previous round
  for (const image of groupedImages[highestTagnumber] ?? []) {
    const player = getPlayerFromText(image.description)
    if (!player) continue
    playerGroupedImages[player] = playerGroupedImages[player] ?? []
    playerGroupedImages[player].push(image)
  }

  for (const image of groupedImages[highestTagnumber - 1] ?? []) {
    const player = getPlayerFromText(image.description)
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
          images[0].description.includes('tag') ? images[0] : undefined,
          images[0].description.includes('proof found') ? images[0] : undefined,
          appendToTagData
        )
      )
    } else if (images.length === 2) {
      const mysteryImage = images.find((img) => img.description.includes('tag'))
      const foundImage = images.find((img) =>
        img.description.includes('proof found')
      )

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
  ungroupedImages: S3ImageMeta[] = []
): S3ImageMeta[][] => {
  const groupedImages: S3ImageMeta[][] = []

  ungroupedImages.forEach((image) => {
    const tagnumbers = getTagNumbersFromText(image.description)
    const tagnumber = tagnumbers[0] // Assume the first is primary

    if (typeof tagnumber === 'number') {
      groupedImages[tagnumber] = groupedImages[tagnumber] ?? []
      groupedImages[tagnumber].push(image)
    }
  })

  return groupedImages
}

export interface S3UploadPayload {
  region: string
  game: string // e.g., 'denver' — used to build bucket name
  folder: string // e.g., 'queue' — which folder to upload to
  tagnumber: number // used in key naming
  image: Buffer | Uint8Array | Blob | string // binary data or base64 string or remote URL
  filenameSuffix?: string // '--mystery' or '--found'
  contentType?: string // 'image/jpeg', 'image/png', etc.
  resize?: boolean // default true — whether to make small/medium versions
}
export type uploadTagImagePayload = Partial<Tag> & Partial<S3UploadPayload>
export type queueTagPayload = Partial<Tag> & Partial<S3UploadPayload>
