import { BikeTagApiResponse, BikeTagClient } from 'biketag'
import { getTagsResponse, getTagResponse } from './mock-data'
import { Tag } from '#src/common/schema'

/// ***************************  Types  *************************** ///

export interface MockBikeTagClient extends BikeTagClient {
  mockResponses: {
    getTags: BikeTagApiResponse<Tag[]>
    uploadTagImage: BikeTagApiResponse<Tag>
  }
}

/// ***************************  Utils  *************************** ///

/**
 * Create mock BikeTag Client
 * Note: Alter mock responses using the `mockResponses` property
 */
export function createMockClient(): MockBikeTagClient {
  return {
    mockResponses: {
      getTags: getTagsResponse,
      getTag: getTagResponse,
    },
    getTags: jest.fn(function () {
      return getTagsResponse
    }),
    uploadTagImage: jest.fn(function () {
      return getTagResponse
    }),
  } as unknown as MockBikeTagClient
}
