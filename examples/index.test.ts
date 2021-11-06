// @ts-ignore
import { getGameDataAsync, getTagAsync, BikeTagClient, sanityInstanceOpts, imgurInstanceOpts } from './index'

test('BikeTagClient sanity instance can retrieve game data', async () => {
  const client = new BikeTagClient(sanityInstanceOpts)
  const testGameData = await getGameDataAsync(client)

  expect(testGameData).toMatchObject({
    data: {
      name: 'Test',
      ambassadors: [ 'Ken' ],
      boundary: { _type: 'geopoint', lat: 40.6516223, lng: -119.3567677 },
      logo: '',
      region: 'Gerlach',
      slug: 'test',
    },
    source: "sanity",
    status: 1,
    success: true,
  })
})

test('BikeTagClient imgur instance can retrieve tag data', async () => {
  const client = new BikeTagClient(imgurInstanceOpts)
  const testTagData = await getTagAsync(client)

  expect(testTagData).toMatchObject({
    data: {
      tagnumber: 1,
      name: 'test-tag-1',
      slug: 'test-tag-1',
      game: 'test',
      discussionUrl: undefined,
      foundLocation: 'nowhere?',
      player: 'hooooo',
      hint: null,
      mysteryImageUrl: 'https://i.imgur.com/6cXbPlZ.jpg',
      foundImageUrl: 'https://i.imgur.com/UATbr0p.jpg',
      gps: { lat: 0, long: 0, alt: 0 },
    },
    source: "imgur",
    status: 200,
    success: true,
  })
})
