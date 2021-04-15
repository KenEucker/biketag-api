import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, TagData } from '../common/types';

export async function getTag(
  client: SanityClient,
  slug?: string,
  // tagnumber?: number,
  // fields?: string[],
  ): Promise<BikeTagApiResponse<TagData>> {

    const query = `*[_type == "tag" && slug.current == "${slug}" ]`
    const params = {}
    return client.fetch(query, params).then((tags) => {
      console.log({tags, slug})
      return tags as BikeTagApiResponse<TagData>
    })
}
