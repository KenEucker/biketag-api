import { SanityClient } from '@sanity/client'
import { AvailableApis, BikeTagApiResponse, GameData } from '../common/types'
import {
  constructGameFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { getGameDataPayload } from '../common/payloads'

export async function getGameData(
  client: SanityClient,
  options: getGameDataPayload
): Promise<BikeTagApiResponse<GameData | GameData[]>> {
  if (!options) {
    throw new Error('no options')
  }

  const fields = constructSanityFieldsQuery(options.fields, 'game')
  const slugIsSet = options.slug?.length
  const nameIsSet = options.name?.length
  const query = slugIsSet
    ? `*[_type == "game" && slug.current == "${options.slug}"][0]{${fields}}`
    : nameIsSet
    ? `*[_type == "game" && name match "${options.name}"][0]{${fields}}`
    : '*[_type == "game"]'

  const params = {}

  return client.fetch(query, params).then((game) => {
    const isArray = Array.isArray(game)
    const games = isArray ? game : [game]
    const gameData = []

    // construct gameData object from game
    for (const game of games) {
      gameData.push(constructGameFromSanityObject(game, options.fields))
    }

    // wrap tag in BikeTagApiResponse
    const response = {
      data: isArray ? gameData : gameData[0],
      status: 1,
      success: true,
      source: AvailableApis.sanity,
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<GameData>
  })
}
