import * as deleteTagsModule from '#src/imgur'
import { HttpStatusCode } from '#src/common/enums'
import { MockImgur, MockTag } from '#test-src'

/// ***************************  Config  *************************** ///

const imgurDeleteTagsMethod = 'biketag.images.deleteTags'

/// ***************************  Tests  *************************** ///

describe(imgurDeleteTagsMethod, () => {
  const client = MockImgur.createMockClient()
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
        tagnumbers: MockTag.tagNumbers,
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    test(`Input: slugs`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await deleteTags(<any>{
        slugs: MockImgur.mockSlugs,
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    test(`Input: hashes`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await deleteTags(<any>{
        game: MockTag.game,
        hashes: MockTag.hashes,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })
  })

  test(`${imgurDeleteTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      deleteTags({
        tagnumbers: MockTag.tags.map((t) => t.tagnumber),
        game: MockTag.game,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
