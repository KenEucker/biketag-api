import { updateTagPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { BikeTagApiResponse, Tag } from '../common/types'
import { BikeTagGunClient } from '../common/types'
import { AvailableApis } from '../common/enums'

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
