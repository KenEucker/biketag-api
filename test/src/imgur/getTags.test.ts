import { ImgurClient } from 'imgur'
import * as getTagsModule from '../../../src/imgur'
import * as credentials from '../../assets/credentials'
import { Tag } from '../../../lib/common/schema'
import { HttpStatusCode } from '../../../lib/common/enums'

/// ****************************  Config   *************************** ///

const imgurGetTagsMethod = 'biketag.images.getTags'

// TODO - Make sure these are valid
const tagNumbers = [431, 430]
const slugs = ['portland-tag-431', 'portland-tag-430']
const game = 'portland'
const hash = 'Y9PKtpI'

/// ****************************  Helpers   *************************** ///

// TODO - Could be more complete - should also move this to main src or a shared
//  helper file in test dir
/** TypeGuard for Tag */
const isTag = (v: any): v is Tag =>
  typeof v.slug === 'string' && typeof v.tagnumber === 'number'

/// ****************************  Tests   *************************** ///

describe(imgurGetTagsMethod, () => {
  const client = new ImgurClient(credentials.imgur)
  const getTags = getTagsModule.getTags.bind(undefined, client)

  test(`${imgurGetTagsMethod} method requires ImgurHash from payload`, () => {
    return expect(getTags(<any>{})).rejects.toThrow()
  })

  describe(`${imgurGetTagsMethod} method resolves data of type Tag[]`, () => {
    test(`Input: tagnumbers`, async () => {
      const res = await getTags({ tagnumbers: tagNumbers, game, hash })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })

    test(`Input: slugs`, async () => {
      const res = await getTags({ slugs, game, tagnumbers: [] })

      expect(Array.isArray(res.data))
      res.data.forEach((tag) => expect(isTag(tag)).toBeTruthy())
    })
  })

  test(`${imgurGetTagsMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      getTags({
        tagnumbers: tagNumbers,
        game,
        hash,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})
