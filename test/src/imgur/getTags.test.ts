import { ImgurClient } from 'imgur'

const imgurGetTagsMethod = 'biketag.images.getTags'

describe(imgurGetTagsMethod, () => {
  test.todo(`${imgurGetTagsMethod} method requires ImgurHash from payload`)

  // Validate `data` field for all three branches of payload conditional
  test.todo(`${imgurGetTagsMethod} method resolves data of type Tag[]`)

  // Check `getTags` result.status === HttpStatusCode.Ok
  test.todo(`${imgurGetTagsMethod} method resolves status of HttpStatusCode.Ok`)
})
