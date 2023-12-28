import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import {
  AvailableApis,
  HttpStatusCode,
  DataTypes,
  GameSettingsKeys,
} from '../common/enums'
import {
  constructAchievementFromSanityObject,
  constructSanityDocumentQuery,
  constructSanityFieldsQuery,
} from './helpers'
import { getAchievementsPayload } from '../common/payloads'
import { Achievement } from '../common/schema'
import { sortAchievements } from '../common/methods'

export async function getAchievements(
  client: SanityClient,
  payload: getAchievementsPayload
): Promise<BikeTagApiResponse<Achievement[]>> {
  const fields = constructSanityFieldsQuery(
    payload.fields,
    DataTypes.achievement
  )
  /// TODO: Add support getting the achievements for a specific Player
  const fieldsFilter = payload.fields?.length ? payload.fields : []
  const query = constructSanityDocumentQuery(
    DataTypes[DataTypes.achievement],
    // payload.game, // don't include the game here because we are not specifically assigning achievements to a game
    undefined,
    payload.player,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then(async (achievementsData) => {
    let achievements = achievementsData.map((achievement: any) =>
      constructAchievementFromSanityObject(achievement, fieldsFilter)
    )

    if (payload.game?.length) {
      const game = (await this.getGame(payload.game)).data
      if (game) {
        const achievementsEnabled =
          game.settings[GameSettingsKeys.achievementsEnabled]

        if (!achievementsEnabled || achievementsEnabled === 'false') {
          achievements = []
        } else if (achievementsEnabled && achievementsEnabled !== 'true') {
          const enabledAchievements = achievementsEnabled.split(',')
          achievements = achievements.filter((a) =>
            enabledAchievements.includes(a.key)
          )
        } else {
          // first do nothing
        }
      }
    }

    const response = {
      data: sortAchievements(achievements, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Achievement[]>
  })
}
