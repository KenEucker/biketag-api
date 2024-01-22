const {
  BikeTagClient
} = require('../../dist/index.js')
require('dotenv').config()

const host = process.env.BIKETAG_API_HOST

const sanityInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  host,
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: !!process.env.USE_CDN ? false : true,
  }
}
const bikeTagSanityInstance = sanityInstanceOpts.sanity && sanityInstanceOpts.sanity.projectId ? new BikeTagClient(sanityInstanceOpts) : null

const imgurInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  host,
  imgur: {
    hash: process.env.IMGUR_HASH,
    queuehash: process.env.IMGUR_QUEUEHASH,
    clientId: process.env.IMGUR_CLIENT_ID,
    accessToken: process.env.IMGUR_ACCESS_TOKEN,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
  }
}
const bikeTagImgurInstance = imgurInstanceOpts.imgur && imgurInstanceOpts.imgur.clientId ? new BikeTagClient(imgurInstanceOpts) : null

const updateGame = async (client) => {
  if (client) {
    console.log('calling updateGame')
    const updateGameResponse = await client.updateGame({
      slug: 'seoul',
      name: 'Seoul',
      mainhash: 'DX9ichM',
    })
    console.log({ updateGameResponse })
  }
}

const updateTag = async (client) => {
  if (client) {
    console.log('calling updateTag')
    const updateTagResponse = await client.updateTag({
      game: 'seoul',
      tagnumber: 1,
      mysteryImageUrl: 'https://i.imgur.com/2lsj26s.png',
    }, {
      hash: 'DX9ichM',
    })
    console.log({ updateTagResponse })
  }
}

const updatePlayer = async (client) => {
  if (client) {
    console.log('calling updatePlayer')
    const updateTagResponse = await client.updatePlayer({
      name: 'test',
      bicon: 'https://i.imgur.com/2lsj26s.png',
      // achievements: [],
      games: [],
      // games: ['portland','seattle'],
      achievements: ['3-day-streak'],
    })
    console.log({ updateTagResponse }, updateTagResponse?.data)
  }
}

// updateGame(bikeTagSanityInstance)
// updateTag(bikeTagImgurInstance)
updatePlayer(bikeTagSanityInstance)
