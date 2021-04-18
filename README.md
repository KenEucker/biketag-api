# BikeTag Clint Application Programming Interface

The new BikeTag javascript client, written entirely in typescript.

## Getting started

1. install via npm: 

```npm install biketag --save```

2. import/require:

```import {BikeTagClient} from 'biketag'```

or

```const {BikeTagClient} = require('biketag')```


3. configure:

```
const biketagAPI = new BikeTagClient({
    game: 'portland',
    clientKey: 'biketag-dev',
    clientToken: 'your-client-token',
})

const biketagPortland1 = await biketagAPI.getTag(1)
```

## Credits

This project is heavily influenced by the [node-imgur][node-imgur] package, the Imgur API and it's documentation, and Sanity.IO's javascript client.

Using the typescript library configured and developed on the node-imgur v2 project: https://github.com/kaimallea/node-imgur, this package comes bundled with testing using jest and automated releases using github actions. Many thanks to Kaimallea for collaborating with me on the imgur API because I learned so much along the way!

Support the BikeTag Project on [GitHub][github], [Patreon][patreon], or directly by going out and playing a round of [BikeTag in your city][biketag]!

[github]: https://github.com/sponsors/KenEucker
[patreon]: https://patreon.com/BikeTag
[biketag]: https://biketag.org
[node-imgur]: https://github.com/kaimallea/node-imgur
