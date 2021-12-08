import type { ImgurClient } from 'imanagur'
import { createPlayerObject } from '../common/data'
import { sortPlayers } from '../common/methods'
import { getPlayersPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Player } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getPlayerDataFromText } from './helpers'

export async function getPlayers(
  client: ImgurClient,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  const playersData: Player[] = []
  const playerNames: string[] = []

  if (client) {
    const { data: tags } = await this.getTags({ sort: 'relevance' })
    /// TODO: this better be cached because it's being called twice now
    const albumInfo = await (client.getAlbum(payload.hash) as any)
    const playerImages = albumInfo.data?.images?.reduce((o, i) => {
      const player = getPlayerDataFromText(i.description)
      if (player) {
        player.bicon = i.link
        o.push(player)
      }
      return o
    }, [])

    const includePlayer = (tag: any, name: string) => {
      const filteredPlayers = playerImages.filter((p) => p.name === name)
      const player = filteredPlayers?.length ? filteredPlayers[0] : {}

      playersData.push(
        createPlayerObject({
          games: player.games?.length ? player.games : [payload.game],
          bicon: player.bicon,
          name,
          tags: [tag],
        })
      )
      playerNames.push(name)
    }

    for (const tag of tags) {
      const mysteryPlayerIncludedIndex = playerNames.indexOf(tag.mysteryPlayer)
      const mysteryPlayerNotYetIncluded = mysteryPlayerIncludedIndex === -1
      const includeMysteryPlayerInList = payload.slugs?.length
        ? payload.slugs.indexOf(tag.mysteryPlayer) !== -1
        : true

      if (includeMysteryPlayerInList && mysteryPlayerNotYetIncluded) {
        includePlayer(tag, tag.mysteryPlayer)
      } else if (includeMysteryPlayerInList && !mysteryPlayerNotYetIncluded) {
        playersData[mysteryPlayerIncludedIndex].tags.push(tag)
      }

      const foundPlayerIncludedIndex = playerNames.indexOf(tag.foundPlayer)
      const foundPlayerNotYetIncluded = foundPlayerIncludedIndex === -1
      const includeFoundPlayerInList = payload.slugs?.length
        ? payload.slugs.indexOf(tag.foundPlayer) !== -1
        : true

      if (includeFoundPlayerInList && foundPlayerNotYetIncluded) {
        includePlayer(tag, tag.foundPlayer)
      } else if (includeFoundPlayerInList && !foundPlayerNotYetIncluded) {
        playersData[foundPlayerIncludedIndex].tags.push(tag)
      }
    }
  }

  return {
    data: sortPlayers(playersData, payload.sort),
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
