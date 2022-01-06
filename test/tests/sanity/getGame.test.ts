const sanityGetGameMethod = 'biketag.content.getGame'
describe(sanityGetGameMethod, () => {
  test.todo(`${sanityGetGameMethod} method requires ImgurHash from payload`)

  test.todo(
    `${sanityGetGameMethod} method requires one of [hashes, tagnumbers, slugs] from payload`
  )

  test.todo(`${sanityGetGameMethod} method resolves data of type boolean[]`)

  test.todo(
    `${sanityGetGameMethod} method resolves status of HttpStatusCode.Ok`
  )
})
