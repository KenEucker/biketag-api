import type { S3Client } from '@aws-sdk/client-s3'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { createTagObject } from '../common/data'
import { getTagPlayerIdentity } from '../common/getters'
import { queueTagPayload } from './helpers'
import TinyCache from 'tinycache'

export async function queueTag(
  client: S3Client,
  payload: queueTagPayload,
  cache?: typeof TinyCache
): Promise<BikeTagApiResponse<Tag>> {
  payload.folder = 'queue'

  const queuedTagsResponse = await this.getQueue({ game: payload.game }, cache)
  const currentTagsResponse = await this.getTags({ game: payload.game }, cache)
  const queuedTags = queuedTagsResponse.data || []
  const currentTag = currentTagsResponse?.data?.[0]

  const isCompleteQueuedTag = payload.mysteryImageUrl && payload.foundImageUrl

  const playerIdentity = getTagPlayerIdentity(payload)

  const playerAlreadyQueuedError =
    !isCompleteQueuedTag &&
    !!playerIdentity &&
    queuedTags.some((t) => getTagPlayerIdentity(t) === playerIdentity)

  if (playerAlreadyQueuedError) {
    return {
      data: payload as Tag,
      success: false,
      error: 'player already has queued tag',
      source: AvailableApis[AvailableApis.aws],
      status: HttpStatusCode.Conflict,
    }
  }

  const previousMysteryIdentity = currentTag
    ? getTagPlayerIdentity({
        playerId: currentTag.playerId,
        mysteryPlayer: currentTag.mysteryPlayer,
      })
    : null

  const playerIsPreviousMystery =
    !!playerIdentity &&
    !!previousMysteryIdentity &&
    playerIdentity === previousMysteryIdentity

  if (playerIsPreviousMystery) {
    return {
      data: payload as Tag,
      success: false,
      error: 'player created previous round',
      source: AvailableApis[AvailableApis.aws],
      status: HttpStatusCode.Conflict,
    }
  }

  let success = false
  let error: string | undefined
  let tagData: Tag | undefined

  if (isCompleteQueuedTag) {
    const isBrowserRequest = typeof window !== 'undefined'
    const updateResponse = isBrowserRequest
      ? await this.biketagUpdate(payload, cache)
      : await this.updateTag(payload, cache)

    success = updateResponse.success
    error = !success ? `update tag error: ${updateResponse.error}` : undefined
    tagData = success ? createTagObject(payload) : undefined
  } else {
    const isMystery = !!payload.mysteryImage || !!payload.mysteryImageUrl
    const image = isMystery ? payload.mysteryImage : payload.foundImage
    payload.contentType = (image as File)?.type ?? 'image/jpeg'

    const uploadResponse = await this.uploadTagImage(payload)

    if (uploadResponse.success) {
      const uploaded = uploadResponse.data

      success = true

      if (isMystery && uploaded.mysteryImageUrl) {
        payload.mysteryImage = undefined
        payload.mysteryImageUrl = uploaded.mysteryImageUrl
        payload.mysteryTime = uploaded.mysteryTime
      } else if (!isMystery && uploaded.foundImageUrl) {
        payload.foundImage = undefined
        payload.foundImageUrl = uploaded.foundImageUrl
        payload.foundTime = uploaded.foundTime
      } else {
        success = false
      }

      tagData = createTagObject(payload)
    } else {
      success = false
      error = uploadResponse.error
    }
  }

  return {
    data: tagData,
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
