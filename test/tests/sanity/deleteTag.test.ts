const sanityDeleteTagMethod = 'biketag.content.deleteTag'
describe(sanityDeleteTagMethod, () => {
  test.todo(`${sanityDeleteTagMethod} method requires ImgurHash from payload`)

  test.todo(
    `${sanityDeleteTagMethod} method requires one of [hashes, tagnumber, slug] from payload`
  )

  test.todo(`${sanityDeleteTagMethod} method resolves data of type boolean[]`)

  test.todo(
    `${sanityDeleteTagMethod} method resolves status of HttpStatusCode.Ok`
  )
})
