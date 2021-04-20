import { SanityClient } from '@sanity/client'
import { BikeTagApiResponse, TagData } from '../common/types'
import { constructTagDataObject } from './helpers'
import { tagDataReferenceFields } from '../common/data'
import { getTagsOptions } from '../common/options'

export async function getTags(
  client: SanityClient,
  options: getTagsOptions
): Promise<BikeTagApiResponse<TagData[]>> {
  if (!options) {
    throw new Error('no options')
  }

  let slugs = ''
  let tagnumbers = ''

  const fields = options.fields
    .reduce((o: any, f: any) => {
      o += `${f}${tagDataReferenceFields.indexOf(f) != -1 ? '->{name}' : ''},`
      return o
    }, '')
    .slice(0, -1)

  if (options.slugs?.length) {
    slugs = `&& slug.current in ${JSON.stringify(options.slugs)}`
  }

  if (options.tagnumbers?.length) {
    tagnumbers = `&& tagnumber in ${JSON.stringify(options.tagnumbers)}`
  }

  const query = `*[_type == "tag" && game._ref in *[_type=="game" && lower(name)=="${options.game.toLowerCase()}"]._id ${slugs} ${tagnumbers}]{${fields}}`

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
