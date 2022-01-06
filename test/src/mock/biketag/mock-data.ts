/// ***************************  General  *************************** ///

export const mockSlugs = ['portland-tag-534', 'portland-tag-533']

/// ***************************  Responses  *************************** ///

export const getTagsResponse = {
  data: [
    {
      tagnumber: 534,
      name: 'portland-tag-534',
      slug: 'portland-tag-534',
      game: 'portland',
      discussionUrl: 'https://redd.it/rnv8j5',
      foundLocation: undefined,
      mysteryPlayer: 'Yossarian',
      foundPlayer: null,
      foundTime: undefined,
      mysteryTime: 1640380734,
      hint: 'From one Bigfoot to another… actually just past the another',
      playerId: undefined,
      mysteryImageUrl: 'https://i.imgur.com/AIPoZlX.jpg',
      foundImageUrl: undefined,
      gps: { lat: 0, long: 0, alt: 0 },
    },
    {
      tagnumber: 533,
      name: 'portland-tag-533',
      slug: 'portland-tag-533',
      game: 'portland',
      discussionUrl: 'https://redd.it/rmg4f8',
      foundLocation: '13th andlambert',
      mysteryPlayer: 'pueo-pace',
      foundPlayer: 'Yossarian',
      foundTime: 1640380712,
      mysteryTime: 1640210734,
      hint: 'Outside apartments that share a name with a Hunger Games main character',
      playerId: undefined,
      mysteryImageUrl: 'https://i.imgur.com/dMuPFty.jpg',
      foundImageUrl: 'https://i.imgur.com/Avdyzof.jpg',
      gps: { lat: 0, long: 0, alt: 0 },
    },
  ],
  success: true,
  status: 200,
}

export const getTagResponse = {
  data: {
    tagnumber: 534,
    name: 'portland-tag-534',
    slug: 'portland-tag-534',
    game: 'portland',
    discussionUrl: 'https://redd.it/rnv8j5',
    foundLocation: undefined,
    mysteryPlayer: 'Yossarian',
    foundPlayer: null,
    foundTime: undefined,
    mysteryTime: 1640380734,
    hint: 'From one Bigfoot to another… actually just past the another',
    playerId: undefined,
    mysteryImageUrl: 'https://i.imgur.com/AIPoZlX.jpg',
    foundImageUrl: undefined,
    gps: { lat: 0, long: 0, alt: 0 },
  },
  success: true,
  status: 200,
}
