import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fetchSignedUrlPayload } from '../common/payloads'
import { HttpStatusCode } from 'axios'
import { AvailableApis } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'

/**
 * Generates a pre-signed URL for uploading an object to an AWS S3 bucket.
 *
 * @param payload - Contains the target bucket, object key, content type, and optional expiration time for the signed URL.
 * @returns An object indicating success or failure, the signed URL if successful, and error details if not.
 */
export async function fetchSignedUrl(
  client: S3Client,
  payload: fetchSignedUrlPayload
): Promise<BikeTagApiResponse<string>> {
  let data, error, success

  try {
    const command = new PutObjectCommand({
      Bucket: payload.bucket,
      Key: payload.key,
      ContentType: payload.contentType,
      ACL: 'public-read',
    })

    const signedUrl = await getSignedUrl(client, command, {
      expiresIn: payload.expiresIn ?? 60,
    })

    success = true
    data = signedUrl
  } catch (err) {
    success = false
    error = `fetchSignedUrl failed (${payload.bucket}/${payload.key}): ${
      err instanceof Error ? err.message : String(err)
    }`
  }

  return {
    data,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
