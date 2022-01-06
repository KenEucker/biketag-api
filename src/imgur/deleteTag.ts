import ImgurClient from 'imgur'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse, ImgurImage } from '../common/types'
import { getImageHashFromImgurImage } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function deleteTag(
  client: ImgurClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<boolean[]>> {
  const responses: boolean[] = []
  const hashes = []

  if (payload.tagnumber || payload.slug) {
    const { success, data: tag } = await this.getTags(
      payload.tagnumber ?? payload.slug
    )
    if (success) {
      if (tag.foundImageUrl) {
        hashes.push(getImageHashFromImgurImage({ link: tag.foundImageUrl }))
      }
      if (tag.mysteryImageUrl) {
        hashes.push(
          getImageHashFromImgurImage({
            link: tag.mysteryImageUrl,
          })
        )
      }
    }
  }

  if (!hashes.length) {
    throw new Error('imgur delete hashes not set')
  }

  for (const hash of hashes) {
    responses.push((await client.deleteImage(hash)).data)
  }

  return {
    data: responses,
    success: hashes.length !== 0,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
