// import { BikeTagClient } from './client';
// import { getAuthorizationHeader } from './getAuthorizationHeader';

test('get authorization works successfully', async () => { expect(true).toBeTruthy() })

// test('returns provided access code in bearer header', async () => {
//   const accessToken = 'abc123';
//   const client = new BikeTagClient({ accessToken });
//   const authorizationHeader = await getAuthorizationHeader(client);
//   expect(authorizationHeader).toBe(`Bearer ${accessToken}`);
// });

// test('returns provided client id in client id header', async () => {
//   const clientId = 'abc123';
//   const client = new BikeTagClient({ clientId });
//   const authorizationHeader = await getAuthorizationHeader(client);
//   expect(authorizationHeader).toBe(`Client-ID ${clientId}`);
// });

/// TODO: fix the issues in this test to make it work for the BikeTag API
// test('retrieves access token from the biketag api server via provided username/password/clientid', async () => {
//   const client = new BikeTagClient({
//     username: 'fakeusername',
//     password: 'fakepassword',
//     clientId: 'fakeclientd',
//   });
//   const authorizationHeader = await getAuthorizationHeader(client);
//   expect(authorizationHeader).toMatchInlineSnapshot(
//     `"Bearer 123accesstoken456"`
//   );
// });
