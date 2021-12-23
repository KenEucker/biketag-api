import * as getTagsModule from '#src/imgur'
import { isTag } from '#src/common/schema'
import { HttpStatusCode } from '#src/common/enums'
import { MockImgur, MockTag } from '#test-src';

/// ***************************  Config  *************************** ///

const imgurGetTagsMethod = 'biketag.images.getTags'

/// ***************************  Tests  *************************** ///

describe(imgurGetTagsMethod, () => {
  const client = MockImgur.createMockClient();
  const getTags = getTagsModule.getTags.bind(undefined, client)

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
        game: MockTag.game,
        hash: MockTag.hashes[0],
      })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })
  })

  test(`${imgurGetTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      // TODO - After fixing types, ensure this input is correct
      getTags({
        tagnumbers: MockTag.tagNumbers,
        game: MockTag.game,
        hash: MockTag.hashes[0],
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
