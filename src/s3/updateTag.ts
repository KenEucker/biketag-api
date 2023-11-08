import AWS from 'aws-sdk'
import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { getImageHashFromText } from '../common/getters'
import { createTagObject } from '../common/data'
import { getUpdateTagPayloadFromTagData, isValidUpdatePayload } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { Tag } from '../common/schema'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function updateTag(
  payload: updateTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const s3MysteryImagePayload = getUpdateTagPayloadFromTagData(payload, true)
  const s3FoundImagePayload = getUpdateTagPayloadFromTagData(payload)

  return new Promise(async (resolve) => {
    let success = true
    let error

    if (
      isValidUpdatePayload(s3MysteryImagePayload) &&
      isValidUpdatePayload(s3FoundImagePayload)
    ) {
      const tagExistsForBikeTagAlbum = await this.getTags(payload.tagnumber)
      const tagExists =
        tagExistsForBikeTagAlbum.success && tagExistsForBikeTagAlbum.data.length
      const existingTag = tagExists ? tagExistsForBikeTagAlbum.data[0] : null

      // Note: AWS S3 does not support updating an existing object. You can only create new objects or overwrite existing ones.
      // So, we will delete the existing image and upload a new one.

      if (existingTag?.mysteryImageUrl?.length) {
        const mysteryImageDeleted = await s3
          .deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: getImageHashFromText(existingTag.mysteryImageUrl),
          })
          .promise()

        if (mysteryImageDeleted) {
          const mysteryImageUploaded = await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: `${payload.queuehash}/${s3MysteryImagePayload.name}`,
              Body: s3MysteryImagePayload.image,
              ContentType: 'image/jpeg',
              ACL: 'public-read',
            })
            .promise()

          if (mysteryImageUploaded) {
            payload.mysteryImageUrl = mysteryImageUploaded.Location
          } else {
            success = false
            error = 'Failed to upload mystery image to S3'
          }
        } else {
          success = false
          error = 'Failed to delete existing mystery image from S3'
        }
      }

      if (existingTag?.foundImageUrl?.length) {
        const foundImageDeleted = await s3
          .deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: getImageHashFromText(existingTag.foundImageUrl),
          })
          .promise()

        if (foundImageDeleted) {
          const foundImageUploaded = await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: `${payload.queuehash}/${s3FoundImagePayload.name}`,
              Body: s3FoundImagePayload.image,
              ContentType: 'image/jpeg',
              ACL: 'public-read',
            })
            .promise()

          if (foundImageUploaded) {
            payload.foundImageUrl = foundImageUploaded.Location
          } else {
            success = false
            error = 'Failed to upload found image to S3'
          }
        } else {
          success = false
          error = 'Failed to delete existing found image from S3'
        }
      }
    } else {
      const errorMessage = 'at least one update payload is invalid'
      console.error(errorMessage, payload)
      error = errorMessage
    }

    resolve({
      data: createTagObject(payload),
      success,
      error,
      source: AvailableApis[AvailableApis.s3],
      status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
    })
  })
}
