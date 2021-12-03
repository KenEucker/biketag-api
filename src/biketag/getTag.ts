import { getTagPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { BikeTagGunClient } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getTag(
  client: BikeTagGunClient,
  payload: getTagPayload
): Promise<BikeTagApiResponse<Tag>> {
  let status = 1
  let success = true
  let tag = null
  const slugIsCurrent = payload.slug === 'current'

  const currentTagNumber: number = await new Promise((r) => {
    return client
      .get(payload.game)
      .get('currentTagNumber')
      .once((t) => r(t as unknown as number))
  })
  const tagnumber = slugIsCurrent ? currentTagNumber : payload.tagnumber

  if (tagnumber <= currentTagNumber) {
    tag = await new Promise((r) => {
      return client
        .get(payload.game)
        .get('tags')
        .get(payload.slug)
        .once((t) => r(t as unknown as Tag))
    })
  } else {
    success = false
    status = HttpStatusCode.NotFound
  }

  return {
    data: tag,
    status,
    success,
    source: AvailableApis[AvailableApis.biketag],
  }
}
