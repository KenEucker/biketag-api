import { SanityClient } from '@sanity/client'
import { constructSanityObjectFromTag } from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'
import { updateTagPayload } from '../common/payloads'

function isValidUpdatePayload(utp: updateTagPayload) {
  return (
    typeof utp._id === 'string' &&
    typeof utp._type === 'string' &&
    typeof utp.slug === 'string'
  )
}

export async function updateTag(
  client: SanityClient,
  payload: updateTagPayload | updateTagPayload[]
): Promise<BikeTagApiResponse<any> | BikeTagApiResponse<any>[]> {
  const updatePayloads = Array.isArray(payload) ? payload : [payload]
  const successPayloads = []

  for (let updatePayload of updatePayloads) {
    if (!isValidUpdatePayload(updatePayload)) {
      updatePayload = await constructSanityObjectFromTag(client, updatePayload)
    }

    successPayloads.push(await client.createOrReplace(updatePayload))
  }

  return {
    success: true,
    status: HttpStatusCode.Ok,
    source: AvailableApis[AvailableApis.sanity],
    data: successPayloads,
  }
}
