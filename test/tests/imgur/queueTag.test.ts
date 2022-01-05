import { MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { isTag, Tag } from '#src/common/schema'
import { HttpStatusCode } from '#src/common/enums'
import { BikeTagApiResponse } from "#src/common/types";

/// ***************************  Config  *************************** ///

const imgurQueueTagMethod = 'biketag.images.queueTag'

/// ***************************  Test  *************************** ///

describe(imgurQueueTagMethod, () => {
  const client = MockImgur.createMockClient()
  const queueTag = imgurModule.queueTag.bind(undefined, client)

  test(`${imgurQueueTagMethod} method requires ImgurHash from payload`, () => {
    return expect(queueTag(<any>{})).rejects.toThrow()
  })

  test(`${imgurQueueTagMethod} method requires one of [hashes, tagnumbers, slugs] from payload`, () => {
    // TODO - When code is working, validate that it's throwing the right error
    return expect(queueTag(<any>{})).rejects.toThrow()
  })

  describe(`${imgurQueueTagMethod} method resolves data of type Tag[]`, () => {
    test(`Input: Found Queue Tag`, async () => {
      const tag1: Tag = {
        ...MockTag.tags[0],
        foundImage: 'test',
        foundImageUrl: undefined,
        mysteryImageUrl: undefined,
        mysteryImage: undefined,
      }

      const tag2: Tag = {
        ...MockTag.tags[0],
        foundImage: undefined,
        foundImageUrl: 'test',
        mysteryImageUrl: undefined,
        mysteryImage: undefined,
      }

      const responses = await queueTag([
        { ...tag1, tag: tag1 },
        { ...tag2, tag: tag2 },
      ]) as BikeTagApiResponse<Tag>[]

      expect(Array.isArray(responses))
      expect(responses.length).toBe(2)

      // TODO - Might want to improve this by ensuring the actual results are
      //   correct and/or in the right order. Maybe better as a separate test
      responses.forEach((res) => expect(isTag(res.data)).toBeTruthy())
    })

    test(`Input: Mystery Queued Tag`, async () => {
      const tag1: Tag = {
        ...MockTag.tags[0],
        foundImage: undefined,
        foundImageUrl: undefined,
        mysteryImageUrl: 'test',
        mysteryImage: undefined,
      }

      const tag2: Tag = {
        ...MockTag.tags[0],
        foundImage: undefined,
        foundImageUrl: undefined,
        mysteryImageUrl: undefined,
        mysteryImage: 'test',
      }

      const responses = await queueTag([
        { ...tag1, tag: tag1 },
        { ...tag2, tag: tag2 },
      ]) as BikeTagApiResponse<Tag>[]

      expect(Array.isArray(responses))
      expect(responses.length).toBe(2)

      // TODO - Might want to improve this by ensuring the actual results are
      //   correct and/or in the right order. Maybe better as a seaprate test
      responses.forEach((res) => expect(isTag(res.data)).toBeTruthy())
    })
    // test(`Input: Complete Queued Tag`, async () => {
    //   TODO - Code seems to conflict, here. Not sure if / how to test this input
    //    Would recommend revisiting this after updating
    //    the `queueTag` method to ensure everything is covered
    // })
  })

  test(`${imgurQueueTagMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      queueTag({
        tag: MockTag.tags[0],
        ...MockTag.tags[0],
        foundImage: 'test',
        foundImageUrl: undefined,
        mysteryImageUrl: undefined,
        mysteryImage: undefined,
      }) as Promise<BikeTagApiResponse<Tag>>
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
