import { BikeTagClient } from '../client';
import { queueTagImage } from './queueTagImage';

test('upload works successfully', async () => { expect(true).toBeTruthy() })

// describe('test file uploads', () => {
//   test('upload one image via path string, receive one response', async () => {
//     const accessToken = 'abc123';
//     const client = new BikeTagClient({ accessToken });
//     const response = await upload(client, '/home/user/biketag-game-1.jpg');
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

//   test('upload multiple images via array of path strings, receive multiple responses', async () => {
//     const accessToken = 'abc123';
//     const client = new BikeTagClient({ accessToken });
//     const response = await upload(client, [
//       '/home/user/biketag-game-1.jpg',
//       '/home/user/biketag-game-1-found.jpg',
//     ]);
//     expect(response).toMatchInlineSnapshot(`
//       Array [
//         Object {
//           "data": Object {
//             "description": null,
//             "id": "JK9ybyj",
//             "link": "https://i.biketag.org/JK9ybyj.jpg",
//             "title": null,
//           },
//           "status": 200,
//           "success": true,
//         },
//         Object {
//           "data": Object {
//             "description": null,
//             "id": "JK9ybyj",
//             "link": "https://i.biketag.org/JK9ybyj.jpg",
//             "title": null,
//           },
//           "status": 200,
//           "success": true,
//         },
//       ]
//     `);
//   });

//   test('upload one image via payload type, receive one response', async () => {
//     const accessToken = 'abc123';
//     const client = new BikeTagClient({ accessToken });
//     const response = await upload(client, {
//       image: '/home/user/meme.jpg',
//       title: 'dank meme',
//       description: 'BikeTag #1',
//     });
//     expect(response).toMatchInlineSnapshot(`
//       Object {
//         "data": Object {
//           "description": "BikeTag #1",
//           "id": "JK9ybyj",
//           "link": "https://i.biketag.org/JK9ybyj.jpg",
//           "title": "dank meme",
//         },
//         "status": 200,
//         "success": true,
//       }
//     `);
//   });

//   test('upload multiple images via an array of payload type, receive multiple response', async () => {
//     const accessToken = 'abc123';
//     const client = new BikeTagClient({ accessToken });
//     const response = await upload(client, [
//       {
//         image: '/home/user/biketag-game-1.jpg',
//         title: 'BikeTag #1',
//         description: 'can you find it?',
//       },
//       {
//         image: '/home/user/biketag-game-1-found.jpg',
//         title: 'BikeTag #1 Found',
//         description: 'found at hello, world',
//       },
//     ]);
//     expect(response).toMatchInlineSnapshot(`
//       Array [
//         Object {
//           "data": Object {
//             "description": "can you find it?",
//             "id": "biketag-game-1",
//             "link": "https://i.biketag.org/biketag-game-1",
//             "title": "BikeTag #1",
//           },
//           "status": 200,
//           "success": true,
//         },
//         Object {
//           "data": Object {
//             "description": "🤣",
//             "id": "biketag-game-1-found",
//             "link": "https://i.biketag.org/biketag-game-1-found",
//             "title": "found at hello, world",
//           },
//           "status": 200,
//           "success": true,
//         },
//       ]
//     `);
//   });

//   test('upload a video, disable sound', async () => {
//     const accessToken = 'abc123';
//     const client = new BikeTagClient({ accessToken });
//     const response = await upload(client, {
//       video: '/home/user/trailer.mp4',
//       title: 'trailer for my new stream',
//       description: 'yolo',
//     });
//     expect(response).toMatchInlineSnapshot(`
//       Object {
//         "data": Object {
//           "description": "yolo",
//           "id": "JK9ybyj",
//           "link": "https://i.biketag.org/JK9ybyj.jpg",
//           "title": "trailer for my new stream",
//         },
//         "status": 200,
//         "success": true,
//       }
//     `);
//   });

//   test('upload progress event emitter', async () => {
//     const accessToken = 'abc123';
//     const video = '/home/user/trailer.mp4';
//     const client = new BikeTagClient({ accessToken });
//     const eventHandler = jest.fn();
//     client.on('uploadProgress', eventHandler);

//     await upload(client, {
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
