export interface ImgurAccessToken {
  accessToken: string;
}

export interface ImgurClientId {
  clientId: string;
}

export interface ImgurLogin extends ImgurClientId {
  username: string;
  password: string;
}

export type ImgurCredentials = ImgurAccessToken | ImgurClientId | ImgurLogin;

export function isImgurAccessToken(arg: unknown): arg is ImgurAccessToken {
  return (arg as ImgurAccessToken).accessToken !== undefined;
}

export function isImgurClientId(arg: unknown): arg is ImgurClientId {
  return (arg as ImgurClientId).clientId !== undefined;
}

export function isImgurLogin(arg: unknown): arg is ImgurLogin {
  return (
    (arg as ImgurLogin).clientId !== undefined &&
    (arg as ImgurLogin).username !== undefined &&
    (arg as ImgurLogin).password !== undefined
  );
}
export interface ImgurClient {
  client: any;
}

export interface SanityAccessToken {
  accessToken: string;
}

export interface SanityClientId {
  clientId: string;
}

export interface SanityLogin extends SanityClientId {
  username: string;
  password: string;
}

export type SanityCredentials = SanityAccessToken | SanityClientId | SanityLogin;

export function isSanityAccessToken(arg: unknown): arg is SanityAccessToken {
  return (arg as SanityAccessToken).accessToken !== undefined;
}

export function isSanityClientId(arg: unknown): arg is SanityClientId {
  return (arg as SanityClientId).clientId !== undefined;
}

export function isSanityLogin(arg: unknown): arg is SanityLogin {
  return (
    (arg as SanityLogin).clientId !== undefined &&
    (arg as SanityLogin).username !== undefined &&
    (arg as SanityLogin).password !== undefined
  );
}
export interface SanityClient {
  client: any;
}

export interface AccessToken {
  accessToken: string;
}

export interface ClientId {
  clientId: string;
}

export interface Login extends ClientId {
  username: string;
  password: string;
}

export type BikeTagCredentials = AccessToken | ClientId | Login;

export function isBikeTagAccessToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).accessToken !== undefined;
}

export function isBikeTagClientId(arg: unknown): arg is ClientId {
  return (arg as ClientId).clientId !== undefined;
}

export function isBikeTagLogin(arg: unknown): arg is Login {
  return (
    (arg as Login).clientId !== undefined &&
    (arg as Login).username !== undefined &&
    (arg as Login).password !== undefined
  );
}

export interface BikeTagApiResponse<
  T = Record<string, unknown> | Record<string, unknown>[] | string | boolean
> {
  data: T;
  status: number;
  success: boolean;
}

interface CommonData {
  id: string;
  title: string | null;
  description: string | null;
  datetime: number;
  link: string;

  account_url: string | null;
  account_id: string | null;
}
export interface TagData extends CommonData {
  type: string;
  width: number;
  height: number;
  size: number;
}

export interface AlbumData extends CommonData {
  cover: string | null;
  cover_width: number | null;
  cover_height: number | null;
  images: ImageData[];
  images_count: number;
}

export interface Payload {
  image?: string;
  video?: string;
  type?: 'file' | 'url' | 'base64';
  name?: string;
  title?: string;
  description?: string;
  album?: string;
}
