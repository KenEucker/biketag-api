import { ImgurApiResponse, ImgurClient } from 'imanagur'
import {
  getAlbumResponse,
  getImageResponse,
  updateImageResponse,
  uploadResponse,
} from './mock-data'
import { AlbumData, ImageData } from 'imanagur/lib/common/types'

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
    getAlbum: jest.fn(function () {
      return client.mockResponses.getAlbum
    }),
    getImage: jest.fn(function () {
      return client.mockResponses.getImage
    }),
    updateImage: jest.fn(function () {
      return client.mockResponses.updateImage
    }),
    upload: jest.fn(function () {
      return client.mockResponses.upload
    }),
  })
}
