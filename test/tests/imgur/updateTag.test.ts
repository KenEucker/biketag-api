import { MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { isTag, Tag } from '#src/common/schema'
import { ImgurApiResponse } from 'imanagur'
import { HttpStatusCode } from '#src/common/enums'

/// ***************************  Config  *************************** ///

const imgurUpdateTagsMethod = 'biketag.images.updateTags'

/// ***************************  Tests  *************************** ///

describe(imgurUpdateTagsMethod, () => {
  const client = MockImgur.createMockClient()
  const updateTag = imgurModule.updateTag.bind(undefined, client)

  test(`${imgurUpdateTagsMethod} method requires ImgurHash from payload`, () => {
    return expect(updateTag(<any>{})).rejects.toThrow()
  })

  test(`${imgurUpdateTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`, () => {
    // TODO - When code is working, validate that it's throwing the right error
    return expect(updateTag(<any>{})).rejects.toThrow()
  })

  describe(`${imgurUpdateTagsMethod} method resolves data of type Tag[]`, () => {
    test(`Single Tag`, async () => {
      const res = (await updateTag({
        tag: MockTag.tags[0],
        game: MockTag.game,
      })) as ImgurApiResponse<Tag>

      expect(isTag(res.data)).toBeTruthy()
    })

    test(`Multiple Tags`, async () => {
      const responses = (await updateTag([
        { tag: MockTag.tags[0], game: MockTag.game },
        { tag: MockTag.tags[1], game: MockTag.game },
      ])) as ImgurApiResponse<Tag>[]

      expect(Array.isArray(responses))
      expect(responses.length).toBe(2)

      // TODO - Might want to improve this by ensuring the actual results are
      //   correct and/or in the right order. Maybe better as a separate test
      responses.forEach((res) => expect(isTag(res.data)).toBeTruthy())
    })
  })

  test(`${imgurUpdateTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      updateTag({
        tag: MockTag.tags[0],
        game: MockTag.game,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
