import { EventEmitter } from 'events';
import got, { CancelableRequest, ExtendOptions, Response, Got } from 'got';
import { getAuthorizationHeader } from './getAuthorizationHeader';
import {
  deleteImage,
  favoriteImage,
  getImage,
  upload,
  updateImage,
  UpdateImagePayload,
} from './image';
import { BIKETAG_API_PREFIX } from './common/endpoints';
import {
  Credentials,
  // AlbumData,
  ImageData,
  BikeTagApiResponse,
} from './common/types';

const USERAGENT = 'biketag-api (https://github.com/keneucker/biketag-api)';

export class BikeTagClient extends EventEmitter {
  private got: Got;
  private gotExtended: Got;
  constructor(readonly credentials: Credentials) {
    super();
    this.got = got.extend();
    this.gotExtended = this.got.extend({
      prefixUrl: BIKETAG_API_PREFIX,
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
      hooks: {
        beforeRequest: [
          async (options) => {
            options.headers['authorization'] = await getAuthorizationHeader(
              this
            );
          },
        ],
      },
    });
  }

  plainRequest(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<unknown>> {
    return this.got.extend(options)(url);
  }

  request(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<string>> {
    return this.gotExtended.extend(options)(url);
  }

  deleteImage(imageHash: string): Promise<BikeTagApiResponse<boolean>> {
    return deleteImage(this, imageHash);
  }

  favoriteImage(imageHash: string): Promise<BikeTagApiResponse<string>> {
    return favoriteImage(this, imageHash);
  }

  /// TODO: this should be for getting an album
  // getGallery(options: GalleryOptions): Promise<BikeTagApiResponse<AlbumData>> {
  //   return getGallery(this, options);
  // }

  getImage(imageHash: string): Promise<BikeTagApiResponse<ImageData>> {
    return getImage(this, imageHash);
  }

  updateImage(
    payload: UpdateImagePayload | UpdateImagePayload[]
  ): Promise<BikeTagApiResponse<boolean> | BikeTagApiResponse<boolean>[]> {
    return updateImage(this, payload);
  }

  upload(
    payload: string | string[] | Payload | Payload[]
  ): Promise<BikeTagApiResponse<ImageData> | BikeTagApiResponse<ImageData>[]> {
    return upload(this, payload);
  }
}
