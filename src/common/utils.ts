import FormData from 'form-data';
import { Payload } from './types';

export function isBase64(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.base64 !== 'undefined';
}

export function isImageUrl(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return true;
  }

  return typeof payload.image !== 'undefined' && typeof payload === 'string';
}

export function isStream(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.stream !== 'undefined';
}

export function createForm(payload: string | Payload): FormData {
  const form = new FormData();

  if (typeof payload === 'string') {
    form.append('image', payload);
    return form;
  }

  for (const [key, value] of Object.entries(payload)) {
    const supportedUploadObjectTypes = ['base64', 'stream']
    if (supportedUploadObjectTypes.indexOf(key) !== -1) {
      if (supportedUploadObjectTypes.indexOf(payload.type as string) !== -1) {
        form.append(key, payload);
      }
    } else {
      form.append(key, value);
    }
  }
  return form;
}