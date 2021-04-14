import { EventEmitter } from 'events'
import got, { CancelableRequest, ExtendOptions, Response, Got } from 'got'
import { getAuthorizationHeader } from './getAuthorizationHeader'
import { BIKETAG_API_PREFIX } from './common/endpoints'
import {
  Credentials,
  TagData,
  BikeTagApiResponse,
} from './common/types'

import * as sanityApi from './sanity'
import * as imgurApi from './imgur'
import * as biketagApi from './biketag'

import { ImgurClient } from 'imgur'
import sanityClient, { SanityClient } from '@sanity/client'

const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)'

export class BikeTagClient extends EventEmitter {
  private got: Got
  private gotExtended: Got
  private mostAvailableApi: string
  private imgurClient: ImgurClient
  private sanityClient: SanityClient

  constructor(readonly credentials: Credentials) {
    super()

    this.mostAvailableApi = ""
    this.imgurClient = this.initializeImgurApi({})
    this.sanityClient = this.initializeSanityApi({})

    this.got = got.extend()
    this.gotExtended = this.got.extend({
      prefixUrl: BIKETAG_API_PREFIX,
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
      hooks: {
        beforeRequest: [
          async (options: any) => {
            options.headers['authorization'] = await getAuthorizationHeader(
              this
            )
          },
        ],
      },
    })
  }

  private initializeImgurApi(options: any): ImgurClient {
    return new ImgurClient({
      username: 'this.credentials.',
      password: 'process.env.PASSWORD',
      clientId: 'process.env.CLIENT_ID',
      ...options,
    })
  }

  private initializeSanityApi(options: any): SanityClient {
    return sanityClient({
      projectId: 'your-project-id',
      dataset: 'bikeshop',
      apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
      token: 'sanity-auth-token', // or leave blank for unauthenticated usage
      useCdn: true, // `false` if you want to ensure fresh data
      ...options,
    })
  }
  
  private getMostAvailableAPI(): string {
    if (this.mostAvailableApi.length) {
      return this.mostAvailableApi
    }

    /// TODO: determine if a biketag server is available
    /// TODO: determine if sanity permissions are available
    /// TODO: default to imgur api
    return this.mostAvailableApi = "imgur"
  }

  plainRequest(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<unknown>> {
    return this.got.extend(options)(url)
  }

  request(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<string>> {
    return this.gotExtended.extend(options)(url)
  }

  // deleteImage(imageHash: string): Promise<BikeTagApiResponse<boolean>> {
  //   switch (this.getMostAvailableAPI()) {
  //     case "imgur":
  //       return imgur.deleteImage(this, imageHash)
  //     break
  //   }
  // }

  // /// TODO: this should be for getting an album
  // getArchive(options: ArchiveOptions): Promise<BikeTagApiResponse<ArchiveData>> {
  //   return getArchive(this, options)
  // }

  getTag(tagnumber: number): Promise<BikeTagApiResponse<TagData>> {
    const clientString = this.getMostAvailableAPI()
    let client: any = null

    switch (clientString) {
      case "sanity":
        client = sanityApi
        break
      case "imgur":
        client = imgurApi
        break
      default:
      case "biketag":
        client = biketagApi
        break
    }

    return client.getTag(client, tagnumber)
  }

  // updateImage(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return updateImage(this, payload)
  // }

  // upload(
  //   payload: string | string[] | Payload | Payload[]
  // ): Promise<BikeTagApiResponse<TagData> | BikeTagApiResponse<TagData>[]> {
  //   return upload(this, payload)
  // }

  // getBikeTag(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   switch (this.getMostAvailableAPI()) {
  //     case "imgur":
  //       return getBikeTag(this, payload)
  //       break
  //     case "sanity":
  //       return 
  //   }
  // }

  // getBikeTagMysteryImage(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return getBikeTagMysteryImage(this, payload)
  // }

  // getBikeTagFoundImage(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return getBikeTagFoundImage(this, payload)
  // }

  // queueBikeTagFoundImage(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return queueBikeTagFoundImage(this, payload)
  // }

  // queueBikeTagMysteryImage(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return queueBikeTagMysteryImage(this, payload)
  // }

  // getQueuedImages(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return getQueuedImages(this, payload)
  // }

  // getQueue(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return getQueue(this, payload)
  // }

  // completeBikeTagRound(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return completeBikeTagRound(this, payload)
  // }

  // getBikeTagRound(
  //   payload: UpdateImagePayload | UpdateImagePayload[]
  // ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
  //   return getBikeTagRound(this, payload)
  // }

  content(options: any = {}): SanityClient {
    if (!options || !Object.keys(options).length) {
      return this.sanityClient
    }

    return this.initializeSanityApi(options)
  }

  images(options: any = {}): ImgurClient {
    if (!options || !Object.keys(options).length) {
      return this.imgurClient
    }
    
    return this.initializeImgurApi(options)
  }

  data(): BikeTagClient {
    return this
  }
}