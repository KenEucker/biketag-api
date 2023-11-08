import AWS from 'aws-sdk'
import { createPlayerObject, createTagObject } from '../common/data'
import { getPlayersPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Player } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getPlayerDataFromText } from './helpers'
import TinyCache from 'tinycache'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function getPlayers(
  payload: getPlayersPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Player[]>> {
  const playersData: Player[] = []
  const playerNames: string[] = []

  // AWS S3 doesn't support albums, so you'll need to fetch and filter the images manually.
  // This is a placeholder implementation and might not cover all your needs.
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  }

  const s3Objects = await s3.listObjects(params).promise()

  // You'll need to store and access the player data separately since S3 doesn't support image metadata.
  // This is a placeholder implementation and might not cover all your needs.
  const playerImages = s3Objects.Contents?.map((object) => {
    const player = getPlayerDataFromText(object.Key)
    if (player) {
      player.bicon = object.Key
      return player
    }
  })

  // The rest of your code remains largely the same, but you'll need to adjust it to work with the new data structure.

  // ...

  return {
    data: sortPlayers(playersData, payload.sort, payload.limit),
    success: true,
    source: AvailableApis[AvailableApis.s3],
    status: HttpStatusCode.Ok,
  }
}
