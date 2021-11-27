import { SanityClient } from '@sanity/client'
import { AvailableApis, BikeTagApiResponse, Player } from '../common/types'
import {
  constructPlayerFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { playerDataFields } from '../common/data'
import { getPlayersPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'

export async function getPlayers(
  client: SanityClient,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  const fields = constructSanityFieldsQuery(payload.fields, 'player')
  const fieldsFilter = payload.fields?.length
    ? payload.fields
    : playerDataFields
  const slugIsSet = payload.slugs?.length
  const query = slugIsSet
    ? `*[_type == "player" && slug.current in "${payload.slugs}"]{${fields}}`
    : `*[_type == "player"]{${fields}}`

  return client.fetch(query, {}).then((players) => {
    const playersData = players.map((player: any) =>
      constructPlayerFromSanityObject(player, fieldsFilter)
    )

    const response = {
      data: playersData,
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Player[]>
  })
}
