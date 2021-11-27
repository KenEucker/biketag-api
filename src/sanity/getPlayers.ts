import { SanityClient } from '@sanity/client'
import {
  AvailableApis,
  BikeTagApiResponse,
  DataTypes,
  Player,
} from '../common/types'
import {
  constructPlayerFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { playerDataFields } from '../common/data'
import { getPlayersPayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'
import { sortPlayers } from '../common/methods'

export async function getPlayers(
  client: SanityClient,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  const fields = constructSanityFieldsQuery(payload.fields, DataTypes.player)
  const fieldsFilter = payload.fields?.length
    ? payload.fields
    : playerDataFields
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.player],
    payload.game,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((players) => {
    const playersData = players.map((player: any) =>
      constructPlayerFromSanityObject(player, fieldsFilter)
    )

    const response = {
      data: sortPlayers(playersData, payload.sort),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Player[]>
  })
}
