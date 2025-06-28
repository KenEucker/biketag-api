import {
  S3Client,
  ListObjectsV2Command,
  CopyObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { archiveTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getOnlyFoundTagFromTagData } from '../common/getters'
import { getTagPrefix, indexKey, loadIndex, saveIndex } from './helpers'

export async function archiveTag(
  client: S3Client,
  payload: archiveTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const bucket = `${payload.game}-biketag`
  const folderFrom = 'queue'
  const folderTo = 'archive'

  const prefix = getTagPrefix(folderFrom, payload.game, payload.tagnumber)
  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    })
  )

  let success = true
  let error = ''
  let data: Tag | null = null

  const copyOps = []
  const deleteOps = []

  try {
    for (const obj of list.Contents || []) {
      const keyFrom = obj.Key
      const keyTo = keyFrom.replace(/^queue\//, 'archive/')
      copyOps.push(
        s3.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${keyFrom}`,
            Key: keyTo,
            ACL: 'public-read',
          })
        )
      )
      deleteOps.push(
        s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: keyFrom }))
      )
    }

    await Promise.all(copyOps)
    await Promise.all(deleteOps)

    const queueIndexKey = indexKey(folderFrom)
    const archiveIndexKey = indexKey(folderTo)

    const queueIndex = await loadIndex(s3, bucket, queueIndexKey)
    const archiveIndex = await loadIndex(s3, bucket, archiveIndexKey)

    const tagToMove = queueIndex.find((t) => t.tagnumber === payload.tagnumber)
    const updatedQueue = queueIndex.filter(
      (t) => t.tagnumber !== payload.tagnumber
    )
    const updatedArchive = tagToMove
      ? [...archiveIndex, tagToMove]
      : archiveIndex

    await Promise.all([
      saveIndex(s3, bucket, queueIndexKey, updatedQueue),
      saveIndex(s3, bucket, archiveIndexKey, updatedArchive),
    ])

    data = tagToMove ? getOnlyFoundTagFromTagData(tagToMove) : null
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.NoContent,
  }
}
