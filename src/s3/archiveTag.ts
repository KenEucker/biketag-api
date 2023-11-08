import AWS from 'aws-sdk'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { archiveTagPayload } from '../common/payloads'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import {
  getImgurFoundImageHashFromBikeTagData,
  getImgurMysteryImageHashFromBikeTagData,
  getOnlyFoundTagFromTagData,
} from '../common/getters'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function archiveTag(
  payload: archiveTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  let data
  let error
  let success = true

  if (payload.foundImageUrl?.length) {
    const foundImageHash = getImgurFoundImageHashFromBikeTagData(payload as Tag)

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: foundImageHash,
    }

    try {
      // Archive the image
      const archiveFoundImageResponse = await s3
        .upload({
          ...params,
          Body: payload.foundImageUrl,
        })
        .promise()

      // Delete the original image
      const deleteFoundImageResponse = await s3.deleteObject(params).promise()

      if (archiveFoundImageResponse && deleteFoundImageResponse) {
        payload.foundImageUrl = archiveFoundImageResponse.Location
      } else {
        throw new Error('Failed to archive or delete the image')
      }
    } catch (err) {
      success = false
      error = err.message
    }
  }

  // Similar logic for `mysteryImageUrl`...

  if (success) {
    data = getOnlyFoundTagFromTagData(payload as Tag)
  } else {
    data = null
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.s3],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.NoContent,
  }
}
