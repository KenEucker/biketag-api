import { updateTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { BikeTagGunClient } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function updateTag(
  client: BikeTagGunClient,
  payload: updateTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  const tag: Tag = await new Promise((r) => {
    return client
      .get(payload.game)
      .get('tags')
      .get(payload.tag.slug)
      .put(payload.tag)
      .once((t) => r(t as unknown as Tag))
  })

  return {
    data: tag,
    status: HttpStatusCode.Ok,
    success: true,
    source: AvailableApis[AvailableApis.biketag],
  }
}
