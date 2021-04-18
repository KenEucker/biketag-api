import { BikeTagClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { createForm } from '../common/utils';
import { Payload, BikeTagApiResponse } from '../common/types';

export interface UpdateTagImagePayload
  extends Pick<Payload, 'title' | 'description'> {
  imageHash: string;
}

function isValidUpdatePayload(p: UpdateTagImagePayload) {
  return typeof p.title === 'string' || typeof p.description === 'string';
}

export async function updateTagImage(
  client: BikeTagClient,
  payload: UpdateTagImagePayload | UpdateTagImagePayload[]
): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: UpdateTagImagePayload) => {
      if (!isValidUpdatePayload(p)) {
        throw new Error('Update requires a title and/or description');
      }

      const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
      const form = createForm(p);
      return (client.request(url, {
        method: 'POST',
        body: form,
        resolveBodyOnly: true,
      }) as unknown) as Promise<BikeTagApiResponse<boolean>>;
    });

    return await Promise.all(promises);
  }

  if (!isValidUpdatePayload(payload)) {
    throw new Error('Update requires a title and/or description');
  }

  const url = `${IMAGE_ENDPOINT}/${payload.imageHash}`;
  const form = createForm(payload);
  return ((await client.request(url, {
    method: 'POST',
    body: form,
    resolveBodyOnly: true,
  })) as unknown) as BikeTagApiResponse<boolean>;
}
