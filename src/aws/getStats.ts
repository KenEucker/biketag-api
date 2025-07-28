import {
  getGameHighestNumberTagsPerNumberDaysData,
  getLongestTimeBetweenTags,
  getPlayersWithHighestNumberTagsPerDayData,
  getPlayersWithLongestDailyTagStreakData,
  getTagLongestDailyStreakData,
} from '../common/methods'
import { getStatsPayload } from '../common/payloads'
import {
  BikeTagApiResponse,
  GameHighestNumberTagsPerNumberDaysData,
  gameLongestTimeBetweenTagsData,
  PlayerHighestNumberTagsPerDayData,
  PlayerStreakData,
  StatsReportData,
  StreakData,
} from '../common/types'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import TinyCache from 'tinycache'
import { S3Client } from '@aws-sdk/client-s3'

export async function getStats(
  client: S3Client,
  payload: getStatsPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<StatsReportData>> {
  let error
  let success
  let data

  const tagsResponse = await this.getTags(undefined, cache)
  const playersResponse = await this.getPlayers(undefined, cache)

  if (
    playersResponse.status !== HttpStatusCode.Ok &&
    tagsResponse.status !== HttpStatusCode.Ok
  ) {
    success = false
    error = playersResponse.error ?? tagsResponse.error
  } else {
    // Player(s) with most tags in one day
    const playersWithMostTagsInOneDayData: PlayerHighestNumberTagsPerDayData[] =
      getPlayersWithHighestNumberTagsPerDayData(playersResponse.data)

    // Player(s) with longest streak of daily tags
    const playersWithLongestTagStreakDaysData: PlayerStreakData[] =
      getPlayersWithLongestDailyTagStreakData(playersResponse.data)

    // Game total number of players
    const totalNumberOfPlayers: number = playersResponse.data.length

    // Game total number of tags
    const totalNumberOfTags: number = tagsResponse.data.length

    // Game most tags in one day
    const gameHighestNumberTagsPerOneDayData: GameHighestNumberTagsPerNumberDaysData =
      getGameHighestNumberTagsPerNumberDaysData(tagsResponse.data)

    // Game most tags in one week
    const days = 7
    const gameHighestNumberTagsPerSevenDaysData: GameHighestNumberTagsPerNumberDaysData =
      getGameHighestNumberTagsPerNumberDaysData(tagsResponse.data, days)

    // Game longest streak of daily tags
    const gameLongestDailyTagStreakData: StreakData =
      getTagLongestDailyStreakData(tagsResponse.data)

    // Longest time between tags
    const longestTimeBetweenTags: gameLongestTimeBetweenTagsData =
      getLongestTimeBetweenTags(tagsResponse.data)

    success = playersResponse.success && tagsResponse.success

    data = {
      playersWithMostTagsInOneDay: playersWithMostTagsInOneDayData,
      playersWithLongestTagStreakDaysData: playersWithLongestTagStreakDaysData,
      gameTotalNumberOfPlayers: totalNumberOfPlayers,
      gameTotalNumberOfTags: totalNumberOfTags,
      gameHighestNumberTagsPerOneDayData: gameHighestNumberTagsPerOneDayData,
      gameHighestNumberTagsPerSevenDaysData:
        gameHighestNumberTagsPerSevenDaysData,
      gameLongestDailyTagStreakData: gameLongestDailyTagStreakData,
      gameLongestTimeBetweenTags: longestTimeBetweenTags,
    }
  }

  return {
    data: success ? data : undefined,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
