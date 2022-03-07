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
  const hasImageUrls = payload.foundImageUrl || payload.mysteryImageUrl
  let tag = payload

  if (!hasImageUrls && (payload.tagnumber || payload.slug)) {
    tag = await this.getTags(payload.tagnumber ?? payload.slug)
  }

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

  if (!hashes.length) {
    throw new Error('imgur delete hashes not set')
  }

  for (const hash of hashes) {
    responses.push((await client.deleteImage(hash)).data)
  }

  return {
    data: responses,
    success: responses.reduce((o, r) => {
      return o && (typeof r === 'boolean') && !!r
    }, true),
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
