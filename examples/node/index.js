const {
  createReadStream
} = require('fs')
const {
  join
} = require('path')
const {
  BikeTagClient
} = require('../../dist/biketag.node.js')
require('dotenv').config()

const host = process.env.BIKETAG_API_HOST

const biketagDefaultInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  host,
}
const biketagDefaultInstance = host ? new BikeTagClient(biketagDefaultInstanceOpts) : null

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

const sanityInstanceOpts = {
  game: process.env.BIKETAG_GAME,
  host,
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: !!process.env.USE_CDN ? false : true,
  }
}
const bikeTagSanityInstance = sanityInstanceOpts.sanity && sanityInstanceOpts.sanity.projectId ? new BikeTagClient(sanityInstanceOpts) : null

const pretty = m => `\x1b[44m${m}\x1b[0m`
const log = (message, response, toLog = false) => {
  if (toLog) {
    if (response && response.status) {
      console.log(pretty(response.success ? message : 'error'), response.success ? response.data : response.error)
    } else if (!response) {
      console.log(pretty('Error!'), {
        response
      })

    } else {
      console.log(pretty(message), {
        response
      })
    }
  }
}

const getTag1Async = async (pre, client, out = false, opts = {}) => {
  const tag1 = await client.tags(1, opts).catch(console.error)
  log(`${pre} :: successfully retrieved tag 1 data by number`, tag1, out)

  return tag1
}

const getTodaysTagsAsync = async (pre, client, out = false, opts = {}) => {
  const todaysTags = await client.tags({ time :'day', limit: 10 }, opts).catch(console.error)
  log(`${pre} :: successfully todays tags data`, todaysTags, out)

  return todaysTags
}

const getQueueAsync = async (pre, client, out = false, opts = {}) => {
  const tags = await client.getQueue(undefined, opts).catch(console.error)
  log(`${pre} :: successfully retrieved queued tag data`, tags, out)
  console.log(tags[0])

  return tags
}

const queueTagAsync = async (pre, client, out = false, opts = {}) => {
  const foundImage = createReadStream(join(__dirname, 'ken.png'))
  const foundTag = {
    playerId: 'player-id-' + Date.now(),
    foundImage,
    tagnumber: 720,
    foundPlayer: 'Ken',
    foundLocation: 'here'
  }
  const queueTagResponse = await client.queueTag(foundTag, opts)
  log(`${pre} :: successfully queued tag`, queueTagResponse, out)

  return queueTagResponse
}

const get10TagsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const tags = await client.getTags(undefined, opts).catch(console.error)
  log(`${pre} :: successfully retrieved 10 tags data`, tags, out)
  console.log(tags[0])

  return tags
}

const getCurrentTagAsync = async (pre, client, out = false, opts = {}) => {
  const current = await client.getTag(undefined, opts).catch(console.error)
  log(`${pre} :: successfully retrieved current tag data`, current, out)

  return current
}

const getGameAsync = async (pre, client, out = false, opts = {}) => {
  const testGameData = await client.getGame(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved game data`, testGameData, out)

  return testGameData
}

const getAllGamesAsync = async (pre, client, out = false, opts = {}) => {
  const testGameData = await client.getGame({game: undefined}, opts).catch(console.error)
  log(`${pre} :: success fully retrieved game data`, testGameData, out)

  return testGameData
}

const get1PlayerAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const name = 'Ken'
  const testPlayerData = await client.getPlayer(name, opts).catch(console.error)
  log(`${pre} :: success fully retrieved player data for [${name}]`, testPlayerData, out)

  return testPlayerData
}

const get10PlayersAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testPlayerData = await client.getPlayers(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved 10 players data`, testPlayerData, out)

  return testPlayerData
}

const get10AmbassadorsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testAmbassadorData = await client.getAmbassadors(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved ambassador data`, testAmbassadorData, out)

  return testAmbassadorData
}

const get10SettingsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testSettingData = await client.getSettings(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved game settings`, testSettingData, out)

  return testSettingData
}

const get10AchievementsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testAchievementData = await client.getAchievements(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved game achievements`, testAchievementData, out)

  return testAchievementData
}

const getPlayerAchievementsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  opts.player = 'Ken'
  const testAchievementData = await client.getAchievements(undefined, opts).catch(console.error)
  log(`${pre} :: success fully retrieved player achievements for player [${opts.player}]`, testAchievementData, out)

  return testAchievementData
}

const runTests = async (out = false) => {
  if (false) {
    console.log(pretty("Default BikeTag Client Instantiated"), biketagDefaultInstanceOpts)
    await getGameAsync("BikeTag", biketagDefaultInstance, out)
    await getTag1Async("BikeTag", biketagDefaultInstance, out)
    // await getQueueAsync("BikeTag", biketagDefaultInstance, out)
    await get10TagsAsync("BikeTag", biketagDefaultInstance, out)
    await getCurrentTagAsync("BikeTag", biketagDefaultInstance, out)
    await get10PlayersAsync("BikeTag", biketagDefaultInstance, out)
  }

  if (false) {
  // if (bikeTagImgurInstance) {
    console.log(pretty("Imgur BikeTag Client Instantiated"), imgurInstanceOpts)
    await getGameAsync("Imgur", bikeTagImgurInstance, out)
    // await getTag1Async("Imgur", bikeTagImgurInstance, out)
    await getTodaysTagsAsync("Imgur", bikeTagImgurInstance, out)
    // await queueTagAsync("Imgur", bikeTagImgurInstance, out)
    // await getQueueAsync("Imgur", bikeTagImgurInstance, out)
    await getCurrentTagAsync("Imgur", bikeTagImgurInstance, out)
    await get10TagsAsync("Imgur", bikeTagImgurInstance, out)
    // await get10PlayersAsync("Imgur", bikeTagImgurInstance, out)
  }

  // if (false) {
  if (bikeTagSanityInstance) {
    console.log(pretty("Sanity BikeTag Client Instantiated"), sanityInstanceOpts)
    // await getTag1Async("Sanity", bikeTagSanityInstance, out)
    // await get10TagsAsync("Sanity", bikeTagSanityInstance, out)
    await getGameAsync("Sanity", bikeTagSanityInstance, out)
    // await getAllGamesAsync("Sanity", bikeTagSanityInstance, out)
    // await get10PlayersAsync("Sanity", bikeTagSanityInstance, out)
    // await get1PlayerAsync("Sanity", bikeTagSanityInstance, out)
    await get10AchievementsAsync("Sanity", bikeTagSanityInstance, out)
    // await get10AmbassadorsAsync("Sanity", bikeTagSanityInstance, out)
    // await get10SettingsAsync("Sanity", bikeTagSanityInstance, out)
    // await get10AchievementsAsync("Sanity", bikeTagSanityInstance, out)
    // await getPlayerAchievementsAsync("Sanity", bikeTagSanityInstance, out)
  }
}

if (require.main === module) {
  runTests(true)
}

module.exports = {
  BikeTagClient,
  bikeTagImgurInstance,
  bikeTagSanityInstance,
  getGameAsync,
  getCurrentTagAsync,
  getTag1Async,
  get10TagsAsync,
  imgurInstanceOpts,
  sanityInstanceOpts,
}