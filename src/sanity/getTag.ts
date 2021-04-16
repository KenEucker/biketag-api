import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTag(
  client: SanityClient,
  options: any
  ): Promise<BikeTagApiResponse<TagData>> {

    if (!options) {
      throw new Error('no options')
    }

    options = typeof options === "string" ? { slug: options } : options
    options = typeof options === "number" ? { slug: `portland-tag-${options}` } : options
    options.slug = options.slug ? options.slug : `portland-tag-${options.tagnumber}`
    
    if (!options.slug.length) {
      throw new Error('no slug')
    }

    let fields = ''

    if (options.fields?.length) {
      fields = `{${options.fields.join(',')} }`
    }

    const query = `*[_type == "tag" && slug.current == "${options.slug}" ][0]${fields}`
    const params = {}
    return client.fetch(query, params).then((tag) => {

      // construct tagData object from tag
      const tagData = {
        tagnumber: tag.tagnumber,
        mysteryImage: tag.mysteryImage,
        mysteryImageUrl: tag.mysteryImageUrl,
        game: tag.game,
        player: tag.player,
        hint: tag.hint,
        discussionUrl: tag.discussionUrl,
        foundLocation: tag.foundLocation,
        gps: tag.gps,
        foundImage: tag.foundImage,
        foundImageUrl: tag.foundImageUrl,
      }
      // wrap tag in BikeTagApiResponse
      // return BikeTagApiResponse

      console.log("hello, world*!", {tag, tagData})


      return (tagData as any) as BikeTagApiResponse<TagData>
    })
}
