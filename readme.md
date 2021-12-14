<h1 align="center" style="border-bottom: none;">biketag</h1>
<h3 align="center">BikeTag Official JavaScript library</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/biketag/v/latest">
    <img alt="npm next version" src="https://img.shields.io/npm/v/biketag/latest.svg">
  </a>
  <a href="https://github.com/keneucker/biketag-api/actions?query=workflow%3ATests+branch%3Anext">
    <img alt="Build states" src="https://github.com/keneucker/biketag-api/workflows/Tests/badge.svg">
  </a>
  <br>
  <a href="https://creativecommons.org/licenses/by-sa/4.0/">
    <img src='https://img.shields.io/github/license/KenEucker/biketag-api' alt='license'>
  </a>
  <br>
  <a href="https://github.com/sponsors/KenEucker">
    <img alt="Sponsors" src="https://img.shields.io/github/sponsors/keneucker">
  </a>
  <a href="https://gitter.im/biketagorg/community">
    <img alt="Sponsors" src="https://badges.gitter.im/gitterHQ/gitter.png">
  </a>
</p>
<p align="center">
  <a href="https://github.com/keneucker/biketag-api/discussions">
    <img alt="Join the community on GitHub Discussions" src="https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue">
  </a>
</p>

<div align="center">
<img alt="biketag-api logo" src="https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/biketag-api-logo.jpg" height="auto" width="200" style="border-radius:25%;">
</div>

<div align="center">

## Installation
_This package is Isomorphic and Typescript ready_

`npm install biketag`

</div>

## How to include it in your projects

The library is a default export, as well as a named class export `BikeTagClient`. You can retrieve it from jsDeliver or npm, and it works in both the browser and nodejs.

### Browser

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/biketag/client.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/npm/client.js"></script>
```

### CommonJS

import/require the module:
```ts
// Using import statement
import { BikeTagClient } from 'biketag'
```

```js
// Using require()
const { BikeTagClient } = require('biketag')
```

---

## Usage

### Instantiate with or without credentials (browser):
```js
// if you have your clientKey/clientToken to retrieve an access token automatically, you can pass those in:
const client = new biketag({
  game: 'portland',
  clientKey: process.env.BIKETAG_CLIENT_KEY,
  clientToken: process.env.BIKETAG_CLIENT_TOKEN,
})
```

### Instantiate with or without credentials (node):
```ts
// if you have Imgur credentials: clientId and clientSecret
const client = new BikeTagClient({
  game: 'portland',
  imgur: {
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
})
```
<div align="center">

### Configuration

The BikeTag API requires only the game to be set in the configuration in order to read BikeTag data. You can read more about specific configurations in the documentation: 

</div>

### **⚠️ For brevity, the rest of the examples will leave out the import and/or instantiation step.**


### Get Game Information

You can get game information by providing the name.

```ts
// retrieves the BikeTag game data 'portland' game
const biketagPortland = await client.game('portland')
```

### Get Tags

You can get tags one by one or all at once for a given game using the `getTag` and `getTags` methods. You can also explicitely set the data adapter to any of the configurable sources (biketag, imgur, sanity, reddit, twitter):

```ts
// retrieves the BikeTag game data 'portland' game
const biketagPortland = await client.game('portland')

// retrieves the latest BikeTag posted for the 'portland' game from the most available API
const biketagPortlandCurrent = await client.getTag()

// retrieves the BikeTag #1 for the 'portland' game from imgur adapter
const biketagPortland1 = await client.tags(1, { source: 'imgur' })

// retrieves the all BikeTags for the 'portland' game from sanity adapter
const allPortlandTags = await client.tags(undefined, { source: 'sanity' })

// retrieves the BikeTags for the first five tags for the 'portland' game from the reddit adapter
const firstFivePortlandTags = await client.tags([1,2,3,4,5], { source: 'reddit' })
```

### Get Players

You can get the players of a game by calling getPlayers

```ts
// retrieves the BikeTag player data 'portland' game
const biketagPortlandPlayers = await biketagAPI.getPlayers('portland')
```

<div align="center">

## Credits

</div>

This project is heavily influenced by the [node-imgur][node-imgur] package, the Imgur API and it's documentation, and Sanity.IO's javascript client.

Using the typescript library configured and developed on the node-imgur v2 project: https://github.com/kaimallea/node-imgur, this package comes bundled with testing using jest and automated releases using github actions. Many thanks to Kaimallea for collaborating with me on the imgur API because I learned so much along the way!

Support the BikeTag Project on [GitHub][github], [Patreon][patreon], or directly by going out and playing a round of [BikeTag in your city](https://client.org)!

[twitter]: https://developer.twitter.com/en/docs/twitter-api
[github]: https://github.com/sponsors/KenEucker
[patreon]: https://patreon.com/BikeTag
[node-imgur]: https://github.com/kaimallea/node-imgur
[sanity]: https://www.sanity.io/docs/api-versioning
[imgur]: https://www.npmjs.com/package/imgur/v/next
[reddit]: https://www.npmjs.com/package/snoowrap


<div align="center">

  ## Vendors

  Images powered by imgur.com

  [![imgur.com][imgur-image]](https://apidocs.imgur.com/)

  Structured Content powered by sanity.io

  [![sanity.io][sanity-image]](https://www.sanity.io/docs/http-api)

  Discussions powered by reddit.com

  [![reddit.com][reddit-image]](https://www.reddit.com/dev/api/)

  Mentions powered by twitter.com

  [![twitter.com][twitter-image]](https://developer.twitter.com/en/docs)

  [biketag-logo]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/biketag-api-logo.jpg
  [imgur-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/imgur-logo.png
  [sanity-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/sanity-logo.png
  [reddit-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/reddit-logo.png
  [twitter-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/twitter-logo.png
</div>