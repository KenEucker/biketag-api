import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse, Tag } from '../common/types'
import { BikeTagGunClient } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'

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
