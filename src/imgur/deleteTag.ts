import ImgurClient from 'imgur'
import { deleteTagPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { AvailableApis, BikeTagApiResponse, ImgurImage } from '../common/types'
import { getImageHashFromImgurImage } from './helpers'

export async function deleteTag(
  client: ImgurClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<any>> {
  const responses = []
  const hashes = []

  if (payload.tagnumber || payload.slug) {
    const tag = await this.getTag(payload.tagnumber ?? payload.slug)
    if (tag.foundImageUrl) {
      hashes.push(
        getImageHashFromImgurImage({ link: tag.foundImageUrl } as ImgurImage)
      )
    }
    if (tag.mysteryImageUrl) {
      hashes.push(
        getImageHashFromImgurImage({ link: tag.mysteryImageUrl } as ImgurImage)
      )
    }
  }

  if (!hashes.length) {
    throw new Error('Imgur delete hashes not set')
  }

  for (const hash of hashes) {
    responses.push(await client.deleteImage(hash))
  }

  return {
    data: responses,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  } as BikeTagApiResponse<any>
}
