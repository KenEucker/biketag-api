import { SanityClient } from '@sanity/client'
import { constructSanityObjectFromData } from './helpers'
import { HttpStatusCode, AvailableApis } from '../common/enums'
import { BikeTagApiResponse } from '../common/types'
import { updateGamePayload } from '../common/payloads'
import { Game } from '../common/schema'
import { gameDataArrayFields, gameDataReferenceFields } from '../common/data'

// function isValidUpdatePayload(utp: updateGamePayload) {
//   return (
//     (typeof utp._id === 'string' &&
//     typeof utp._type === 'string') ||
//     typeof utp.slug === 'string'
//   )
// }

export async function updateGame(
  client: SanityClient,
  payload: updateGamePayload
): Promise<BikeTagApiResponse<Game>> {
  payload = await constructSanityObjectFromData(
    client,
    payload,
    undefined,
    'game',
    gameDataReferenceFields,
    gameDataArrayFields
  )

  const success = await client.createOrReplace(payload)

  return {
    success: !!success,
    status: HttpStatusCode.Ok,
    source: AvailableApis[AvailableApis.sanity],
    data: success as Game,
  }
}
