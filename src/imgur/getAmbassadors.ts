import type { ImgurClient } from 'imanagur'
import { createPlayerObject, createTagObject } from '../common/data'
import { sortAmbassadors } from '../common/methods'
import { getAmbassadorsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Ambassador } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getAmbassadors(
  client: ImgurClient,
  payload: getAmbassadorsPayload
): Promise<BikeTagApiResponse<Ambassador[]>> {
  const gameResponse = await this.getGame({ sort: 'relevance' }, payload)

  return {
    data: sortAmbassadors(
      gameResponse.data?.ambassadors,
      payload.sort,
      payload.limit
    ),
    success: gameResponse.success,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
