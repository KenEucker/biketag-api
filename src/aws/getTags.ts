import { S3Client } from '@aws-sdk/client-s3'
import { getTagsPayload } from '../common/payloads'
import { BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { AvailableApis, HttpStatusCode } from '../common/enums'
import { loadIndex, getAwsBucketName, loadMainIndexPage, loadCurrentMainTag, getMainIndexPage, isMissingAwsIndex } from './helpers'
import { sortTags } from '../common/methods'

export async function getTags(
  client: S3Client,
  payload: getTagsPayload
): Promise<BikeTagApiResponse<Tag[]>> {
  const {
    game,
    region,
    folder = 'main',
    tagnumbers,
    slugs,
    sort,
    limit,
    time,
    reindex,
    cached,
    page,
  } = payload

  const bucket = getAwsBucketName(game)
  let tags: Tag[] = []
  let success = true
  let error: string | undefined

  try {
    if (folder !== 'main' || reindex) {
      tags = await loadIndex(client, bucket, folder, region, cached, reindex)
    } else if (page !== undefined) {
      if (!Number.isInteger(page) || page < 1) {
        throw new Error('page must be a positive integer (page 1 is index.json)')
      }
      tags = await loadMainIndexPage(client, bucket, page)
    } else if (
      limit && limit > 0 && (!sort || sort === 'new' || sort === 'top') &&
      (!time || time === 'all') && !slugs?.length && !tagnumbers?.length
    ) {
      // For recent-first limits, fetch only the necessary historical pages.
      // An unseeded legacy game falls back to its existing index.json.
      let current
      try {
        current = await loadCurrentMainTag(client, bucket)
      } catch (err: any) {
        if (!isMissingAwsIndex(err)) throw err
      }
      if (!current?.tagnumber) {
        tags = await loadMainIndexPage(client, bucket, 1)
      } else {
        for (let p = getMainIndexPage(current.tagnumber); p >= 1 && tags.length < limit; p--) {
          tags.push(...await loadMainIndexPage(client, bucket, p))
        }
      }
    } else if (tagnumbers?.length && !slugs?.length && (!time || time === 'all')) {
      // A known tag number identifies its historical index without listing objects.
      const pages = [...new Set(tagnumbers.filter(n => n > 0).map(getMainIndexPage))]
      tags = (await Promise.all(pages.map(p => loadMainIndexPage(client, bucket, p)))).flat()
    } else {
      tags = await loadIndex(client, bucket, folder, region, cached, reindex)
    }

    if (tagnumbers?.length) {
      tags = tags.filter((tag) => tagnumbers.includes(tag.tagnumber))
    }

    if (slugs?.length) {
      tags = tags.filter((tag) => slugs.includes(tag.slug))
    }
  } catch (err: any) {
    success = false
    error = err.message
  }

  return {
    data: sortTags(tags, sort, limit, time),
    success,
    error,
    source: AvailableApis[AvailableApis.aws],
    status: success ? HttpStatusCode.Ok : HttpStatusCode.BadRequest,
  }
}
