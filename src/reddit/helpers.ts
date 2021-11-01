import { tagDataReferenceFields } from '../common/data'

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

  return tagData
}
