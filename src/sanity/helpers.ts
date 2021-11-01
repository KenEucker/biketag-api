import {
  tagDataReferenceFields,
  gameDataReferenceFields,
  createGame,
  createTag,
  tagDataFields,
  gameDataFields,
  gameDataArrayFields,
} from '../common/data'

export function constructTagDataObject(data: any, fields: string[] = []): any {
  const tagData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  tagDataReferenceFields.forEach((f) => {
    if (tagData[f] && typeof tagData[f] !== 'undefined') {
      tagData[f] = tagData[f].name
    }
  })

  tagData.slug = tagData.slug?.current ?? 'latest'

  return createTag(tagData)
}

export function constructGameDataObject(data: any, fields: string[] = []): any {
  const gameData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  gameDataReferenceFields.forEach((f) => {
    if (gameData[f] && typeof gameData[f] !== 'undefined') {
      gameData[f] = gameData[f].name
    }
  })

  gameData.slug = gameData.slug?.current ?? ''

  return createGame(gameData)
}

export function constructSanityFieldsQuery(
  fields: string[] = [],
  type = 'tag'
): any {
  let referenceFields = [],
    arrayFields = []

  switch (type) {
    case 'game':
      referenceFields = gameDataReferenceFields
      fields = fields.length ? fields : gameDataFields
      arrayFields = gameDataArrayFields
      break

    default:
    case 'tag':
      referenceFields = tagDataReferenceFields
      fields = fields.length ? fields : tagDataFields
      break
  }

  return fields
    .reduce((o: any, f: any) => {
      const isRefrerenceField = referenceFields.indexOf(f) != -1
      const isArrayField = arrayFields.indexOf(f) != -1
      o += `${
        isArrayField
          ? `"${f}": ${f}[]->name`
          : isRefrerenceField
          ? `${f}->{name}`
          : f
      },`
      return o
    }, '')
    .slice(0, -1)
}
