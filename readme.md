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
</p>
<p align="center">
  <a href="https://github.com/keneucker/biketag-api/discussions">
    <img alt="Join the community on GitHub Discussions" src="https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue">
  </a>
</p>

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
<script src="https://cdn.jsdelivr.net/npm/biketag/biketag.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/npm/biketag.js"></script>
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

### Instantiate with credentials (Browser):
```js
let client

// if you have your clientKey/clientToken to retrieve an access token automatically:
client = new biketag({
  game: 'portland',
  clientKey: process.env.BIKETAG_CLIENT_KEY,
  clientToken: process.env.BIKETAG_CLIENT_TOKEN,
})

// if you have Imgur credentials: clientId and clientSecret
client = new biketag({
  game: 'portland',
  imgur: {
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
})

// or Reddit credentials: clientId and clientSecret
client = new biketag({
  game: 'portland',
  reddit: {
    subreddit: process.env.REDDIT_SUBREDDIT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
  }
})

// or Sanity credentials: projectId and accessToken
client = new biketag({
  game: 'portland',
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    accessToken: process.env.SANITY_ACCESS_TOKEN,
    dataset: process.env.SANITY_DATASET,
    useCdn: false,
  }
})
```

### Instantiate with credentials (NodeJs):

```ts
let client

// if you already have an access token acquired
client = new BikeTagClient({
  game: 'portland',
  clientToken: process.env.BIKETAG_ACCESS_TOKEN,
})

// or your imgur client ID and clientSecret
client = new BikeTagClient({
  game: 'portland',
  imgur: {
    hash: process.env.IMGUR_ALBUM_HASH,
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
  }
})
```
<div align="center">

### Configuration

The acceptable fields for a BikeTagConfiguration object are outlined below:

|     Key/Api     | Description                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `game`          | [BikeTag] a string of the name of the game to load                                                                                  |
| `clientKey`     | [BikeTag] The biketag Client Key for your access to the BikeTag API                                                                 |
| `clientToken`   | [BikeTag] The biketag Client Token for your access to the BikeTag API                                                               |
| `accessToken`   | [BikeTag] The biketag Cccess Token acquired via authorization (externally)                                                          |
| `hash`          | [Imgur] The imgur album hash to target when working with BikeTag posts                                                              |
| `clientId`      | [Imgur] The imgur Client ID to use when pulling data from Imgur as a source                                                         |
| `clientSecret`  | [Imgur] The imgur Client Secret to use when authenticating using the ImgurClient                                                    |
| `accessToken`   | [Imgur] The Imgur Access Token acquired via authorization (externally)                                                              |
| `dataset`       | [Sanity] The sanity dataset to target when working with BikeTag posts                                                               |
| `projectId`     | [Sanity] The sanity Project Id                                                                                                      |
| `username`      | [Sanity] The sanity username to use for authentication                                                                              |
| `password`      | [Sanity] The sanity user password to use for authenticaiton                                                                         |
| `apiVersion`    | [Sanity] use current UTC date - see "specifying API version" in Sanity.IO docs                                                      |
| `useCdn`        | [Sanity] `false` if you want to ensure fresh data (or are using an access token)                                                    |
| `token`         | [Sanity] The sanity Access Token acquired via authorization (externally)                                                            |
| `subreddit`     | [Reddit] The reddit subreddit to target when working with BikeTag posts                                                             |
| `username`      | [Reddit] The reddit username to use for authentication                                                                              |
| `password`      | [Reddit] The reddit user password to use for authenticaiton                                                                         |
| `userAgent`     | [Reddit] the API user Agent (required)                                                                                              |
| `clientId`      | [Reddit] The reddit Client ID to use when pulling data from Imgur as a source                                                       |
| `clientSecret`  | [Reddit] The reddit Client Secret to use when authenticating using the ImgurClient                                                  |
| `refreshToken`  | [Reddit] The reddit Refresh Token acquired via authorization (externally)                                                           |

</div>

### **⚠️ For brevity, the rest of the examples will leave out the import and/or instantiation step.**


### Get Tags

You can get tags one by one or all at once for a given game using the `getTag` and `getTags` methods. You can also explicitely set the data adapter to any of the configurable sources (biketag, imgur, sanity, reddit, twitter):

```ts
// retrieves the BikeTag game data 'portland' game
const biketagPortlandLatest = await biketagAPI.getGameData()

// retrieves the latest BikeTag posted for the 'portland' game from the most available API
const biketagPortlandLatest = await biketagAPI.getTag()

// retrieves the BikeTag #1 for the 'portland' game from imgur adapter
const biketagPortland1 = await biketagAPI.getTag(1, { source: 'imgur' })

// retrieves the all BikeTags for the 'portland' game from sanity adapter
const allPortlandTags = await biketagAPI.getTags(undefined, { source: 'sanity' })

// retrieves the BikeTags for the first five tags for the 'portland' game from the reddit adapter
const firstFivePortlandTags = await biketagAPI.getTags([1,2,3,4,5], { source: 'reddit' })
```


### There are a series of getter methods, accessible by `biketagAPI.getters`. Their use is explained below: 
<div align="center">

|     method               | Description                                                                                                                                     |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `getTagnumberFromSlug`                        | parses a slug for a tag number based on existing BikeTag slugs. (uses `getTagnumberFromSlugRegex`)                         |
| `getTagNumbersFromText`                       | parses text for tag numbers on existing BikeTag posts. (uses `getTagNumbersFromTextRegex`)                                 |
| `getCreditFromText`                           | parses text for a player credit based on existing BikeTag posts. (uses `getCreditFromTextRegex`)                           |
| `getFoundLocationFromText`                    | parses text for a found location based on existing BikeTag posts. (uses `getFoundLocationFromTextRegex`)                   |
| `getHintFromText`                             | parses text for a hint based on existing BikeTag posts. (uses `getHintFromTextRegex`)                                      |
| `getGPSLocationFromText`                      | parses text for GPS coordinates. (uses `getGPSLocationFromTextRegex`)                                                      |
| `getImageURLsFromText`                        | parses text for URLs of known BikeTag image providers. (uses `getImageURLsFromTextRegex`)                                  |
| `getDiscussionUrlFromText`                    | parses a url, or string, for a Reddit post link. (uses `getDiscussionUrlFromTextRegex`)                                    |
| `getImageHashFromText`                        | parses a url, or string, for an Imgur url with an imageHash. (uses `getImgurImageHashFromUrlRegex`)                        |
| `getImgurFoundImageHashFromBikeTagData`       | parses BikeTag Data for the found image Imgur hash.                                                                        |
| `getImgurFoundDescriptionFromBikeTagData`     | constructs an Imgur image title from BikeTag data for the found image.                                                     |
| `getImgurFoundTitleFromBikeTagData`           | constructs an Imgur image description from BikeTag data for the found image.                                               |
| `getImgurMysteryImageHashFromBikeTagData`     | parses BikeTag Data for the mystery image Imgur hash.                                                                      |
| `getImgurMysteryTitleFromBikeTagData`         | constructs an Imgur image title from BikeTag data for the mystery image.                                                   |
| `getImgurMysteryDescriptionFromBikeTagData`   | constructs an Imgur image description from BikeTag data for the mystery image.                                             |

</div>

### There are a series of regular expressions, accessible by `biketagAPI.expressions`. Their use is explained below: 
<div align="center">

|   expression                          | Description                                                                                                                         |
| --------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------- |
| `getTagNumbersFromTextRegex`          | Searches a string for numbers associated with BikeTag posts.                                                                        |
| `getCreditFromTextRegex`              | Searches a string for player credits associated with BikeTag posts.                                                                 |
| `getFoundLocationFromTextRegex`       | Searches a string for "found at ()" and parses out the innards of that substring.                                                   |
| `getHintFromTextRegex`                | Searches a string for "(hint: )" and parses out the innards of that substring.                                                      |
| `getGPSLocationFromTextRegex`         | Searches a string for GPS coordinates in the format (lat,long,alt)                                                                  |
| `getImageURLsFromTextRegex`           | Searches a string for an Imgur.com image url                                                                                        |
| `getDiscussionUrlFromTextRegex`       | Searches a string for a URL within `{}` brackets                                                                                    |
| `getGPSCoordinatesValueFromTextRegex` | Searches a string for GPS coordinates within `()` brackets                                                                          |
| `getTagnumberFromSlugRegex`           | Parses out the number from a BikeTag slug.                                                                                          |
| `getImgurImageHashFromUrlRegex`       | Parses out the Imgur image hash from an Imgur image url                                                                             |

</div>

<div align="center">

## Credits

</div>
This project is heavily influenced by the [node-imgur][node-imgur] package, the Imgur API and it's documentation, and Sanity.IO's javascript client.

Using the typescript library configured and developed on the node-imgur v2 project: https://github.com/kaimallea/node-imgur, this package comes bundled with testing using jest and automated releases using github actions. Many thanks to Kaimallea for collaborating with me on the imgur API because I learned so much along the way!

Support the BikeTag Project on [GitHub][github], [Patreon][patreon], or directly by going out and playing a round of [BikeTag in your city](https://biketag.org)!

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

  Data powered by gun.eco

  [![gun.eco][gun-image]](https://gun.eco/docs/API)

  [imgur-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/imgur-logo.png
  [sanity-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/sanity-logo.png
  [reddit-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/reddit-logo.png
  [gun-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/gun-logo.png
  [twitter-image]: https://raw.githubusercontent.com/keneucker/biketag-website/production/public/img/twitter-logo.png
</div>