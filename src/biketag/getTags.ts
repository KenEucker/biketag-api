import { getTagsPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { AvailableApis, BikeTagApiResponse, Tag } from '../common/types'
import { BikeTagGunClient } from '../common/types'

export async function getTags(
  client: BikeTagGunClient,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const tags: Tag[] = await new Promise((r) => {
    return client
      .get(payload.game)
      .get('tags')
      .map()
      .once((t) => r(Object.values(t) as unknown as Tag[]))
  })

  return {
    data: tags,
    status: HttpStatusCode.Ok,
    success: true,
    source: AvailableApis[AvailableApis.biketag],
  }
}
