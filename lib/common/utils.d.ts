import FormData from 'form-data';
import { Payload } from './types';
export declare function isBase64(payload: string | Payload): boolean;
export declare function isImageUrl(payload: string | Payload): boolean;
export declare function isStream(payload: string | Payload): boolean;
export declare function createForm(payload: string | Payload): FormData;
