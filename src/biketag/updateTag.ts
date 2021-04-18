import { BikeTagClient } from '../client'
import { IMAGE_ENDPOINT } from '../common/endpoints'
import { Payload, BikeTagApiResponse } from '../common/types'

export interface UpdateTagPayload
  extends Pick<Payload, 'title' | 'description'> {
  slug: string
}

function isValidUpdatePayload(p: UpdateTagPayload) {
  return typeof p.title === 'string' || typeof p.description === 'string'
}

export async function updateTag(
  client: BikeTagClient,
  payload: UpdateTagPayload
): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  // if (Array.isArray(payload)) {
  //   const promises = payload.map((p: UpdateTagPayload) => {
  //     if (!isValidUpdatePayload(p)) {
  //       throw new Error('Update requires a title and/or description');
  //     }

  //     const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
  //     const form = createForm(p);
  //     return (client.request(url, {
  //       method: 'POST',
  //       body: form,
  //       resolveBodyOnly: true,
  //     }) as unknown) as Promise<BikeTagApiResponse<boolean>>;
  //   });

  //   return await Promise.all(promises);
  // }

  if (!isValidUpdatePayload(payload)) {
    throw new Error('Update requires a title and/or description')
  }

  const url = `${IMAGE_ENDPOINT}/${payload.slug}`
  return ((await client.request({ url, method: 'DELETE' }))
    .data as unknown) as BikeTagApiResponse<boolean>
}
