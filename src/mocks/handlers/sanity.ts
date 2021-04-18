import { Handler } from '.';

const BadRequestErrorResponse = {
  status: 400,
  success: false,
  data: {
    error: 'Bad Request',
    request: '/1/upload',
    method: 'POST',
  },
};

type CreateResponseOptions = {
  id?: string;
  type?: string | null;
  title?: string | null;
  description?: string | null;
};

function createResponse({
  id = 'JK9ybyj',
  type = null,
  title = null,
  description = null,
}: CreateResponseOptions) {
  return {
    data: {
      id,
      deletehash: Array.from(id).reverse().join(''),
      title,
      description,
      link: `https://i.biketag.org/${id}.${type === 'video' ? 'mp4' : 'jpg'}`,
    },
    success: true,
    status: 200,
  };
}

export const postHandler: Handler = (req, res, ctx) => {
  const {
    image = null,
    video = null,
    type = null,
    title = null,
    description = null,
  } = req.body as Record<string, string>;

  // image or video field is always required
  if (image !== null && video !== null) {
    return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
  }

  // type is optional when uploading a file, but required
  // for any other type
  if (type !== null) {
    // only these types are allowed
    if (!['file', 'url', 'base64'].includes(type as string)) {
      return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
    }
    // if type is not specified we assume we're uploading a file.
    // but we need to make sure a file was sent in the image field
  } else if (typeof image !== 'object') {
    return res(ctx.status(400), ctx.json(BadRequestErrorResponse));
  }

  return res(ctx.json(createResponse({ title, description })));
};
