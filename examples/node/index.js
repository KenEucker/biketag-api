// @ts-ignore
const { BikeTagClient } = require('../../biketag.node.js')
require('dotenv').config()

const biketagDefaultInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME :'test',
}
const biketagDefaultInstance = null //new BikeTagClient(biketagDefaultInstanceOpts)

const imgurInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME :'test',
  imgur: {
    hash: process.env.IMGUR_HASH,
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
}
const bikeTagImgurInstance = imgurInstanceOpts.imgur && imgurInstanceOpts.imgur.hash ? new BikeTagClient(imgurInstanceOpts) : null

const twitterInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME :'test',
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
    console.log(pretty(response.success ? message : 'error', response.success ? response.data : response.error), {data: response.data ?? response})
  }
}

const getTag1Async = async (client, out = false, opts = {}) => {
  const tag1 = await client.tags(1, opts)
  log('successfully retrieved tag 1 data by number', tag1, out)

  return tag1
}

const getTagsAsync = async (client, out = false, opts = {}) => {
  const tags = await client.tags(undefined, opts)
  log('successfully retrieved tags data', tags, out)

  return tags
}

const getCurrentTagAsync = async (client, out = false, opts = {}) => {
  const current = await client.getTag(undefined, opts)
  log('successfully retrieved current tag data', current, out)

  return current
}

const getGameAsync = async (client, out = false, opts = {}) => {
  const testGameData = await client.game(undefined, opts)
  log('success fully retrieved game data', testGameData, out)

  return testGameData
}

const getPlayersAsync = async (client, out = false, opts = {}) => {
  const testPlayerData = await client.players(undefined, opts)
  log('success fully retrieved player data', testPlayerData, out)

  return testPlayerData
}

const getAmbassadorsAsync = async (client, out = false, opts = {}) => {
  const testAmbassadorData = await client.ambassadors(undefined, opts)
  log('success fully retrieved ambassador data', testAmbassadorData, out)

  return testAmbassadorData
}

const getSettingsAsync = async (client, out = false, opts = {}) => {
  const testSettingData = await client.settings(undefined, opts)
  log('success fully retrieved game settings', testSettingData, out)

  return testSettingData
}

const runTests = async (out = false) => {
  if (biketagDefaultInstance) {
    console.log(pretty("Default BikeTag Client Instantiated"), biketagDefaultInstanceOpts)
    console.log(pretty("Tag #1 from BikeTag"))
    await getTagsAsync(biketagDefaultInstance, out)
    console.log(pretty("Current Tag from BikeTag"))
    // await getCurrentTagAsync(biketagDefaultInstance, out)
  }

  if (bikeTagImgurInstance) {
    console.log(pretty("Imgur BikeTag Client Instantiated"), imgurInstanceOpts)
    console.log(pretty("Tag #1 from Imgur"))
    await getTag1Async(bikeTagImgurInstance, out)
    console.log(pretty("Current Tag from Imgur"))
    await getCurrentTagAsync(bikeTagImgurInstance, out)
    console.log(pretty("All Tags from Imgur"))
    await getTagsAsync(bikeTagImgurInstance, out)
    console.log(pretty("All Players from Imgur"))
    await getPlayersAsync(bikeTagImgurInstance, out)
    console.log("Game from Imgur")
    await getGameAsync(bikeTagImgurInstance, out)
  }

  if (bikeTagSanityInstance) {
    console.log(pretty("Sanity BikeTag Client Instantiated"), sanityInstanceOpts)
    console.log(pretty("Tag #1 from Sanity"))
    await getTag1Async(bikeTagSanityInstance, out)
    console.log(pretty("All Tags from Sanity"))
    await getTagsAsync(bikeTagSanityInstance, out)

    console.log("Game from Sanity")
    await getGameAsync(bikeTagSanityInstance, out)
    console.log(pretty("All Players from Sanity"))
    await getPlayersAsync(bikeTagSanityInstance, out)
    console.log(pretty("All Ambassadors from Sanity"))
    await getAmbassadorsAsync(bikeTagSanityInstance, out)

    console.log("Game Settings from Sanity")
    await getSettingsAsync(bikeTagSanityInstance, out)
  }

  if (bikeTagTwitterInstance) {
    console.log(pretty("Twitter BikeTag Client Instantiated"), twitterInstanceOpts)
    console.log(pretty("Current Tag from Twitter"))
    await getCurrentTagAsync(bikeTagTwitterInstance)
    console.log(pretty("All Tags from Twitter"))
    await getTagsAsync(bikeTagTwitterInstance, out)
  }

  if (bikeTagRedditInstance) {
    console.log(pretty("Reddit BikeTag Client Instantiated"), redditInstanceOpts)
    console.log(pretty("Current Tag from Reddit"))
    await getCurrentTagAsync(bikeTagRedditInstance, out, {source: 'reddit'})
    console.log(pretty("All Tags from Reddit"))
    await getTagsAsync(bikeTagRedditInstance, out, {source: 'reddit', time: 'all'})
  }
}

if (require.main === module) {
  if (bikeTagSanityInstance) getGameAsync(bikeTagSanityInstance, true)
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
  getTagsAsync,
  imgurInstanceOpts,
  redditInstanceOpts,
  sanityInstanceOpts,
}
