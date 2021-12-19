import type { ImgurClient } from 'imanagur'
import { sortAmbassadors } from '../common/methods'
import { getAmbassadorsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Ambassador } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getAmbassadors(
  client: ImgurClient,
  payload: getAmbassadorsPayload
): Promise<BikeTagApiResponse<Ambassador[]>> {
  const gameResponse = await this.getGame(payload.game)

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
