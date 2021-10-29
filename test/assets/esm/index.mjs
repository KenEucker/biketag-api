import biketagPkg from 'biketag'
const { BikeTagClient } = biketagPkg

const defaultExportClient = new BikeTagClient({
  game: 'test',
  hash: 'QjnikOm',
  clientId: '4fa12c6ce36984b',
  clientSecret: '14dd920076de25884a1b900341022a84d78076bf',
})

const getTagAsync = async (client) => {
  const status = await client.getTag().status

  process.stdout.write(status.toString())
}

getTagAsync(defaultExportClient)
