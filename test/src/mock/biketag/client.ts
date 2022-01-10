import * as mockData from './mock-data'
import { exposeMocks } from '../helpers'

/// ***************************  Utils  *************************** ///

/**
 * Create mock BikeTag Client
 */
export function createMockClient() {
  return exposeMocks({
    getTags: jest.fn().mockResolvedValue(mockData.getTagsResponse),
    getTag: jest.fn().mockResolvedValue(mockData.getTagResponse),
  })
}
