const imgurQueueTagMethod = 'biketag.images.queueTag'
describe(imgurQueueTagMethod, () => {
  test.todo(`${imgurQueueTagMethod} method requires ImgurHash from payload`)

  test.todo(
    `${imgurQueueTagMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${imgurQueueTagMethod} method resolves data of type Tag[]`)

  test.todo(
    `${imgurQueueTagMethod} method resolves status of HttpStatusCode.Ok`
  )
})
