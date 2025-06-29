import { SanityClient } from '@sanity/client'
import { HttpStatusCode, AvailableApis } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'
import { updateStatPayload } from '../common/payloads'

export async function updateStats(
  client: SanityClient,
  payload: updateStatPayload | updateStatPayload[]
): Promise<BikeTagApiResponse<any> | BikeTagApiResponse<any>[]> {
  const updatePayloads = Array.isArray(payload) ? payload : [payload]
  const successPayloads = []

  for (const updatePayload of updatePayloads) {
    successPayloads.push(this.updateStat(updatePayload))
  }

  const settled = await Promise.allSettled(successPayloads)
  return {
    success: settled.every((s) => s.status === 'fulfilled'),
    status: HttpStatusCode.Ok,
    source: AvailableApis[AvailableApis.sanity],
    data: settled.map((s) =>
      s.status === 'fulfilled' ? s.value.data : s.reason
    ),
  }
}
