// @ts-ignore
import { ImgurClient } from './imgurClient';
import { Payload, BikeTagApiResponse, TagData } from '../common/types';
// import { Progress } from 'axios';

export async function uploadTagImage(
  // client: ImgurClient,
  payload: string | string[] | Payload | Payload[]
): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      // const form = createForm(p);
      // const req = client.request('UPLOAD_ENDPOINT', {
      //   method: 'POST',
      //   body: form,
      //   resolveBodyOnly: true,
      // });

      const id = "a" + p
      // req.on('uploadProgress', (progress: Progress) => {
      //   client.emit('uploadProgress', { ...progress, id });
      // });

      return (id as unknown) as Promise<BikeTagApiResponse<TagData>>;
    });
    return await Promise.all(promises);
  }

  // const form = createForm(payload);
  // const req = client.request('UPLOAD_ENDPOINT', {
  //   method: 'POST',
  //   body: form,
  //   resolveBodyOnly: true,
  // });

  const id = "Ads"
  // req.on('uploadProgress', (progress: Progress) => {
  //   client.emit('uploadProgress', { ...progress, id });
  // });

  return (id as unknown) as BikeTagApiResponse<TagData>;
}
