import type { ImgurClient } from 'imanagur'
import * as getTagsModule from '../../../src/imgur'
import { isTag } from '../../../src/common/schema'
import { HttpStatusCode } from '../../../lib/common/enums'
import {
  mockTagGame,
  mockTagHashes,
  mockTagNumbers,
  mockTagSlugs,
} from '../../assets/tags'

/// ****************************  Config  *************************** ///

const imgurGetTagsMethod = 'biketag.images.getTags'

/// ****************************  Tests  *************************** ///

describe(imgurGetTagsMethod, () => {
  const client = {
    // TODO - Ron - Add valid return types to go with mockTags
    getAlbum: jest.fn(() => {}),
    // TODO - Ron - Add valid return types to go with mockTags
    getImage: jest.fn(() => {}),
  } as unknown as ImgurClient

  const getTags = getTagsModule.getTags.bind(undefined, client)

  test(`${imgurGetTagsMethod} method requires ImgurHash from payload`, () => {
    return expect(getTags(<any>{})).rejects.toThrow()
  })

  describe(`${imgurGetTagsMethod} method resolves data of type Tag[]`, () => {
    test(`Input: tagnumbers`, async () => {
      // TODO - Is hash required here?
      const res = await getTags({
        tagnumbers: mockTagNumbers,
        game: mockTagGame,
        hash: mockTagHashes[0],
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })

    test(`Input: slugs`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await getTags(<any>{
        slugs: mockTagSlugs,
        game: mockTagGame,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })

    test(`Input: hash`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await getTags(<any>{
        game: mockTagGame,
        hash: mockTagHashes[0],
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })
  })

  test(`${imgurGetTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      // TODO - After fixing types, ensure this input is correct
      getTags({
        tagnumbers: mockTagNumbers,
        game: mockTagGame,
        hash: mockTagHashes[0],
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
