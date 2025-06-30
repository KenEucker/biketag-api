import {
  S3Client,
  CopyObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { archiveTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getOnlyFoundTagFromTagData } from '../common/getters'
import { getTagPrefix, listAllS3Objects, loadIndex, saveIndex } from './helpers'

export async function archiveTag(
  client: S3Client,
  payload: archiveTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const bucket = `${payload.game}-biketag`
  const folderFrom = 'queue'
  const folderTo = 'archive'

  const prefix = getTagPrefix(folderFrom, payload.game, payload.tagnumber)
  const list = await listAllS3Objects(client, {
    Bucket: bucket,
    Prefix: prefix,
  })

  let success = true
  let error = ''
  let data: Tag | null = null

  const copyOps = []
  const deleteOps = []

  try {
    for (const obj of list) {
      const keyFrom = obj.Key
      const keyTo = keyFrom.replace(
        new RegExp(`^${folderFrom}/`),
        `${folderTo}/`
      )
      copyOps.push(
        client.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${keyFrom}`,
            Key: keyTo,
            ACL: 'public-read',
          })
        )
      )
      deleteOps.push(
        client.send(new DeleteObjectCommand({ Bucket: bucket, Key: keyFrom }))
      )
    }

    await Promise.all(copyOps)
    await Promise.all(deleteOps)

    const queueIndex = await loadIndex(
      client,
      bucket,
      folderFrom,
      payload.region
    )
    const archiveIndex = await loadIndex(
      client,
      bucket,
      folderTo,
      payload.region
    )

    const tagToMove = queueIndex.find((t) => t.tagnumber === payload.tagnumber)
    const updatedQueue = queueIndex.filter(
      (t) => t.tagnumber !== payload.tagnumber
    )
    const updatedArchive = tagToMove
      ? [...archiveIndex, tagToMove]
      : archiveIndex

    await Promise.all([
      saveIndex(client, bucket, folderFrom, updatedQueue),
      saveIndex(client, bucket, folderTo, updatedArchive),
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
