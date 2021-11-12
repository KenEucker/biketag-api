import { SanityClient } from '@sanity/client'
import { deleteTagsPayload } from '../common/payloads'
import { AvailableApis, BikeTagApiResponse } from '../common/types'

export async function deleteTags(
  client: SanityClient,
  payload: deleteTagsPayload
): Promise<BikeTagApiResponse<any>> {
  if (!payload.slugs?.length) {
    if (payload.tagnumbers?.length) {
      payload.slugs = payload.tagnumbers.reduce((o, v) => {
        o.push(`${payload.game}-tag-${v}`)
        return o
      }, [])
    } else if (payload.tags?.length) {
      payload.slugs = payload.tags.reduce((o, v) => {
        o.push(`${payload.game}-tag-${v.tagnumber}`)
        return o
      }, [])
    } else {
      return {
        data: null,
        success: false,
        status: 0,
        source: AvailableApis[AvailableApis.sanity],
      }
    }
  }
  const query = `*[_type == "tag" && _id in [${payload.slugs.join(',')}]]`

  return client.delete({ query }).then((result) => {
    return {
      data: result,
      success: true,
      status: 1,
      source: AvailableApis[AvailableApis.sanity],
    }
  })
}
