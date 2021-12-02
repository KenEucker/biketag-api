import type { ImgurClient } from 'imgur'
import { createPlayerObject } from '../common/data'
import { sortPlayers } from '../common/methods'
import { getPlayersPayload } from '../common/payloads'
import { BikeTagApiResponse, Player } from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'

export async function getPlayers(
  client: ImgurClient,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  const playersData: Player[] = []
  const playerNames: string[] = []

  if (client) {
    const { data: tags } = await this.getTags({ sort: 'relevance' })

    for (const tag of tags) {
      const mysteryPlayerIncludedIndex = playerNames.indexOf(tag.mysteryPlayer)
      const mysteryPlayerNotYetIncluded = mysteryPlayerIncludedIndex === -1
      const foundPlayerIncludedIndex = playerNames.indexOf(tag.foundPlayer)
      const foundPlayerNotYetIncluded = mysteryPlayerIncludedIndex === -1
      const includeMysteryPlayerInList = payload.slugs?.length
        ? payload.slugs.indexOf(tag.mysteryPlayer) !== -1
        : true
      const includeFoundPlayerInList = payload.slugs?.length
        ? payload.slugs.indexOf(tag.foundPlayer) !== -1
        : true

      if (includeMysteryPlayerInList && mysteryPlayerNotYetIncluded) {
        playersData.push(
          createPlayerObject({
            name: tag.mysteryPlayer,
            tags: [tag],
            games: [payload.game],
          })
        )
        playerNames.push(tag.mysteryPlayer)
      } else if (includeMysteryPlayerInList && !mysteryPlayerNotYetIncluded) {
        playersData[mysteryPlayerIncludedIndex].tags.push({
          ...tag,
        })
      } else if (includeFoundPlayerInList && foundPlayerNotYetIncluded) {
        playersData.push(
          createPlayerObject({
            name: tag.foundPlayer,
            tags: [tag],
            games: [payload.game],
          })
        )
      } else if (includeFoundPlayerInList && !foundPlayerNotYetIncluded) {
        playersData[foundPlayerIncludedIndex].tags.push({
          ...tag,
        })
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
