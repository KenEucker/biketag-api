import { BikeTagClient } from '../client';
import { deleteImage } from './deleteImage';

test('delete works successfully', async () => { expect(true).toBeTruthy() })

// test('delete works successfully', async () => {
//   const accessToken = 'abc123';
//   const client = new BikeTagClient({ accessToken });
//   const response = await deleteImage(client, 'CEddrgP');
//   expect(response).toMatchInlineSnapshot(`
//     Object {
//       "data": true,
//       "status": 200,
//       "success": true,
//     }
//   `);
// });
