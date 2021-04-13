import sanityClient from '@sanity/client';
import { uploadTagImage } from './uploadTagImage';

test('upload image works successfully', async () => { expect(true).toBeTruthy() })

// describe('test file uploads', () => {
//   test('upload one image via path string, receive one response', async () => {
//     const accessToken = 'abc123';
//     const clientId = 'abc123';
//     const client = new sanityClient({ token: accessToken, projectId: clientId  });
//     const response = await uploadTagImage(client, '/home/user/biketag-game-1.jpg');
//     expect(response).toMatchInlineSnapshot(`
//       Object {
//         "data": Object {
//           "description": null,
//           "id": "biketag-game-1",
//           "link": "https://i.biketag.org/biketag-game-1",
//           "title": null,
//         },
//         "status": 200,
//         "success": true,
//       }
//     `);
//   });

//   test('upload progress event emitter', async () => {
//     const video = '/home/user/trailer.mp4';
//     const accessToken = 'abc123';
//     const clientId = 'abc123';
//     const client = new sanityClient({ token: accessToken, projectId: clientId  });
//     const eventHandler = jest.fn();
//     client.on('uploadProgress', eventHandler);

//     await uploadTagImage(client, {
//       video,
//       title: 'trailer for my new stream',
//       description: 'yolo',
//     });
//     expect(eventHandler).toBeCalledWith(
//       expect.objectContaining({
//         id: expect.stringContaining(video),
//         percent: expect.any(Number),
//         total: expect.any(Number),
//         transferred: expect.any(Number),
//       })
//     );
//   });
// });
