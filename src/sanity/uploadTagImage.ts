import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { uploadTagImagePayload } from '../common/payloads'
import { constructSanityObjectFromTag } from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'

export async function uploadTagImage(
  client: SanityClient,
  payload: uploadTagImagePayload | uploadTagImagePayload[]
): Promise<BikeTagApiResponse<any> | BikeTagApiResponse<any>[]> {
  const uploadPayloads = Array.isArray(payload) ? payload : [payload]
  const uploadResponses = []

  for (const uploadPayload of uploadPayloads) {
    const uploadResponse = await client.assets.upload(
      'image',
      uploadPayload.stream as any
    )
    const updateTag = {
      tagnumber: uploadPayload.tagnumber,
      slug: uploadPayload.slug,
    } as Tag
    switch (uploadPayload.type) {
      case 'mystery':
        updateTag.mysteryImage = uploadResponse._id
        break

      case 'found':
        updateTag.foundImage = uploadResponse._id
        break
    }

    const updatePayload = await constructSanityObjectFromTag(client, updateTag)
    uploadResponses.push({ ...uploadResponse, updated: updatePayload })
  }

  return {
    success: true,
    status: HttpStatusCode.Created,
    source: AvailableApis[AvailableApis.sanity],
    data: uploadResponses,
  }
}
