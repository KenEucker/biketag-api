import type { ImgurClient } from 'imgur'
import { createGameObject } from '../common/data'
import { getGamePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Game } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getGameDataFromText, getGameSlugFromText } from './helpers'

export async function getGame(
  client: ImgurClient,
  payload: getGamePayload
): Promise<BikeTagApiResponse<Game>> {
  let game
  let error
  let success = true

  if (client) {
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
                .indexOf(payload.slug.toLocaleLowerCase()) !== -1
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
      const albumInfo = await client.getAlbum(hash)

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
    status: HttpStatusCode.Ok,
  }
}
