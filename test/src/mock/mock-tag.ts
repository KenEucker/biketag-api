import { Tag } from '#src/common/schema'

export namespace MockTag {
  export const tags: Tag[] = [
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
      gps: { lat: 0, long: 0, alt: 0 },
      mysteryTime: 0,
      foundTime: 0
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
      gps: { lat: 0, long: 0, alt: 0 },
      mysteryTime: 0,
      foundTime: 0
    },
  ]

  export const tagNumbers = tags.map((t) => t.tagnumber)
  export const slugs = tags.map((t) => t.slug)
  export const game = 'portland'
  export const hashes = [ 'Y9PKtpI', 'K3lPZew' ]
}