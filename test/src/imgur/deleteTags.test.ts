import * as deleteTagsModule from '../../../src/imgur'
import type { ImgurClient } from 'imanagur'
import {
  mockTagGame,
  mockTagHashes,
  mockTagNumbers,
  mockTagSlugs,
} from '../../assets/tags'
import { HttpStatusCode } from '../../../src/common/enums'

/// ****************************  Config   *************************** ///

const imgurDeleteTagsMethod = 'biketag.images.deleteTags'

/// ****************************  Tests   *************************** ///

describe(imgurDeleteTagsMethod, () => {
  const client = {
    // TODO - Ron - Add valid return types to go with mockTags
    getAlbum: jest.fn(() => {}),
    // TODO - Ron - Add valid return types to go with mockTags
    getImage: jest.fn(() => {}),
  } as unknown as ImgurClient
  const deleteTags = deleteTagsModule.getTags.bind(undefined, client)

  test(`${imgurDeleteTagsMethod} method requires ImgurHash from payload`, () => {
    return expect(deleteTags(<any>{})).rejects.toThrow()
  })

  test(`${imgurDeleteTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`, () => {
    // TODO - When code is working, validate that it's throwing the right error
    return expect(deleteTags(<any>{})).rejects.toThrow()
  })

  describe(`${imgurDeleteTagsMethod} method resolves data of type boolean[]`, () => {
    test(`Input: tagnumbers`, async () => {
      const res = await deleteTags({
        tagnumbers: mockTagNumbers,
        game: mockTagGame,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    test(`Input: slugs`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await deleteTags(<any>{
        slugs: mockTagSlugs,
        game: mockTagGame,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    test(`Input: hashes`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await deleteTags(<any>{
        game: mockTagGame,
        hashes: mockTagHashes,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })
  })

  test(`${imgurDeleteTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      deleteTags({
        tagnumbers: mockTagNumbers,
        game: mockTagGame,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
