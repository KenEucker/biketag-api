import type { ImgurClient } from 'imgur'
import { createGameObject, cacheKeys } from '../common/data'
import { getGamePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Game } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGameDataFromText, getGameSlugFromText } from './helpers'
import {
  getCacheIfExists,
  getGameAlbumFromCache,
  putCacheIfExists,
} from '../common/methods'
import TinyCache from 'tinycache'

export async function getGame(
  client: ImgurClient,
  payload: getGamePayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Game>> {
  const cacheKey = `imgur::${cacheKeys.gameIdText}${
    payload.slug ?? payload.name ?? 'biketag'
  }`
  let game = getCacheIfExists(cacheKey, cache)
  let error
  let success = true

  if (game) {
    /// First do nothing
  } else if (client) {
    const hashes = payload.hash ? [payload.hash] : []
    if (!hashes.length) {
      let stillSearching = true
      let albumPage = 0
      while (stillSearching) {
        const albumsInfo = await client.getAlbums('biketag', albumPage)
        if (albumsInfo?.data) {
          for (const album of albumsInfo.data) {
            const gameSlug = getGameSlugFromText(album.title) ?? ''
            if (
              gameSlug
                .toLocaleLowerCase()
                .indexOf(payload.slug?.toLocaleLowerCase()) !== -1
            ) {
              hashes.push(album.id)
            }
          }
        }
        if (!hashes.length && albumsInfo.data?.length === 50) {
          ++albumPage
        } else {
          stillSearching = false
        }
      }
    }

    for (const hash of hashes) {
      const albumInfo = await getGameAlbumFromCache(hash, cache, () =>
        client.getAlbum(hash)
      )

      if (albumInfo.data?.images?.length > 0) {
        /// TODO: save all game settings into the title of the image (serialized)
        const games = albumInfo.data.images.reduce((o, i) => {
          const gameData = getGameDataFromText(`${i.title}::${i.description}`)
          if (gameData && gameData.name === payload.slug) {
            gameData.mainhash = albumInfo.data.id
            gameData.logo = i.link
            o.push(gameData)
          }
          return o
        }, [])

        if (games.length) {
          game = createGameObject(games[0])
        } else if (
          albumInfo.data.title
            .toLocaleLowerCase()
            .indexOf(`${payload.slug} biketag`) !== -1 ||
          albumInfo.data.title
            .toLocaleLowerCase()
            .indexOf(`${payload.slug} bike tag`) !== -1
        ) {
          game = createGameObject({
            name: payload.slug,
            mainhash: albumInfo.data.id,
          })
        }

        if (game) {
          putCacheIfExists(cacheKey, game, cache)
          break
        }
      } else if (!albumInfo.success) {
        error = albumInfo.data
        success = false
      }
    }
  }

  return {
    data: game,
    success,
    error,
    source: AvailableApis[AvailableApis.imgur],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
