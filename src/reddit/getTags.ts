import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
import { constructTagDataObject } from './helpers'
import { getTagsPayload } from '../common/payloads'

export async function getTags(
  client: SanityClient,
  options: getTagsPayload
): Promise<BikeTagApiResponse<TagData[]>> {
  if (!options) {
    throw new Error('no options')
  }

  let slugs = ''
  let tagnumbers = ''

  if (options.slugs?.length) {
    slugs = `&& slug.current in ${JSON.stringify(options.slugs)}`
  }

  if (options.tagnumbers?.length) {
    tagnumbers = `&& tagnumber in ${JSON.stringify(options.tagnumbers)}`
  }

  const query = ''
  const params = {}

  return client.fetch(query, params).then((tags) => {
    const tagsData = tags.map((tag: any) =>
      constructTagDataObject(tag, options.fields)
    )

    const response = {
      data: tagsData,
      status: 1,
      success: true,
      source: 'sanity',
    }

    return response as BikeTagApiResponse<TagData[]>
  })
}
