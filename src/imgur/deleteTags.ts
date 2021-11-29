import ImgurClient from 'imgur'
import { deleteTagsPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { getImageHashFromImgurImage } from './helpers'
import { AvailableApis } from '../common/enums'

export async function deleteTag(
  client: ImgurClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<any>> {
  const responses = []
  const deleteHashes = []
  let tags = payload.tags

  if (!tags.length && (payload.tagnumbers || payload.slugs)) {
    tags = await this.getTags(payload.tagnumbers ?? payload.slugs)
  }
  for (const tag of tags) {
    if (tag.foundImageUrl) {
      deleteHashes.push(
        getImageHashFromImgurImage({ link: tag.foundImageUrl } as ImgurImage)
      )
    }
    if (tag.mysteryImageUrl) {
      deleteHashes.push(
        getImageHashFromImgurImage({ link: tag.mysteryImageUrl } as ImgurImage)
      )
    }
  }

  if (!deleteHashes.length) {
    throw new Error('Imgur delete hashes not set')
  }

  for (const hash of deleteHashes) {
    responses.push(await client.deleteImage(hash))
  }

  return {
    data: responses,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  } as BikeTagApiResponse<any>
}
