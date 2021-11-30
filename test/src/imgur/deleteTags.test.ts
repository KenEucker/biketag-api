const imgurDeleteTagsMethod = 'biketag.images.deleteTags'
describe(imgurDeleteTagsMethod, () => {
  test.todo(`${imgurDeleteTagsMethod} method requires ImgurHash from payload`)

  test.todo(
    `${imgurDeleteTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${imgurDeleteTagsMethod} method resolves data of type boolean[]`)

  test.todo(
    `${imgurDeleteTagsMethod} method resolves status of HttpStatusCode.Ok`
  )
})
