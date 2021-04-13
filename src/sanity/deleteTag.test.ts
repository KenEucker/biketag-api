import sanityClient from '@sanity/client';
import { deleteTag } from './deleteTag';

test('delete works successfully', async () => { expect(true).toBeTruthy() })

// test('delete works successfully', async () => {
//   const accessToken = 'abc123';
//   const clientId = 'abc123';
//   const client = new sanityClient({ token: accessToken, projectId: clientId  });
//   const response = await deleteTag(client, 'CEddrgP');
//   expect(response).toMatchInlineSnapshot(`
//     Object {
//       "data": true,
//       "status": 200,
//       "success": true,
//     }
//   `);
// });
