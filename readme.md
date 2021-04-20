<h1 align="center" style="border-bottom: none;">biketag</h1>
<h3 align="center">BikeTag Official JavaScript library</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/biketag/v/latest">
    <img alt="npm next version" src="https://img.shields.io/npm/v/biketag/latest.svg">
  </a>
  <a href="https://github.com/keneucker/biketag-api/actions?query=workflow%3ATests+branch%3Anext">
    <img alt="Build states" src="https://github.com/keneucker/biketag-api/workflows/Tests/badge.svg">
  </a>
</p>
<p align="center">
  <a href="https://github.com/keneucker/biketag-api/discussions">
    <img alt="Join the community on GitHub Discussions" src="https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue">
  </a>
</p>

## Installation

```shell
npm install biketag
```

Or find a specific versions to pin on [our npm page](https://www.npmjs.com/package/biketag/v/latest?activeTab=versions).

## Usage

### Import and instantiate with credentials:

```ts
// ESModule syntax
import { BikeTagClient } from 'biketag'

// CommonJS syntax
const { BikeTagClient } = require('biketag')

let client

// if you already have an access token acquired
client = new BikeTagClient({
  game: 'portland',
  clientToken: process.env.BIKETAG_ACCESS_TOKEN,
})

// or your imgur client ID and clientSecret
client = new BikeTagClient({
  game: 'portland',
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
})

// or your username/clientKey/clientToken to retrieve an access token automatically:
client = new BikeTagClient({
  game: 'portland',
  clientKey: process.env.BIKETAG_CLIENT_SECRET,
  clientToken: process.env.BIKETAG_CLIENT_TOKEN,
})
```

The acceptable fields for a BikeTagConfiguration object are outlined below:

|     Key/Api     | Description                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `game`          | [BikeTag] a string of the name of the game to load                                                                                  |
| `hash`          | [BikeTag] A string of the album hash to load for the game (Imgur)                                                                   |
| `clientKey`     | [BikeTag] The biketag Client Key for your access to the BikeTag API                                                                 |
| `clientToken`   | [BikeTag] The biketag Client Token for your access to the BikeTag API                                                               |
| `accessToken`   | [BikeTag] The biketag Cccess Token acquired via authorization (externally)                                                          |
| `clientId`      | [Imgur] The imgur Client ID to use when pulling data from Imgur as a source                                                         |
| `clientSecret`  | [Imgur] The imgur Client Secret to use when authenticating using the ImgurClient                                                    |
| `accessToken`   | [Imgur] The Imgur Access Token acquired via authorization (externally)                                                              |
| `projectId`     | [Sanity] The sanity Project Id                                                                                                      |
| `username`      | [Sanity] The sanity username to use for authentication                                                                              |
| `password`      | [Sanity] The sanity user password to use for authenticaiton                                                                         |
| `apiVersion`    | [Sanity] use current UTC date - see "specifying API version" in Sanity.IO docs                                                      |
| `useCdn`        | [Sanity] `false` if you want to ensure fresh data                                                                                   |
| `token`         | [Sanity] The sanity Access Token acquired via authorization (externally)                                                            |

### **⚠️ For brevity, the rest of the examples will leave out the import and/or instantiation step.**

### Get Tags

You can upload one or more files by simply passing a path to a file or array of paths to multiple files.

```js
// retrieves the latest BikeTag posted for the 'portland' game
const biketagPortlandLatest = await biketagAPI.getTag()

// retrieves the BikeTag #1 for the 'portland' game
const biketagPortland1 = await biketagAPI.getTag(1)

// retrieves the all BikeTags for the 'portland' game
const allPortlandTags = await biketagAPI.getTags()
```

## Credits

This project is heavily influenced by the [node-imgur][node-imgur] package, the Imgur API and it's documentation, and Sanity.IO's javascript client.

Using the typescript library configured and developed on the node-imgur v2 project: https://github.com/kaimallea/node-imgur, this package comes bundled with testing using jest and automated releases using github actions. Many thanks to Kaimallea for collaborating with me on the imgur API because I learned so much along the way!

Support the BikeTag Project on [GitHub][github], [Patreon][patreon], or directly by going out and playing a round of [BikeTag in your city](https://biketag.org)!

[github]: https://github.com/sponsors/KenEucker
[patreon]: https://patreon.com/BikeTag
[node-imgur]: https://github.com/kaimallea/node-imgur
[sanity]: https://www.sanity.io/docs/api-versioning
[imgur]: https://www.npmjs.com/package/imgur/v/next

## Vendors

Structured content powered by Sanity.io

[![Sanity.io][sanity-image]](https://sanity.io)

[sanity-image]: https://raw.githubusercontent.com/keneucker/biketag-app/production/public/img/sanity-logo.png