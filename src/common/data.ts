export const tagDataFields = [
  'slug',
  'tagnumber',
  'mysteryImage',
  'mysteryImageUrl',
  'game',
  'player',
  'hint',
  'discussionUrl',
  'foundLocation',
  'gps',
  'foundImage',
  'foundImageUrl',
]

export const tagDataReferenceFields = ['game', 'player']

export const cacheKeys = {
  albumHash: `imgur::`,
  redditPosts: `reddit::`,
  bikeTagImage: `biketag::`,
  bikeTagsByUser: `usertags::`,
  hintText: `hint::`,
  creditText: `credit::`,
  locationText: `gps::`,
  tagNumberText: `tag::`,
  imagesText: `images::`,
  gpsLocationText: `gps::`,
  slugText: `slug::`,
}
