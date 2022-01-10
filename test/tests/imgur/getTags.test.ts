import * as imgurModule from '#src/imgur'
import { isTag } from '#src/common/schema'
import { HttpStatusCode } from '#src/common/enums'
import { MockBikeTag, MockImgur, MockTag } from '#test-src'

/// ***************************  Config  *************************** ///

const imgurGetTagsMethod = 'biketag.images.getTags'

/// ***************************  Tests  *************************** ///

describe(imgurGetTagsMethod, () => {
  const mockClient = MockImgur.createMockClient()
  const mockBikeTagClient = MockBikeTag.createMockClient()
  const getTags = imgurModule.getTags.bind(mockBikeTagClient, <any>mockClient)

  test(`${imgurGetTagsMethod} method requires ImgurHash from payload`, () => {
    return expect(getTags(<any>{})).rejects.toThrow()
  })

  describe(`${imgurGetTagsMethod} method resolves data of type Tag[]`, () => {
    test(`Input: tagnumbers`, async () => {
      // TODO - Is hash required here?
      const res = await getTags({
        tagnumbers: MockTag.tagNumbers,
        game: MockTag.game,
        hash: MockTag.hashes[0],
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })

    test(`Input: slugs`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await getTags(<any>{
        slugs: MockImgur.mockSlugs,
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })

    test(`Input: hash`, async () => {
      // TODO - Fix input type & remove any cast
      const res = await getTags(<any>{
        hash: MockTag.hashes[0],
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })
  })

  test(`${imgurGetTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      // TODO - Fix input type & remove any cast
      getTags(<any>{
        hash: MockTag.hashes[0],
        game: MockTag.game,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
