# BikeTag Client Application Programming Interface

The new BikeTag javascript client, written entirely in typescript. This API uses three different API servers to obtain BikeTag Game data.

## Getting started

1. install via npm:

`npm install biketag --save`

2. import/require:

`import { BikeTagClient } from 'biketag'`

or

`const { BikeTagClient, BikeTagCredentials } = require('biketag')`

3. configure:

```
// according to the type of BikeTagCredentials, which is what you pass to the BikeTagClient constructor, the 'game' field is required
const biketagAPI = new BikeTagClient({
    game: 'portland',
    clientKey: 'biketag-dev',
    clientToken: 'your-client-token',
})

// retrieves the "latest" BikeTag for the 'portland' game
const biketagPortland1 = await biketagAPI.getTag()

// retrieves the BikeTag #1 for the 'portland' game
const biketagPortland1 = await biketagAPI.getTag(1)

// retrieves the all BikeTags for the 'portland' game
const allPortlandTags = await biketagAPI.getTags()
```

## Credits

This project is heavily influenced by the [node-imgur][node-imgur] package, the Imgur API and it's documentation, and Sanity.IO's javascript client.

Using the typescript library configured and developed on the node-imgur v2 project: https://github.com/kaimallea/node-imgur, this package comes bundled with testing using jest and automated releases using github actions. Many thanks to Kaimallea for collaborating with me on the imgur API because I learned so much along the way!

Support the BikeTag Project on [GitHub][github], [Patreon][patreon], or directly by going out and playing a round of [BikeTag in your city][biketag]!

[github]: https://github.com/sponsors/KenEucker
[patreon]: https://patreon.com/BikeTag
[biketag]: https://biketag.org
[node-imgur]: https://github.com/kaimallea/node-imgur
