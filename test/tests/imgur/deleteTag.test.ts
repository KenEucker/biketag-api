import { MockBikeTag, MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { HttpStatusCode } from '#src/common/enums'

/// ***************************  Config  *************************** ///

const imgurDeleteTagMethod = 'biketag.images.deleteTag'

/// ***************************  Tests  *************************** ///

describe(imgurDeleteTagMethod, () => {
  const client = MockImgur.createMockClient()
  const bikeTagClientMock = MockBikeTag.createMockClient()
  const deleteTag = imgurModule.deleteTag.bind(
    { getTags: bikeTagClientMock.getTags },
    client
  )

  test(`${imgurDeleteTagMethod} method requires ImgurHash from payload`, () => {
    return expect(deleteTag(<any>{})).rejects.toThrow()
  })

  test(`${imgurDeleteTagMethod} method requires one of [hash, tagnumber, slug] from payload`, () => {
    // TODO - When code is working, validate that it's throwing the right error
    return expect(deleteTag(<any>{})).rejects.toThrow()
  })

  describe(`${imgurDeleteTagMethod} method resolves data of type boolean[]`, () => {
    test(`Input: tagnumber`, async () => {
      const res = await deleteTag({
        tagnumber: MockTag.tagNumbers[0].toString(),
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    test(`Input: slugs`, async () => {
      const res = await deleteTag({
        slug: MockImgur.mockSlugs[0],
        game: MockTag.game,
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })

    // TODO - The method doesn't seem to use this. Confirm this test is needed.
    test(`Input: hash`, async () => {
      const res = await deleteTag(<any>{
        game: MockTag.game,
        hash: MockTag.hashes[0],
      })

      expect(Array.isArray(res.data))
      res.data.forEach((b) => expect(typeof b).toBe('boolean'))
    })
  })

  test(`${imgurDeleteTagMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      deleteTag({
        tagnumber: MockTag.tags[0].toString(),
        game: MockTag.game,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
