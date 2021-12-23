const imgurUpdateTagsMethod = 'biketag.images.updateTags'
describe(imgurUpdateTagsMethod, () => {
  test.todo(`${imgurUpdateTagsMethod} method requires ImgurHash from payload`)

  test.todo(
    `${imgurUpdateTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${imgurUpdateTagsMethod} method resolves data of type Tag[]`)

  test.todo(
    `${imgurUpdateTagsMethod} method resolves status of HttpStatusCode.Ok`
  )
})
