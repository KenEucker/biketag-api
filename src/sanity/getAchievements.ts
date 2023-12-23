import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse } from '../common/types'
import { AvailableApis, HttpStatusCode, DataTypes } from '../common/enums'
import {
  constructPlayerFromSanityObject,
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
    payload.game,
    payload.player,
    payload.slugs,
    undefined,
    fields
  )

  return client.fetch(query, {}).then((achievementsData) => {
    const achievements = achievementsData.map((achievement: any) =>
      constructPlayerFromSanityObject(achievement, fieldsFilter)
    )

    const response = {
      data: sortAchievements(achievements, payload.sort, payload.limit),
      status: HttpStatusCode.Found,
      success: true,
      source: AvailableApis[AvailableApis.sanity],
    }

    return response as BikeTagApiResponse<Achievement[]>
  })
}
