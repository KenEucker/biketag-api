const updateTagsMethod = 'biketag.content.updateTags'
describe(updateTagsMethod, () => {
  test.todo(`${updateTagsMethod} method requires ImgurHash from payload`)

  test.todo(
    `${updateTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${updateTagsMethod} method resolves data of type Tag[]`)

  test.todo(`${updateTagsMethod} method resolves status of HttpStatusCode.Ok`)
})
