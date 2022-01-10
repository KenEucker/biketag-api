import { MockBikeTag, MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { isTag, Tag } from '#src/common/schema'
import { HttpStatusCode } from '#src/common/enums'
import { BikeTagApiResponse } from '#src/common/types'
import { queueTagPayload } from '#src/common/payloads'

/// ***************************  Config  *************************** ///

const imgurQueueTagMethod = 'biketag.images.queueTag'

/// ***************************  Test  *************************** ///

describe(imgurQueueTagMethod, () => {
  const mockClient = MockImgur.createMockClient()
  const mockBikeTagClient = MockBikeTag.createMockClient()
  const queueTag = imgurModule.queueTag.bind(mockBikeTagClient, <any>mockClient)

  test(`${imgurQueueTagMethod} method requires ImgurHash from payload`, () => {
    return expect(queueTag(<any>{})).rejects.toThrow()
  })

  test(`${imgurQueueTagMethod} method requires one of [hashes, tagnumbers, slugs] from payload`, () => {
    const queuedTag = queueTag({} as queueTagPayload)

    expect(isTag(queuedTag)).toBeTruthy()
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
