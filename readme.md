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


## Installation
_This package is Typescript ready_

```bash
npm install biketag
```

## How to use it

The library is a default export.

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

Install:
```sh
# For NPM
npm install biketag

# For Yarn
yarn add biketag
```

Include in your projects:
```ts
// Using import statement
import { BikeTagClient } from 'biketag';
```

```js
// Using require()
const biketag = require('biketag');
```

_Because is a default export, here you can import it with what name you want_

---

## Node

### Usage

### Import and instantiate with credentials:

```ts
// ESModule syntax
import { BikeTagClient } from 'biketag'
```

```js
// CommonJS syntax
const { BikeTagClient } = require('biketag')
```

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

### Configuration

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

You can get tags one by one or all at once for a given game using the `getTag` and `getTags` methods:

```js
// retrieves the BikeTag game data 'portland' game
const biketagPortlandLatest = await biketagAPI.getGameData()

// retrieves the latest BikeTag posted for the 'portland' game
const biketagPortlandLatest = await biketagAPI.getTag()

// retrieves the BikeTag #1 for the 'portland' game
const biketagPortland1 = await biketagAPI.getTag(1)

// retrieves the all BikeTags for the 'portland' game
const allPortlandTags = await biketagAPI.getTags()

// retrieves the BikeTags for the first five tags for the 'portland' game
const firstFivePortlandTags = await biketagAPI.getTags([1,2,3,4,5])
```


### There are a series of getter methods, accessible by `biketagAPI.getters`. Their use is explained below: 

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



### There are a series of regular expressions, accessible by `biketagAPI.expressions`. Their use is explained below: 

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
