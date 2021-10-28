const BikeTagClient = require('../dist/biketag.node.js')

const opts = {
  game: 'test',
  hash: 'QjnikOm',
  clientId: '4fa12c6ce36984b',
  clientSecret: '14dd920076de25884a1b900341022a84d78076bf',
}
const fromClass = new BikeTagClient(opts)
const latestTag = fromClass.getTag()
console.log({ BikeTagClient, opts, latestTag })

const getTagAsync = async (client) => {
  const tag1 = await client.getTag(1)
  console.log({ tag1 })
}

getTagAsync(fromClass)
