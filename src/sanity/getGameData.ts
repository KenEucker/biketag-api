import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, GameData } from '../common/types'
import { constructGameDataObject, constructSanityFieldsQuery } from './helpers'
import { gameDataFields } from '../common/data'
import { getGameDataPayload } from '../common/payloads'

export async function getGameData(
  client: SanityClient,
  options: getGameDataPayload
): Promise<BikeTagApiResponse<GameData>> {
  if (!options) {
    throw new Error('no options')
  }

  if (!options.slug?.length && !options.name?.length) {
    throw new Error('no slug')
  }

  const fields = constructSanityFieldsQuery(options.fields, 'game')
  const slugIsSet = options.slug?.length
  const query = slugIsSet
    ? `*[_type == "game" && slug.current == "${options.slug}"][0]{${fields}}`
    : `*[_type == "game" && name match "${options.name}"][0]{${fields}}`

  const params = {}

  return client.fetch(query, params).then((game) => {
    // construct gameData object from game
    const gameData = constructGameDataObject(game, options.fields)

    // wrap tag in BikeTagApiResponse
    const response = {
      data: gameData,
      status: 1,
      success: true,
      source: 'sanity',
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<GameData>
  })
}
