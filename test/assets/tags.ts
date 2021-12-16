import { Tag } from '../../src/common/schema'

/// ****************************  Mock Tags   *************************** ///

export const mockTags: Tag[] = [
  {
    tagnumber: 431,
    name: 'portland-tag-431',
    slug: 'portland-tag-431',
    game: 'portland',
    discussionUrl: undefined,
    foundLocation: '',
    mysteryPlayer: 'Ken & Doll',
    foundPlayer: '@ejfinneran',
    hint: null,
    mysteryImageUrl: 'https://i.imgur.com/60vmGqR.jpg',
    foundImageUrl: 'https://i.imgur.com/2MRzCPk.jpg',
    gps: [Object],
  },
  {
    tagnumber: 430,
    name: 'portland-tag-430',
    slug: 'portland-tag-430',
    game: 'portland',
    discussionUrl: 'https://redd.it/nmocv4',
    foundLocation: '',
    mysteryPlayer: 'u/pretzeloid',
    foundPlayer: '@ejfinneran',
    hint: 'Albert cully spreads his wings',
    mysteryImageUrl: 'https://i.imgur.com/ef3s9Lx.jpg',
    foundImageUrl: 'https://i.imgur.com/5DEAidN.jpg',
    gps: [Object],
  },
]

export const mockTagNumbers = mockTags.map((t) => t.tagnumber)
export const mockTagSlugs = mockTags.map((t) => t.slug)
export const mockTagGame = 'portland'
export const mockTagHashes = ['Y9PKtpI', 'K3lPZew']
