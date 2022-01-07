import { ImgurApiResponse, ImgurClient } from 'imgur'
import {
  getAlbumResponse,
  getImageResponse,
  updateImageResponse,
  uploadResponse,
  getTagsResponse,
} from './mock-data'
import { AlbumData, ImageData } from 'imgur/lib/common/types'

/// ***************************  Types  *************************** ///

export interface MockImgurClient extends ImgurClient {
  mockResponses: {
    getAlbum: ImgurApiResponse<AlbumData>
    getImage: ImgurApiResponse<ImageData>
    updateImage: ImgurApiResponse<boolean>
    upload: ImgurApiResponse<ImageData>
  }
}

/// ***************************  Utils  *************************** ///

/**
 * Create mock Imgur Client
 * Note: Alter mock responses using the `mockResponses` property
 */
export function createMockClient(): MockImgurClient {
  const client = {} as MockImgurClient

  return Object.assign(client, {
    mockResponses: {
      getAlbum: getAlbumResponse,
      getImage: getImageResponse,
      updateImage: updateImageResponse,
      upload: uploadResponse,
    },
    getAlbum: jest.fn(async function () {
      return client.mockResponses.getAlbum
    }),
    getImage: jest.fn(async function () {
      return client.mockResponses.getImage
    }),
    updateImage: jest.fn(async function () {
      return client.mockResponses.updateImage
    }),
    upload: jest.fn(async function () {
      return client.mockResponses.upload
    }),
  })
}
