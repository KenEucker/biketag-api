import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fetchSignedUrlPayload } from '../common/payloads'

export const fetchSignedUrl = async (
  client: S3Client,
  payload: fetchSignedUrlPayload
) => {
  const command = new PutObjectCommand({
    Bucket: payload.bucket,
    Key: payload.key,
    ContentType: payload.contentType,
    ACL: 'public-read',
  })

  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: payload.expiresIn ?? 60,
  })

  return {
    signedUrl,
    key: payload.key,
  }
}
