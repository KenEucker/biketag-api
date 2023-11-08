import AWS from 'aws-sdk'
import { deleteTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function deleteTags(
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<boolean[]>> {
  const responses: boolean[] = []
  const deleteKeys = []
  let tags = payload.tags ?? []

  if (!tags.length && (payload.tagnumbers || payload.slugs)) {
    const { data: tagsData } = await this.getTags(
      payload.tagnumbers ?? payload.slugs
    )
    tags = tagsData?.length ? tagsData : []
  }
  for (const tag of tags) {
    if (tag.foundImageUrl) {
      deleteKeys.push(tag.foundImageUrl)
    }
    if (tag.mysteryImageUrl) {
      deleteKeys.push(tag.mysteryImageUrl)
    }
  }

  if (!deleteKeys.length) {
    throw new Error('S3 delete keys not set')
  }

  for (const key of deleteKeys) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    }

    const response = await s3.deleteObject(params).promise()
    responses.push(!!response)
  }

  return {
    data: responses,
    success: true,
    source: AvailableApis[AvailableApis.s3],
    status: HttpStatusCode.Ok,
  }
}
