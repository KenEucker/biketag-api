import type { ImgurClient } from 'imanagur'
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

  if (client) {
    if (!payload.hash) {
      const albumsInfo = await client.getAlbums('biketag')
      for (const album of albumsInfo?.data) {
        const gameAlbumData = getGameSlugFromText(album.title)
        if (gameAlbumData) {
          payload.hash = album.id
        }
      }
    }
    const albumInfo = await client.getAlbum(payload.hash)
    /// TODO: save all game settings into the title of the image (serialized)
    const games = albumInfo.data?.images?.reduce((o, i) => {
      const gameData = getGameDataFromText(`${i.title}::${i.description}`)
      if (gameData && gameData.name === payload.slug) {
        gameData.mainhash = albumInfo.data.id
        gameData.logo = i.link
        o.push(gameData)
      }
      return o
    }, [])

    game = createGameObject(games.length ? games[0] : undefined)
  }

  return {
    data: game,
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
