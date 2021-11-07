import { SanityClient } from '@sanity/client'
import { deleteTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'

export async function deleteTag(
  client: SanityClient,
  payload: deleteTagPayload,
): Promise<BikeTagApiResponse<any>> {
  if (!payload.slugs?.length) {
    if (payload.tagnumbers?.length) {
      payload.slugs = payload.tagnumbers.reduce((o,v) => { o.push(`${payload.game}-tag-${v}`) ; return o }, [])
    } else {
      return {
        data: null,
        success: false,
        status: 0,
        source: 'sanity',
      }
    }
  }
  const query = `*[_type == "tag" && _id in [${payload.slugs.join(',')}]]`
  
  return client.delete({query}).then((result) => {
    return {
      data: result,
      success: true,
      status: 1,
      source: 'sanity',
    }
  })
}
