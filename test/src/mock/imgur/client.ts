import { ImgurApiResponse, ImgurClient } from 'imanagur'
import { getAlbumResponse, getImageResponse } from './mock-data'
import { AlbumData, ImageData } from 'imanagur/lib/common/types'

/// ***************************  Types  *************************** ///

export interface MockImgurClient extends ImgurClient {
  mockResponses: {
    getAlbum: ImgurApiResponse<AlbumData>
    getImage: ImgurApiResponse<ImageData>
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
    },
    getAlbum: jest.fn(function () {
      return this.mockResponses.getAlbum
    }),
    getImage: jest.fn(function () {
      return this.mockResponses.getImage
    }),
  } as unknown as MockImgurClient
}
