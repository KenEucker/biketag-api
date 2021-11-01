// @ts-ignore
const { BikeTagClient } = require('../dist/biketag.node.js')

const imgurInstanceOpts = {
  game: 'test',
  hash: 'QjnikOm',
  clientId: '4fa12c6ce36984b',
  clientSecret: '14dd920076de25884a1b900341022a84d78076bf',
}
const bikeTagImgurInstance = new BikeTagClient(imgurInstanceOpts)

const sanityInstanceOpts = {
  game: 'test',
  projectId: 'x37ikhvs',
  accessToken:
    'skT5BHdVV4KxSzf2ugg1gg8P7fR1ws22Yk0Al3H2fEsSJ3KvAmR4TivtHlHeV5Ww9kIiO36TsPkEofZ39IBxZ03GKcOZqeExE2mgHXxEv9KuslRJezBQK55oYXll9kQqKwHSU3skZ3plLzRsRPosiOiyn8BJg43xcsyQuvovXKxFg4Bh907n',
  dataset: 'production',
  useCdn: false,
}
const bikeTagSanityInstance = new BikeTagClient(sanityInstanceOpts)

const getTagAsync = async (client, out = false) => {
  const tag1 = await client.getTag(1)
  if (out) console.log(tag1.success ? 'successfully retrieved tag data' : 'error', tag1.success ? tag1.data : tag1.status)

  return tag1
}

const getGameDataAsync = async (client, out = false) => {
  const testGameData = await client.getGameData('test')
  if (out) console.log(testGameData.success ? 'success fully retrieved game data' : 'error', testGameData.success ? testGameData.data : testGameData.status)

  return testGameData
}

// if (true) {
//   getTagAsync(bikeTagImgurInstance, true)
//   getGameDataAsync(bikeTagSanityInstance, true)
// }

module.exports = {
  imgurInstanceOpts,
  sanityInstanceOpts,
  BikeTagClient,
  getGameDataAsync,
  getTagAsync,
}
