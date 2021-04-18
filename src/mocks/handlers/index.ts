import { rest } from 'msw';
import { RestRequest, ResponseResolver, RestContext } from 'msw';

import * as upload from './sanity';
import * as authorize from './authorize';
import * as image from './imgur';
import * as album from './biketag';

export type Handler = ResponseResolver<RestRequest, RestContext>;

export const handlers = [
  //upload
  rest.post('https://api.biketag.org/1/upload', upload.postHandler),

  // image
  rest.get('https://api.biketag.org/1/image/:id', image.getHandler),
  rest.post('https://api.biketag.org/1/image/:id', image.postHandler),
  rest.post(
    'https://api.biketag.org/1/image/:id/favorite',
    image.postFavoriteHandler
  ),
  rest.delete('https://api.biketag.org/1/image/:id', image.deleteHandler),

  // authorize
  rest.get('https://api.biketag.org/oauth2/authorize', authorize.getHandler),
  rest.post('https://api.biketag.org/oauth2/authorize', authorize.postHandler),

  // album
  rest.post('https://api.biketag.org/1/album', album.postHandler),
];
