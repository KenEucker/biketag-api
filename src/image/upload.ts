import { BikeTagClient } from '../client';
import { createForm, getSource } from '../common/utils';
import { Payload, BikeTagApiResponse, ImageData } from '../common/types';
import { UPLOAD_ENDPOINT } from '../common/endpoints';
import { Progress } from 'got';

export async function upload(
  client: BikeTagClient,
  payload: string | string[] | Payload | Payload[]
): Promise<BikeTagApiResponse<ImageData> | BikeTagApiResponse<ImageData>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      const form = createForm(p);
      const req = client.request(UPLOAD_ENDPOINT, {
        method: 'POST',
        body: form,
        resolveBodyOnly: true,
      });

      const id = getSource(p);
      req.on('uploadProgress', (progress: Progress) => {
        client.emit('uploadProgress', { ...progress, id });
      });

      return (req as unknown) as Promise<BikeTagApiResponse<ImageData>>;
    });
    return await Promise.all(promises);
  }

  const form = createForm(payload);
  const req = client.request(UPLOAD_ENDPOINT, {
    method: 'POST',
    body: form,
    resolveBodyOnly: true,
  });

  const id = getSource(payload);
  req.on('uploadProgress', (progress) => {
    client.emit('uploadProgress', { ...progress, id });
  });

  return ((await req) as unknown) as BikeTagApiResponse<ImageData>;
}
