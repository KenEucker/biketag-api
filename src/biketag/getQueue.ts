// import { getQueuePayload } from '../common/payloads'
// import { BikeTagApiResponse } from '../common/types'
// import { Tag } from '../common/schema'
// import { BikeTagGunClient } from '../common/types'
// import { AvailableApis, HttpStatusCode } from '../common/enums'

// export async function getQueue(
//   client: BikeTagGunClient,
//   payload: getQueuePayload
// ): Promise<BikeTagApiResponse<Tag[]>> {
//   const tags: Tag[] = await new Promise((r) => {
//     return client
//       .get(payload.game)
//       .get('queue')
//       .map()
//       .once((t) => r(Object.values(t) as unknown as Tag[]))
//   })

//   return {
//     data: tags,
//     status: HttpStatusCode.Ok,
//     success: true,
//     source: AvailableApis[AvailableApis.biketag],
//   }
// }
