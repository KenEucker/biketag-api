import { MockBikeTag, MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { isTag, Tag } from '#src/common/schema'
import { HttpStatusCode } from '#src/common/enums'
import { BikeTagApiResponse } from '#src/common/types'

/// ***************************  Config  *************************** ///

const imgurUploadTagImageMethod = 'biketag.images.uploadTagImage'
const img1 = {
  imageHash: MockTag.hashes[0],
  title: MockTag.tags[0].name,
  description: MockTag.tags[0].name,
}
const img2 = {
  imageHash: MockTag.hashes[1],
  title: MockTag.tags[1].name,
  description: MockTag.tags[1].name,
}

/// ***************************  Tests  *************************** ///

describe(imgurUploadTagImageMethod, () => {
  const client = MockImgur.createMockClient()
  const bikeTagClientMock = MockBikeTag.createMockClient()
  const uploadTagImage = imgurModule.uploadTagImage.bind(
    { getTags: bikeTagClientMock.getTags },
    client
  )

  test(`${imgurUploadTagImageMethod} method requires ImgurHash from payload`, () => {
    return expect(uploadTagImage(<any>{})).rejects.toThrow()
  })

  test(`${imgurUploadTagImageMethod} method requires a valid uploadTagImagePayload`, () => {
    // TODO - When code is working, validate that it's throwing the right error
    return expect(uploadTagImage(<any>{})).rejects.toThrow()
  })

  describe(`${imgurUploadTagImageMethod} method resolves data of type Tag[]`, () => {
    test(`Single Image`, async () => {
      const res = (await uploadTagImage(img1)) as BikeTagApiResponse<Tag>
      expect(isTag(res.data)).toBeTruthy()
    })

    test(`Multiple Tags`, async () => {
      const responses = (await uploadTagImage([
        img1,
        img2,
      ])) as BikeTagApiResponse<Tag>[]

      expect(Array.isArray(responses))
      expect(responses.length).toBe(2)

      // TODO - Might want to improve this by ensuring the actual results are
      //   correct and/or in the right order. Maybe better as a separate test
      responses.forEach((res) => expect(isTag(res.data)).toBeTruthy())
    })
  })

  test(`${imgurUploadTagImageMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(uploadTagImage(img1)).resolves.toMatchObject({
      status: HttpStatusCode.Ok,
    })
  })
})
