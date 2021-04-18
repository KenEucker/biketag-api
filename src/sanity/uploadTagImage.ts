import { SanityClient } from '@sanity/client'
import { Payload, BikeTagApiResponse, TagData } from '../common/types'

export async function uploadTagImage(
  client: SanityClient,
  payload: string | string[] | Payload | Payload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  const req = null

  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      return (p as unknown) as Promise<BikeTagApiResponse<TagData>>
    })
    return await Promise.all(promises)
  }

  return (((await {
    client,
    req,
  }) as any) as unknown) as BikeTagApiResponse<TagData>
}
