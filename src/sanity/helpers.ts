import { SanityClient } from '@sanity/client'
import {
  tagDataReferenceFields,
  gameDataReferenceFields,
  createGameObject,
  createTagObject,
  tagDataFields,
  tagDataObjectFields,
  gameDataFields,
  gameDataArrayFields,
  tagDataAssetFields,
  gameDataObjectFields,
  gameDataCustomFields,
  playerDataFields,
  playerDataReferenceFields,
  playerDataObjectFields,
  playerDataArrayFields,
  createPlayerObject,
  ambassadorDataReferenceFields,
  createAmbassadorObject,
  settingDataFields,
} from '../common/data'
import { DataTypes } from '../common/enums'

export function constructTagFromSanityObject(
  data: any,
  fields: string[] = []
): any {
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

  Object.keys(tagDataObjectFields).forEach((f) => {
    if (tagData[f] && typeof tagData[f] !== 'undefined') {
      const objectTree = tagDataObjectFields[f].split('->')
      let targetObj: any = tagData[f]
      objectTree.forEach((o) => {
        targetObj = targetObj[o] ?? undefined
      })
      tagData[f] = targetObj
    }
  })

  tagData.slug = tagData.slug?.current ?? 'current'

  return createTagObject(tagData)
}

export function constructObjectIdFromSlug(slug: string): string {
  return slug
    .replace(/\s/g, '_')
    .replace(/\//g, '-')
    .replace(/[^\w\d]/g, '')
    .toLowerCase()
}

export async function constructSanityObjectFromTag(
  client: SanityClient,
  data: any,
  fields: string[] = []
): Promise<any> {
  const tagData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  for (const field of tagDataReferenceFields) {
    const fieldValue = tagData[field]

    if (fieldValue) {
      /// get the reference values from cache
      const refQuery = `*[_type == "${field}" && slug.current == "${fieldValue}"]{_id}`
      const referenceObject = await client.fetch(refQuery, {})
      let referenceId = ''

      if (referenceObject.length) {
        referenceId = referenceObject[0]._id
      } else {
        // Create new reference
        const newReferenceObject = await client.createIfNotExists({
          _id: constructObjectIdFromSlug(fieldValue),
          _type: field,
          name: fieldValue,
        })
        referenceId = newReferenceObject._id
      }

      tagData[field] = {
        _type: 'reference',
        _ref: referenceId,
      }
    }
  }

  for (const field of tagDataAssetFields) {
    const fieldValue = tagData[field]

    if (fieldValue) {
      tagData[field] = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: fieldValue,
        },
      }
    }
  }

  tagData._type = 'tag'
  tagData._id = tagData._id ?? tagData.slug

  tagData.slug = {
    current: tagData.slug?.current ?? tagData.slug,
  }

  return createTagObject(tagData)
}

export function constructGameFromSanityObject(
  data: any,
  fields: string[] = []
): any {
  const gameData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  const settings = data.settings

  gameDataReferenceFields.forEach((f) => {
    if (gameData[f] && typeof gameData[f] !== 'undefined') {
      gameData[f] = gameData[f].name
    }
  })

  Object.keys(gameDataObjectFields).forEach((f) => {
    if (gameData[f] && typeof gameData[f] !== 'undefined') {
      const objectTree = gameDataObjectFields[f].split('->')
      let targetObj: any = gameData[f]
      objectTree.forEach((o) => {
        targetObj = targetObj[o] ?? undefined
      })
      gameData[f] = targetObj
    }
  })

  gameData.slug = gameData.slug?.current ?? gameData.slug
  gameData.settings = settings.reduce((o, s) => {
    o[s.key] = s.value
    return o
  }, {})
  return createGameObject(gameData)
}

export function constructPlayerFromSanityObject(
  data: any,
  fields: string[] = []
): any {
  const playerData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  playerDataReferenceFields.forEach((f) => {
    if (playerData[f] && typeof playerData[f] !== 'undefined') {
      const isArrayField = playerDataArrayFields.indexOf(f) !== -1
      if (isArrayField) {
        playerData[f] = playerData[f].map((a) => a.name)
      } else {
        playerData[f] = playerData[f].name
      }
    }
  })

  Object.keys(playerDataObjectFields).forEach((f) => {
    if (playerData[f] && typeof playerData[f] !== 'undefined') {
      const objectTree = playerDataObjectFields[f].split('->')
      let targetObj: any = playerData[f]
      objectTree.forEach((o) => {
        targetObj = targetObj[o] ?? undefined
      })
      playerData[f] = targetObj
    }
  })

  playerData.slug = playerData.slug?.current ?? playerData.slug

  return createPlayerObject(playerData)
}

export function constructAmbassadorFromSanityObject(
  data: any,
  fields: string[] = []
): any {
  const ambassadorData = fields.length
    ? fields.reduce((o: any, f: any) => {
        o[f] = data[f]
        return o
      }, {})
    : data

  ambassadorDataReferenceFields.forEach((f) => {
    if (ambassadorData[f] && typeof ambassadorData[f] !== 'undefined') {
      ambassadorData[f] = ambassadorData[f].name
    }
  })

  ambassadorData.slug = ambassadorData.slug?.current ?? ambassadorData.slug

  return createAmbassadorObject(ambassadorData)
}

export function constructSanityDocumentQuery(
  docType: string,
  game?: string,
  slugs: string[] = [],
  tagnumbers: number[] = [],
  fields: string[] = []
): any {
  const gameQuery = game
    ? ` && ((game._ref in *[_type=="game" && lower(name)=="${game.toLowerCase()}"]._id) || (count(*[ _type == "game" && lower(name) =="${game.toLowerCase()}" && ^._id in ${docType}s[]._ref ]) > 0))`
    : ''
  const slugsQuery = slugs.length
    ? ` && slug.current in ${JSON.stringify(slugs)}`
    : ''
  const tagnumbersQuery = tagnumbers.length
    ? ` && tagnumber in ${JSON.stringify(tagnumbers)}`
    : ''

  return `*[_type == "${docType}"${gameQuery}${slugsQuery}${tagnumbersQuery}]{${fields}}`
}

export function constructSanityFieldsQuery(
  fields: string[] = [],
  type: DataTypes = DataTypes.tag
): any {
  let referenceFields = [],
    arrayFields = [],
    customFields = {}

  switch (type) {
    case DataTypes.game:
      referenceFields = gameDataReferenceFields
      fields = fields.length ? fields : gameDataFields
      arrayFields = gameDataArrayFields
      customFields = gameDataCustomFields
      break

    default:
    case DataTypes.tag:
      referenceFields = tagDataReferenceFields
      fields = fields.length ? fields : tagDataFields
      break

    case DataTypes.player:
      referenceFields = playerDataReferenceFields
      fields = fields.length ? fields : playerDataFields
      arrayFields = playerDataArrayFields
      break

    case DataTypes.setting:
      referenceFields = []
      arrayFields = []
      fields = fields.length ? fields : settingDataFields
      break
  }

  const customFieldsKeys = Object.keys(customFields)

  return fields
    .reduce((o: any, f: any) => {
      const isRefrerenceField = referenceFields.indexOf(f) !== -1
      const isArrayField = arrayFields.indexOf(f) !== -1
      const isCustomField = customFieldsKeys.indexOf(f) !== -1
      let fieldQuery = `${f}`

      if (isArrayField && isRefrerenceField) {
        if (isCustomField) {
          fieldQuery = `"${f}": ${f}${customFields[f]}`
        } else {
          fieldQuery = `"${f}": ${f}[]->{name}`
        }
      } else if (isArrayField) {
        fieldQuery = `"${f}": ${f}[]->name`
      } else if (isRefrerenceField) {
        if (isCustomField) {
          fieldQuery = `${f}->{${customFields[f]}}`
        } else {
          fieldQuery = `${f}->{name}`
        }
      }
      o += `${fieldQuery},`
      return o
    }, '')
    .slice(0, -1)
}
