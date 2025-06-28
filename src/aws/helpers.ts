import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { Tag } from '../common/schema'

/** Returns the S3 key prefix for a given tag */
export function getTagPrefix(
  folder: string,
  game: string,
  tagnumber: number
): string {
  return `${folder}/${game}-tag-${tagnumber}`
}

/** Returns the path to the index.json file for a folder */
export function indexKey(folder: string): string {
  return `${folder}/index.json`
}

/** Loads the index.json file and returns parsed tag array */
export async function loadIndex(
  client: S3Client,
  bucket: string,
  key: string
): Promise<Tag[]> {
  try {
    const obj = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )
    const chunks: any[] = []
    for await (const chunk of obj.Body as any) chunks.push(chunk)
    const raw = Buffer.concat(chunks).toString('utf-8')
    return JSON.parse(raw) as Tag[]
  } catch (err: any) {
    if (err.name === 'NoSuchKey') return []
    throw err
  }
}

/** Writes the given tag array to index.json */
export async function saveIndex(
  client: S3Client,
  bucket: string,
  key: string,
  tags: Tag[]
) {
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
export function getQueueTagImagePayloadFromTagData(
  tag: uploadTagImagePayload,
  isMystery = false
): S3UploadPayload {
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
export function isValidUploadTagImagePayload(
  payload?: Partial<S3UploadPayload>
): payload is S3UploadPayload {
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
export function getUpdateTagPayloadFromTagData(
  tag: Partial<Tag>,
  isMystery = false
): uploadTagImagePayload {
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

export function getUploadTagImagePayloadFromTagData(
  payload: uploadTagImagePayload,
  isMystery = false
): S3UploadPayload | null {
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

export async function uploadImageAndResize(
  client: S3Client,
  payload: S3UploadPayload,
  resize = true
): Promise<{ url: string } | null> {
  const {
    image,
    folder,
    awsRegion,
    game,
    tagnumber,
    filenameSuffix,
    contentType,
  } = payload
  const tagPrefix = getTagPrefix(folder, game, tagnumber)
  const keyBase = `${tagPrefix}${filenameSuffix ?? ''}`
  const bucket = `${game}-biketag`
  const key = `${keyBase}.webp`

  let imageBuffer = image
  if (resize) {
    try {
      imageBuffer = await resizeImageViaImageKit(imageBuffer)
    } catch (err) {
      console.warn(
        'ImageKit resize failed, falling back to original image.',
        err
      )
    }
  }

  try {
    const putCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: imageBuffer,
      ContentType: contentType,
      ACL: 'public-read',
    })

    await client.send(putCommand)
    return {
      url: `https://${bucket}.${awsRegion}.digitaloceanspaces.com/${key}`,
    }
  } catch (err) {
    console.error('S3 upload failed:', err)
    return null
  }
}

export async function resizeImageViaImageKit(
  buffer: Buffer | Uint8Array | string | Blob
): Promise<Buffer | Uint8Array | string | Blob> {
  // Placeholder: actual implementation here
  return buffer
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
