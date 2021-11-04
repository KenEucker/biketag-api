import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
export interface SanityUploadPayload {
  _id: string
  _type: string
  slug: string
}
export type UpdateTagPayload = Partial<TagData> & SanityUploadPayload

function isValidUpdatePayload(utp: UpdateTagPayload) {
  return (
    typeof utp._id === 'string' &&
    typeof utp._type === 'string' &&
    typeof utp.slug === 'string'
  )
}

export async function updateTag(
  client: SanityClient,
  payload: UpdateTagPayload | UpdateTagPayload[]
): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  const updatePayloads = Array.isArray(payload) ? payload : [payload]

  const successfulUpdatePromises = []

  updatePayloads.forEach((updatePayload) => {
    if (!isValidUpdatePayload(updatePayload)) {
      updatePayload._type = 'tag'
      updatePayload._id =
        updatePayload._id ?? `${updatePayload.game}-${updatePayload.slug}`
    }

    successfulUpdatePromises.push(client.createOrReplace(updatePayload))
  })

  await Promise.all(successfulUpdatePromises).then((success) => {
    console.log({ successfulUpdatePromises, success })
  })

  return [
    {
      success: true,
      status: 1,
      source: 'sanity',
      data: true,
    },
  ]
}
