import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
import {
  constructTagFromSanityObject,
  constructSanityFieldsQuery,
} from './helpers'
import { tagDataFields } from '../common/data'
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

  const fieldsFilter = options.fields?.length ? options.fields : tagDataFields
  const fields = constructSanityFieldsQuery(fieldsFilter)
  const query = `*[_type == "tag" && game._ref in *[_type=="game" && lower(name)=="${options.game.toLowerCase()}"]._id ${slugs} ${tagnumbers}]{${fields}}`
  const params = {}

  return client.fetch(query, params).then((tags) => {
    const tagsData = tags.map((tag: any) =>
      constructTagFromSanityObject(tag, fieldsFilter)
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
