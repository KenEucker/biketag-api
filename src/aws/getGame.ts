import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getGamePayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Game } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { getCacheIfExists, putCacheIfExists } from '../common/methods'
import { cacheKeys } from '../common/data'
import TinyCache from 'tinycache'

export async function getGame(
  client: S3Client,
  payload: getGamePayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Game>> {
  const slug = payload.slug ?? payload.name ?? 'biketag'
  const bucket = `${slug}-biketag`
  const cacheKey = `aws::${cacheKeys.gameIdText}${slug}`

  let game: Game | null = payload.cached
    ? getCacheIfExists(cacheKey, cache)
    : null

  let success = true
  let error: string | undefined

  if (!game) {
    try {
      const obj = await client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: 'game.json',
        })
      )

      const chunks: any[] = []
      for await (const chunk of obj.Body as any) chunks.push(chunk)
      const raw = Buffer.concat(chunks).toString('utf-8')
      game = JSON.parse(raw) as Game

      putCacheIfExists(cacheKey, game, cache)
    } catch (err: any) {
      success = false
      error = err.message || 'Could not load game.json'
    }
  }

  return {
    data: game,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
