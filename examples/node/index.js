// @ts-ignore
const {
  BikeTagClient
} = require('../../biketag.node.js')
require('dotenv').config()

const biketagDefaultInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
}
const biketagDefaultInstance = null //new BikeTagClient(biketagDefaultInstanceOpts)

const imgurInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  imgur: {
    hash: process.env.IMGUR_HASH,
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
}
const bikeTagImgurInstance = imgurInstanceOpts.imgur && imgurInstanceOpts.imgur.clientId ? new BikeTagClient(imgurInstanceOpts) : null

const twitterInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  twitter: {
    account: process.env.TWITTER_ACCOUNT,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  }
}
const bikeTagTwitterInstance = twitterInstanceOpts.twitter && twitterInstanceOpts.twitter.account ? new BikeTagClient(twitterInstanceOpts) : null


const sanityInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    accessToken: process.env.SANITY_ACCESS_TOKEN,
    dataset: process.env.SANITY_DATASET,
    useCdn: !!process.env.SANITY_PROJECT_ID ? false : true,
  }
}
const bikeTagSanityInstance = sanityInstanceOpts.sanity && sanityInstanceOpts.sanity.projectId ? new BikeTagClient(sanityInstanceOpts) : null

const redditInstanceOpts = {
  ...imgurInstanceOpts,
  reddit: {
    subreddit: process.env.REDDIT_SUBREDDIT ? process.env.REDDIT_SUBREDDIT : 'cyclepdx',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  }
}
const bikeTagRedditInstance = redditInstanceOpts.reddit && redditInstanceOpts.reddit.clientId ? new BikeTagClient(redditInstanceOpts) : null

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
  const tag1 = await client.tags(1, opts)
  log(`${pre} :: successfully retrieved tag 1 data by number`, tag1, out)

  return tag1
}

const get10TagsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const tags = await client.tags(undefined, opts)
  log(`${pre} :: successfully retrieved tags data`, tags, out)

  return tags
}

const getCurrentTagAsync = async (pre, client, out = false, opts = {}) => {
  const current = await client.getTag(undefined, opts)
  log(`${pre} :: successfully retrieved current tag data`, current, out)

  return current
}

const getGameAsync = async (pre, client, out = false, opts = {}) => {
  const testGameData = await client.game(undefined, opts)
  log(`${pre} :: success fully retrieved game data`, testGameData, out)

  return testGameData
}

const get10PlayersAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testPlayerData = await client.players(undefined, opts)
  log(`${pre} :: success fully retrieved player data`, testPlayerData, out)

  return testPlayerData
}

const get10AmbassadorsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testAmbassadorData = await client.ambassadors(undefined, opts)
  log(`${pre} :: success fully retrieved ambassador data`, testAmbassadorData, out)

  return testAmbassadorData
}

const get10SettingsAsync = async (pre, client, out = false, opts = {}) => {
  opts.limit = opts.limit ? opts.limit : 10
  const testSettingData = await client.settings(undefined, opts)
  log(`${pre} :: success fully retrieved game settings`, testSettingData, out)

  return testSettingData
}

const runTests = async (out = false) => {
  if (biketagDefaultInstance) {
    console.log(pretty("Default BikeTag Client Instantiated"), biketagDefaultInstanceOpts)
    await get10TagsAsync(biketagDefaultInstance, out)
    // await getCurrentTagAsync(biketagDefaultInstance, out)
  }

  if (bikeTagImgurInstance) {
    console.log(pretty("Imgur BikeTag Client Instantiated"), imgurInstanceOpts)
    await getGameAsync("Imgur", bikeTagImgurInstance, out)
    await getTag1Async("Imgur", bikeTagImgurInstance, out)
    await getCurrentTagAsync("Imgur", bikeTagImgurInstance, out)
    await get10TagsAsync("Imgur", bikeTagImgurInstance, out)
    await get10PlayersAsync("Imgur", bikeTagImgurInstance, out)
  }

  if (bikeTagSanityInstance) {
    console.log(pretty("Sanity BikeTag Client Instantiated"), sanityInstanceOpts)
    await getTag1Async("Sanity", bikeTagSanityInstance, out)
    await get10TagsAsync("Sanity", bikeTagSanityInstance, out)
    await getGameAsync("Sanity", bikeTagSanityInstance, out)
    await get10PlayersAsync("Sanity", bikeTagSanityInstance, out)
    await get10AmbassadorsAsync("Sanity", bikeTagSanityInstance, out)
    await get10SettingsAsync("Sanity", bikeTagSanityInstance, out)
  }

  if (bikeTagTwitterInstance) {
    console.log(pretty("Twitter BikeTag Client Instantiated"), twitterInstanceOpts)
    await getCurrentTagAsync("Twitter", bikeTagTwitterInstance)
    await get10TagsAsync("Twitter", bikeTagTwitterInstance, out)
  }

  if (bikeTagRedditInstance) {
    console.log(pretty("Reddit BikeTag Client Instantiated"), redditInstanceOpts)
    await getCurrentTagAsync("Reddit", bikeTagRedditInstance, out)
    await get10TagsAsync("Reddit", bikeTagRedditInstance, out)
  }
}

if (require.main === module) {
  runTests(true)
}

module.exports = {
  BikeTagClient,
  bikeTagImgurInstance,
  bikeTagRedditInstance,
  bikeTagSanityInstance,
  bikeTagTwitterInstance,
  getGameAsync,
  getCurrentTagAsync,
  getTag1Async,
  get10TagsAsync,
  imgurInstanceOpts,
  redditInstanceOpts,
  sanityInstanceOpts,
}