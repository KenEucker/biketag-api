import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import {
  constructGameFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { getGamePayload } from '../common/payloads'
import { Game } from '../common/schema'
import TinyCache from 'tinycache'
import { cacheKeys } from '../common/data'
import { putCacheIfExists, getCacheIfExists } from '../common/methods'

export async function getGame(
  client: SanityClient,
  payload: getGamePayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Game | Game[]>> {
  if (!payload) {
    throw new Error('no payload options')
  }

  const cacheKey = `sanity::${cacheKeys.gameIdText}${
    payload.slug ?? payload.name
  }`
  const gameExistsInCache = getCacheIfExists(cacheKey, cache)
  if (gameExistsInCache) {
    return Promise.resolve({
      data: gameExistsInCache,
      status: HttpStatusCode.Ok,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    })
  }

  const fields = constructSanityFieldsQuery(payload.fields, DataTypes.game)
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

    const theGame = isArray ? gameData : gameData[0]
    if (theGame) {
      putCacheIfExists(cacheKey, theGame, cache)
    }

    // wrap tag in BikeTagApiResponse
    const response = {
      data: theGame,
      status: HttpStatusCode.Ok,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<Game>
  })
}
