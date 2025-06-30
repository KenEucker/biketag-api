import { S3Client } from '@aws-sdk/client-s3'
import { getPlayersPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Player, Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { loadIndex } from './helpers'
import { createPlayerObject, createTagObject } from '../common/data'
import { sortPlayers } from '../common/methods'

export async function getPlayers(
  client: S3Client,
  payload: getPlayersPayload
): Promise<BikeTagApiResponse<Player[]>> {
  const { game, slugs = [], sort, limit } = payload
  const bucket = `${game}-biketag`
  const indexPath = `main/index.json`
  let tags: Tag[] = []

  try {
    tags = await loadIndex(client, bucket, indexPath, payload.awsRegion)
  } catch (err: any) {
    return {
      data: [],
      success: false,
      error: err.message,
      source: AvailableApis[AvailableApis.aws],
      status: HttpStatusCode.InternalServerError,
    }
  }
  // const tags: Tag[] = await loadIndex(client, bucket, indexPath)
  const playersData: Player[] = []
  const playerNames: string[] = []

  const includePlayer = (tag: Tag, name: string) => {
    playersData.push(
      createPlayerObject({
        games: [game],
        name,
        tags: [tag],
      })
    )
    playerNames.push(name)
  }

  for (const tag of tags) {
    if (!tag) continue

    // Mystery player
    const includeMystery = !slugs.length || slugs.includes(tag.mysteryPlayer)
    const mysteryIndex = playerNames.indexOf(tag.mysteryPlayer)
    if (includeMystery) {
      if (mysteryIndex === -1) {
        includePlayer(tag, tag.mysteryPlayer)
      } else {
        playersData[mysteryIndex].tags.push(tag)
      }
    }

    // Found player
    const includeFound = !slugs.length || slugs.includes(tag.foundPlayer)
    const foundIndex = playerNames.indexOf(tag.foundPlayer)
    if (includeFound) {
      if (foundIndex === -1) {
        includePlayer(tag, tag.foundPlayer)
      } else {
        playersData[foundIndex].tags.push(tag)
      }
    }
  }

  // Re-pair mystery/found tags
  for (const player of playersData) {
    const grouped = player.tags.reduce((o, t, i) => {
      const n = t.mysteryPlayer === player.name ? t.tagnumber : t.tagnumber + 1
      o[n] = o[n] ?? []
      o[n].push(i)
      return o
    }, [] as number[][])

    player.tags = grouped.reduce((o, pair) => {
      const first = player.tags[pair[0]]
      const second = player.tags[pair[1]] ?? ({} as Tag)
      const isMystery = first.mysteryPlayer === player.name
      const mysteryTag = isMystery ? first : second
      const foundTag = isMystery ? second : first
      o.push(createTagObject(mysteryTag, foundTag))
      return o
    }, [] as Tag[])
  }

  return {
    data: sortPlayers(playersData, sort, limit),
    success: true,
    source: AvailableApis[AvailableApis.aws],
    status: HttpStatusCode.Ok,
  }
}
