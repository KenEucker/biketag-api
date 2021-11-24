import { SanityClient } from '@sanity/client'
import { deleteTagPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { AvailableApis, BikeTagApiResponse } from '../common/types'

export async function deleteTag(
  client: SanityClient,
  payload: deleteTagPayload
): Promise<BikeTagApiResponse<any>> {
  if (!payload.slug?.length) {
    if (payload.tagnumber) {
      payload.slug = `${payload.game}-tag-${payload.tagnumber}`
    } else {
      return {
        data: null,
        success: false,
        status: HttpStatusCode.NotAcceptable,
        source: AvailableApis[AvailableApis.sanity],
      }
    }
  }
  const query = `*[_type == "tag" && _id == ${payload.slug}]`

  return client.delete({ query }).then((result) => {
    return {
      data: result,
      success: true,
      status: HttpStatusCode.Ok,
      source: AvailableApis[AvailableApis.sanity],
    }
  })
}
