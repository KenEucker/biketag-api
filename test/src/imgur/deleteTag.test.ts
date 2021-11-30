const imgurDeleteTagMethod = 'biketag.images.deleteTag'
describe(imgurDeleteTagMethod, () => {
  test.todo(`${imgurDeleteTagMethod} method requires ImgurHash from payload`)

  test.todo(
    `${imgurDeleteTagMethod} method requires one of [hashes, tagnumber, slug] from payload`
  )

  test.todo(`${imgurDeleteTagMethod} method resolves data of type boolean[]`)

  test.todo(
    `${imgurDeleteTagMethod} method resolves status of HttpStatusCode.Ok`
  )
})
