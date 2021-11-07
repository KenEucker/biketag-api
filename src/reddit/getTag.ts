import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
import { getTagPayload } from '../common/payloads'

export async function getTag(
  client: SanityClient,
  options: getTagPayload
): Promise<BikeTagApiResponse<TagData>> {
  if (!options) {
    throw new Error('no options')
  }

  if (!options.slug.length) {
    throw new Error('no slug')
  }

  const slugIsLatest = options.slug === 'latest'
  const slugIsFirst = options.slug === 'first'
  const slugQuery = slugIsLatest
    ? `|order(tagnumber desc)[0]`
    : slugIsFirst
    ? `|order(tagnumber asc)[0]`
    : ` && slug.current == "${options.slug}"`

  const query = ''

  const params = {}

  return client.fetch(query, params).then((tag) => {
    // construct tagData object from tag
   
    // wrap tag in BikeTagApiResponse
    const response = {
      data: null,
      status: 1,
      success: true,
      source: 'sanity',
    }

    // return BikeTagApiResponse
    return response as BikeTagApiResponse<TagData>
  })
}
