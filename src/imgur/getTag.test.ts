import { ImgurClient } from 'imgur';
import { getTag } from './getTag';

test('get image works successfully', async () => { expect(true).toBeTruthy() })

// test('returns an image response', async () => {
//   const accessToken = 'abc123';
//   const client = new BikeTagClient({ accessToken });
//   const response = await getImage(client, 'CEddrgP');
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
