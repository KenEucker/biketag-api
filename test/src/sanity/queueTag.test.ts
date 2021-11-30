const queueTagMethod = 'biketag.content.queueTag'
describe(queueTagMethod, () => {
  test.todo(`${queueTagMethod} method requires ImgurHash from payload`)

  test.todo(
    `${queueTagMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${queueTagMethod} method resolves data of type Tag[]`)

  test.todo(`${queueTagMethod} method resolves status of HttpStatusCode.Ok`)
})
