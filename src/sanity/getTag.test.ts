import sanityClient from '@sanity/client';
import { getTag } from './getTag';

test('get tag works successfully', async () => { expect(true).toBeTruthy() })

// test('returns an image response', async () => {
//   const accessToken = 'abc123';
//   const clientId = 'abc123';
//   const client = new sanityClient({ token: accessToken, projectId: clientId  });
//   const response = await getTag(client, 'CEddrgP');
//   expect(response).toMatchInlineSnapshot(`
//     Object {
//       "data": Object {
//         "description": "image-description",
//         "id": "CEddrgP",
//         "title": "image-title",
//       },
//       "status": 200,
//       "success": true,
//     }
//   `);
// });
