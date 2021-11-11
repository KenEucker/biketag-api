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

const getTagAsync = async (client, out = false, opts = {}) => {
  const tag1 = await client.getTag(`test-tag-1`, opts)
  if (out) console.log(tag1.success ? 'successfully retrieved tag 1 data by slug' : 'error', tag1.success ? tag1.data : tag1.status)

  return tag1
}

const getTag1Async = async (client, out = false, opts = {}) => {
  const tag1 = await client.getTag(1, opts)
  if (out) console.log(tag1.success ? 'successfully retrieved tag 1 data by number' : 'error', tag1.success ? tag1.data : tag1.status)

  return tag1
}

const getTagsAsync = async (client, out = false, opts = {}) => {
  const tags = await client.getTags(undefined, opts)
  if (out) console.log(tags.success ? 'successfully retrieved tags data' : 'error', tags.success ? tags.data : tags.status)

  return tags
}

const getLatestTagAsync = async (client, out = false, opts = {}) => {
  const latest = await client.getTag(undefined, opts)
  if (out) console.log(latest.success ? 'successfully retrieved latest tag data' : 'error', latest.success ? latest.data : latest.status)

  return latest
}

const getGameDataAsync = async (client, out = false, opts = {}) => {
  const testGameData = await client.getGameData('test', opts)
  if (out) console.log(testGameData.success ? 'success fully retrieved game data' : 'error', testGameData.success ? testGameData.data : testGameData.status)

  return testGameData
}

const runTests = async () => {
  if (bikeTagImgurInstance) {
    console.log("Tag #1 from Imgur")
    await getTagAsync(bikeTagImgurInstance, true)
    console.log("Latest Tag from Imgur")
    await getLatestTagAsync(bikeTagSanityInstance, true)
  }

  if (bikeTagSanityInstance) {
    console.log("Tag #1 from Sanity")
    await getTag1Async(bikeTagSanityInstance, true)
    console.log("All Tags from Sanity")
    await getTagsAsync(bikeTagSanityInstance, true)

    console.log("Game from Sanity")
    await getGameDataAsync(bikeTagSanityInstance, true)
  }

  if (bikeTagRedditInstance) {
    console.log("Latest Tag from Reddit")
    await getLatestTagAsync(bikeTagRedditInstance, true, {source: 'reddit'})
    console.log("All Tags from Reddit")
    await getTagsAsync(bikeTagRedditInstance, true, {source: 'reddit', time: 'all'})
  }
}

if (require.main === module) {
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
