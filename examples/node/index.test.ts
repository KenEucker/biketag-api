// @ts-ignore
import { getGameDataAsync, getTagAsync, BikeTagClient, sanityInstanceOpts, imgurInstanceOpts, getLatestTagAsync, getTagsAsync, getTag1Async } from './index'

test('BikeTagClient sanity instance can retrieve game data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testGameData = await getGameDataAsync(client)

  expect(testGameData).toMatchSnapshot()
})

test('BikeTagClient imgur instance can retrieve tag data', async () => {
  const client = new BikeTagClient(imgurInstanceOpts)
  const testTagData = await getTagAsync(client)

  expect(testTagData).toMatchSnapshot()
})

test('BikeTagClient sanity instance can retrieve tag data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testTagData = await getTagAsync(client)

  expect(testTagData).toMatchSnapshot()
})

test('BikeTagClient imgur instance can retrieve tag 1 data', async () => {
  const client = new BikeTagClient(imgurInstanceOpts)
  const testTagData = await getTag1Async(client)

  expect(testTagData).toMatchSnapshot()
})

test('BikeTagClient sanity instance can retrieve tag 1 data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testTagData = await getTag1Async(client)

  expect(testTagData).toMatchSnapshot()
})

// test('BikeTagClient reddit instance can retrieve latest tag data', async () => {
//   const client = new BikeTagClient(redditInstanceOpts)
//   const testTagData = await getTagAsync(client)

//   expect(testTagData).toMatchObject({
//     data: {
//       tagnumber: 1,
//       name: 'test-tag-1',
//       slug: 'test-tag-1',
//       game: 'test',
//       discussionUrl: undefined,
//       foundLocation: 'nowhere?',
//       player: 'hooooo',
//       hint: null,
//       mysteryImageUrl: 'https://i.imgur.com/6cXbPlZ.jpg',
//       foundImageUrl: 'https://i.imgur.com/UATbr0p.jpg',
//       gps: { lat: 0, long: 0, alt: 0 },
//     },
//     source: "imgur",
//     status: 200,
//     success: true,
//   })
// })

test('BikeTagClient imgur instance can retrieve latest tag data', async () => {
  const client = new BikeTagClient(imgurInstanceOpts)
  const testTagData = await getLatestTagAsync(client)

  expect(testTagData).toMatchSnapshot()
})

test('BikeTagClient sanity instance can retrieve latest tag data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testTagData = await getLatestTagAsync(client)

  expect(testTagData).toMatchSnapshot()
})

test('BikeTagClient imgur instance can retrieve all tags data', async () => {
  const client = new BikeTagClient(imgurInstanceOpts)
  const testTagsData = await getTagsAsync(client)

  expect(testTagsData).toMatchSnapshot()
})

test('BikeTagClient sanity instance can retrieve all tags data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testTagsData = await getTagsAsync(client)

  expect(testTagsData).toMatchSnapshot()
})