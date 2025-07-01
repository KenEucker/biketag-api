import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fetchSignedUrlPayload } from '../common/payloads'
import { HttpStatusCode } from 'axios'
import { AvailableApis } from '../common/enums'

export const fetchSignedUrl = async (
  client: S3Client,
  payload: fetchSignedUrlPayload
) => {
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
  } catch (error) {
    success = false
    error = `fetchSignedUrl failed (${payload.bucket}/${payload.key}): ${
      error instanceof Error ? error.message : String(error)
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
