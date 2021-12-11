import { BikeTagClient } from '../client'
import { Payload, BikeTagApiResponse } from '../common/types'
import { Tag } from '../common/schema'
import { QUEUE_ENDPOINT } from '../common/endpoints'

export async function queueTag(
  client: BikeTagClient,
  payload: string | string[] | Payload | Payload[]
): Promise<BikeTagApiResponse<Tag> | BikeTagApiResponse<Tag>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      // const form = createForm(p);
      // const req = client.request(UPLOAD_ENDPOINT, {
      //   method: 'POST',
      //   body: form,
      //   resolveBodyOnly: true,
      // });

      // const id = ;
      // req.on('uploadProgress', (progress: Progress) => {
      //   client.emit('uploadProgress', { ...progress, id });
      // });

      return p as unknown as Promise<BikeTagApiResponse<Tag>>
    })
    return await Promise.all(promises)
  }

  // const form = createForm(payload);
  // const req = client.request(UPLOAD_ENDPOINT, {
  //   method: 'POST',
  //   body: form,
  //   resolveBodyOnly: true,
  // });

  // req.on('uploadProgress', (progress: Progress) => {
  //   client.emit('uploadProgress', { ...progress, id });
  // });

  return client as unknown as BikeTagApiResponse<Tag>
}
