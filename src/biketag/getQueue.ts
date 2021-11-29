import { getQueuePayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { BikeTagApiResponse, Tag } from '../common/types'
import { BikeTagGunClient } from '../common/types'
import { AvailableApis } from '../common/enums'

export async function getQueue(
  client: BikeTagGunClient,
  payload: getQueuePayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const tags: Tag[] = await new Promise((r) => {
    return client
      .get(payload.game)
      .get('queue')
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
