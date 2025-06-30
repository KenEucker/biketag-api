import {
  S3Client,
  GetObjectCommand,
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
} from '../common/getters'

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
        title: metadata.title,
        description: metadata.description,
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
}: {
  client: S3Client
  tag: Tag
  imageType: 'mystery' | 'found'
  maxRetries?: number
}): Promise<void> => {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const filename = `${tag.slug}--${imageType}`
  const inputUrl =
    imageType === 'mystery' ? tag.mysteryImageUrl : tag.foundImageUrl
  if (!inputUrl)
    throw new Error(`Missing ${imageType}ImageUrl for tag ${tag.slug}`)

  const transforms = {
    original: `${inputUrl}?tr=f-webp`,
    medium: `${inputUrl}?tr=w-800,f-webp`,
    small: `${inputUrl}?tr=w-300,f-webp`,
  }

  const title =
    imageType === 'mystery'
      ? getImgurMysteryTitleFromBikeTagData(tag)
      : getImgurFoundTitleFromBikeTagData(tag)

  const description =
    imageType === 'mystery'
      ? getImgurMysteryDescriptionFromBikeTagData(tag)
      : getImgurFoundDescriptionFromBikeTagData(tag)

  const baseKey = `queue/${filename}`
  const bucket = `${tag.game}-biketag`

  let originalUploaded = false

  for (const [variant, url] of Object.entries(transforms)) {
    const suffix = variant === 'original' ? '.webp' : `--${variant}.webp`
    const key = `${baseKey}${suffix}`

    try {
      await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      continue // Skip if already exists
    } catch (err: any) {
      // Object doesn't exist, proceed with upload
      if (err.name !== 'NoSuchKey') {
        console.warn(`Unexpected error checking existence of ${key}:`, err)
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
            Body: blob,
            ContentType: 'image/webp',
            ACL: 'public-read',
            Metadata: {
              title: title.trim(),
              description: description.trim(),
            },
          })
        )
        success = true
        if (variant === 'original') originalUploaded = true
      } catch (err) {
        attempt++
        if (attempt >= maxRetries) {
          console.error(`Failed to save ${variant} for tag ${tag.slug}:`, err)
        } else {
          await delay(500 * attempt)
        }
      }
    }
  }

  // Remove any non-webp original image if resized image was saved
  if (originalUploaded) {
    try {
      const list = await listAllS3Objects(client, {
        Bucket: bucket,
        Prefix: `queue/${filename}`,
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
          console.error(
            `Failed to delete original image ${obj.Key} for tag ${tag.slug}:`,
            err
          )
        }
      }
    } catch (err) {
      console.error(
        `Failed to list objects for cleanup for tag ${tag.slug}:`,
        err
      )
    }
  }
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
