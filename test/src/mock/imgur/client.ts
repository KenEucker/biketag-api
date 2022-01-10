import * as mockData from './mock-data'
import { exposeMocks } from '../helpers'

/// ***************************  Utils  *************************** ///

/**
 * Create mock Imgur Client
 */
export function createMockClient() {
  return exposeMocks({
    getAlbum: jest.fn().mockResolvedValue(mockData.getAlbumResponse),
    getImage: jest.fn().mockResolvedValue(mockData.getImageResponse),
    updateImage: jest.fn().mockResolvedValue(mockData.updateImageResponse),
    upload: jest.fn().mockResolvedValue(mockData.uploadResponse),
  })
}
