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
    const { data: tags } = await this.getTags()
    let previousTag

    for (const tag of tags) {
      const playerIncludedIndex = playerNames.indexOf(tag.player)
      const playerNotYetIncluded = playerIncludedIndex === -1
      const includePlayerInList = payload.slugs?.length
        ? payload.slugs.indexOf(tag.player) !== -1
        : true

      if (includePlayerInList && playerNotYetIncluded) {
        playersData.push(
          createPlayerObject({
            name: tag.player,
            tags: [{ ...tag, previous: previousTag }],
            games: [payload.game],
          })
        )
        playerNames.push(tag.player)
      } else if (includePlayerInList && !playerNotYetIncluded) {
        playersData[playerIncludedIndex].tags.push({
          ...tag,
          previous: previousTag,
        })
      }

      previousTag = tag
    }
  }

  return {
    data: sortPlayers(playersData, payload.sort),
    success: true,
    source: AvailableApis[AvailableApis.imgur],
    status: HttpStatusCode.Ok,
  }
}
