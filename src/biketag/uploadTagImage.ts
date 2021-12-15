// import { BikeTagClient } from '../client'
// import { UPDATE_ENDPOINT } from '../common/endpoints'
// import { Payload, BikeTagApiResponse } from '../common/types'

// export interface UploadTagImagePayload
//   extends Pick<Payload, 'title' | 'description'> {
//   slug: string
// }

// // function isValidUpdatePayload(p: UploadTagImagePayload) {
// //   return typeof p.title === 'string' || typeof p.description === 'string';
// // }

// export async function uploadTagImage(
//   client: BikeTagClient,
//   payload: UploadTagImagePayload
// ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
//   // if (Array.isArray(payload)) {
//   //   const promises = payload.map((p: UploadTagImagePayload) => {
//   //     if (!isValidUpdatePayload(p)) {
//   //       throw new Error('Update requires a title and/or description');
//   //     }

//   //     const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
//   //     const form = createForm(p);
//   //     return (client.request(url, {
//   //       method: 'POST',
//   //       body: form,
//   //       resolveBodyOnly: true,
//   //     }) as unknown) as Promise<BikeTagApiResponse<boolean>>;
//   //   });

//   //   return await Promise.all(promises);
//   // }

//   // if (!isValidUpdatePayload(payload)) {
//   //   throw new Error('Update requires a title and/or description');
//   // }

//   const url = `${UPDATE_ENDPOINT}/${payload.slug}`
//   return (await client.request({ url, method: 'DELETE' }))
//     .data as unknown as BikeTagApiResponse<boolean>

//   // // const form = createForm(payload);
//   // return ((await client.request(url, {
//   //   method: 'POST',
//   //   body: form,
//   //   resolveBodyOnly: true,
//   // })) as unknown) as BikeTagApiResponse<boolean>;
// }
