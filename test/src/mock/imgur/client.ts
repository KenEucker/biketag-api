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
  return {
    mockResponses: {
      getAlbum: getAlbumResponse,
      getImage: getImageResponse,
      updateImage: updateImageResponse,
      upload: uploadResponse
    },
    getAlbum: jest.fn(function () {
      return this.mockResponses.getAlbum
    }),
    getImage: jest.fn(function () {
      return this.mockResponses.getImage
    }),
    updateImage: jest.fn(function () {
      return this.mockResponses.updateImage
    }),
    upload: jest.fn(function () {
      return this.mockResponses.upload
    }),
  } as unknown as MockImgurClient
}
