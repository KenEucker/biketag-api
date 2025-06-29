import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { Tag } from '../common/schema'
import { Readable } from 'form-data'
import {
  getImgurMysteryTitleFromBikeTagData,
  getImgurFoundTitleFromBikeTagData,
  getImgurMysteryDescriptionFromBikeTagData,
  getImgurFoundDescriptionFromBikeTagData,
} from '../common/getters'

/** Returns the S3 key prefix for a given tag */
export const getTagPrefix = (
  folder: string,
  game: string,
  tagnumber: number
): string => {
  return `${folder}/${game}-tag-${tagnumber}`
}

/** Returns the path to the index.json file for a folder */
export const indexKey = (folder: string): string => {
  return `${folder}/index.json`
}

/** Loads the index.json file and returns parsed tag array */
export const loadIndex = async (
  client: S3Client,
  bucket: string,
  key: string
): Promise<Tag[]> => {
  try {
    const obj = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )
    /// This code is all wrong, it should be pulling tag data from metadata of the file, title and description
    const raw = await obj.Body?.transformToString('utf-8')
    return JSON.parse(raw) as Tag[]
  } catch (err: any) {
    if (err.name === 'NoSuchKey') return []
    throw err
  }
}

/** Writes the given tag array to index.json */
export const saveIndex = async (
  client: S3Client,
  bucket: string,
  key: string,
  tags: Tag[]
) => {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(tags),
      ContentType: 'application/json',
      ACL: 'public-read',
    })
  )
}

/**
 * Builds a valid S3UploadPayload for either mystery or found image based on Tag data.
 */
export const getQueueTagImagePayloadFromTagData = (
  tag: uploadTagImagePayload,
  isMystery = false
): S3UploadPayload => {
  return {
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
  const awsRegion = payload.awsRegion
  const folder = payload.folder
  const resize = payload.resize ?? true
  const contentType = payload.contentType ?? 'image/webp'
  const filenameSuffix = isMystery ? '--mystery' : '--found'

  if (!imageFile || !game || !tagnumber || !awsRegion || !folder) return null

  return {
    image: imageFile,
    awsRegion,
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
    } catch {}

    let attempt = 0
    let success = false

    while (attempt < maxRetries && !success) {
      try {
        const res = await fetch(url)
        if (!res.ok)
          throw new Error(`Failed to fetch ${variant} variant from ImageKit`)

        const stream = Readable.from(res.body as any)
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: stream,
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
      const list = await client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: `queue/${filename}`,
        })
      )

      const nonWebp = (list.Contents || []).filter(
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
  game: string // e.g., 'denver' — used to build bucket name
  folder: string // e.g., 'queue' — which folder to upload to
  tagnumber: number // used in key naming
  filenameSuffix?: string // '--mystery' or '--found'
  image: Buffer | Uint8Array | Blob | string // binary data or base64 string or remote URL
  contentType?: string // 'image/jpeg', 'image/png', etc.
  resize?: boolean // default true — whether to make small/medium versions
  awsRegion?: string
}
export type uploadTagImagePayload = Partial<Tag> & Partial<S3UploadPayload>
export type queueTagPayload = Partial<Tag> & Partial<S3UploadPayload>
