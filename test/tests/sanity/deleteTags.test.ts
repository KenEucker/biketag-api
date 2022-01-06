const sanityDeleteTagsMethod = 'biketag.content.deleteTags'
describe(sanityDeleteTagsMethod, () => {
  test.todo(`${sanityDeleteTagsMethod} method requires ImgurHash from payload`)

  test.todo(
    `${sanityDeleteTagsMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${sanityDeleteTagsMethod} method resolves data of type boolean[]`)

  test.todo(
    `${sanityDeleteTagsMethod} method resolves status of HttpStatusCode.Ok`
  )
})
