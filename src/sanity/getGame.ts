import { SanityClient } from '@sanity/client'
import { AvailableApis, BikeTagApiResponse, Game } from '../common/types'
import {
  constructGameFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { getGamePayload } from '../common/payloads'
import { HttpStatusCode } from '../common/responses'

export async function getGame(
  client: SanityClient,
  payload: getGamePayload
): Promise<BikeTagApiResponse<Game | Game[]>> {
  if (!payload) {
    throw new Error('no payload options')
  }

  const fields = constructSanityFieldsQuery(payload.fields, 'game')
  const slugIsSet = payload.slug?.length
  const nameIsSet = payload.name?.length
  const query = slugIsSet
    ? `*[_type == "game" && slug.current == "${payload.slug}"][0]{${fields}}`
    : nameIsSet
    ? `*[_type == "game" && name match "${payload.name}"][0]{${fields}}`
    : `*[_type == "game"]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((game) => {
    const isArray = Array.isArray(game)
    const games = isArray ? game : [game]
    const gameData = []

    // construct gameData object from game
    for (const game of games) {
      gameData.push(constructGameFromSanityObject(game, payload.fields))
    }

    // wrap tag in BikeTagApiResponse
    const response = {
      data: isArray ? gameData : gameData[0],
      status: HttpStatusCode.Ok,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<Game>
  })
}
