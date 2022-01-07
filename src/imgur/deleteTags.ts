import ImgurClient from 'imgur'
import { deleteTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { getImageHashFromImgurImage } from './helpers'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function deleteTags(
  client: ImgurClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<boolean[]>> {
  const responses: boolean[] = []
  const deleteHashes = []
  let tags = payload.tags ?? []

  if (!tags.length && (payload.tagnumbers || payload.slugs)) {
    const { data: tagsData } = await this.getTags(
      payload.tagnumbers ?? payload.slugs
    )
    tags = tagsData?.length ? tagsData : []
  }
  for (const tag of tags) {
    if (tag.foundImageUrl) {
      deleteHashes.push(getImageHashFromImgurImage({ link: tag.foundImageUrl }))
    }
    if (tag.mysteryImageUrl) {
      deleteHashes.push(
        getImageHashFromImgurImage({ link: tag.mysteryImageUrl })
      )
    }
  }

  if (!deleteHashes.length) {
    return {
      data: [],
      success: false,
      source: AvailableApis[AvailableApis.imgur],
      status: HttpStatusCode.Ok,
    }
  }

  for (const hash of deleteHashes) {
    responses.push((await client.deleteImage(hash)).data)
  }

  return {
    data: responses,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
