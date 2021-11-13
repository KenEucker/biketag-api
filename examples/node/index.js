// @ts-ignore
const { BikeTagClient } = require('../../biketag.node.js')
require('dotenv').config()

const imgurInstanceOpts = {
  game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME :'test',
  imgur: {
    hash: process.env.IMGUR_HASH,
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
}
const bikeTagImgurInstance = imgurInstanceOpts.imgur && imgurInstanceOpts.imgur.hash ? new BikeTagClient(imgurInstanceOpts) : null

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
    console.log(pretty(response.success ? message : 'error', response.success ? response.data : response.status), {data: response.data, error: response.error})
  }
}

const getTagAsync = async (client, out = false, opts = {}) => {
  const tag1 = await client.getTag(`test-tag-1`, opts)
  log('successfully retrieved tag 1 data by slug', tag1, out)

  return tag1
}

const getTag1Async = async (client, out = false, opts = {}) => {
  const tag1 = await client.getTag(1, opts)
  log('successfully retrieved tag 1 data by number', tag1, out)

  return tag1
}

const getTagsAsync = async (client, out = false, opts = {}) => {
  const tags = await client.getTags(undefined, opts)
  log('successfully retrieved tags data', tags, out)

  return tags
}

const getLatestTagAsync = async (client, out = false, opts = {}) => {
  const latest = await client.getTag(undefined, opts)
  log('successfully retrieved latest tag data', latest, out)

  return latest
}

const getGameDataAsync = async (client, out = false, opts = {}) => {
  const testGameData = await client.getGameData('test', opts)
  log('success fully retrieved game data', testGameData, out)

  return testGameData
}

const runTests = async () => {
  if (bikeTagImgurInstance) {
    console.log(pretty("Tag #1 from Imgur"))
    await getTagAsync(bikeTagImgurInstance, true)
    console.log(pretty("Latest Tag from Imgur"))
    await getLatestTagAsync(bikeTagSanityInstance, true)
  }

  if (bikeTagSanityInstance) {
    console.log(pretty("Tag #1 from Sanity"))
    await getTag1Async(bikeTagSanityInstance, true)
    console.log(pretty("All Tags from Sanity"))
    await getTagsAsync(bikeTagSanityInstance, true)

    console.log("Game from Sanity")
    await getGameDataAsync(bikeTagSanityInstance, true)
  }

  if (bikeTagRedditInstance) {
    console.log(pretty("Latest Tag from Reddit"))
    await getLatestTagAsync(bikeTagRedditInstance, true, {source: 'reddit'})
    console.log(pretty("All Tags from Reddit"))
    await getTagsAsync(bikeTagRedditInstance, true, {source: 'reddit', time: 'all'})
  }
}

if (require.main === module) {
  if (bikeTagSanityInstance) getGameDataAsync(bikeTagSanityInstance, true)
  runTests()
}

module.exports = {
  BikeTagClient,
  bikeTagImgurInstance,
  bikeTagRedditInstance,
  bikeTagSanityInstance,
  getGameDataAsync,
  getLatestTagAsync,
  getTagAsync,
  getTag1Async,
  getTagsAsync,
  imgurInstanceOpts,
  redditInstanceOpts,
  sanityInstanceOpts,
}
