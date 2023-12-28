import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import {
  constructPlayerFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { playerDataFields } from '../common/data'
import { getPlayersPayload } from '../common/payloads'
import { sortPlayers } from '../common/methods'
import { Player } from '../common/schema'

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
    /// NOT PASSING IN THE GAME because we are not yet assigning players to games
    undefined, // payload.game,
    payload.names?.length === 1 ? payload.names[0] : undefined,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((players) => {
    let playersData = players.map((player: any) =>
      constructPlayerFromSanityObject(player, fieldsFilter)
    )

    if (payload.slugs?.length) {
      playersData = playersData.filter((p) => payload.slugs?.includes(p.slug))
    } else if (payload.names?.length) {
      playersData = playersData.filter((p) => payload.names?.includes(p.name))
    }

    const response = {
      data: sortPlayers(playersData, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Player[]>
  })
}
