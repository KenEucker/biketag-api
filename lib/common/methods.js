import { tagDataReferenceFields } from './data';
import FormData from 'form-data';
export function isBase64(payload) {
    if (typeof payload === 'string') {
        return false;
    }
    return typeof payload.base64 !== 'undefined';
}
export function isImageUrl(payload) {
    if (typeof payload === 'string') {
        return true;
    }
    return typeof payload.image !== 'undefined' && typeof payload === 'string';
}
export function isStream(payload) {
    if (typeof payload === 'string') {
        return false;
    }
    return typeof payload.stream !== 'undefined';
}
export function createForm(payload) {
    const form = new FormData();
    if (typeof payload === 'string') {
        form.append('image', payload);
        return form;
    }
    for (const [key, value] of Object.entries(payload)) {
        const supportedUploadObjectTypes = ['base64', 'stream'];
        if (supportedUploadObjectTypes.indexOf(key) !== -1) {
            if (supportedUploadObjectTypes.indexOf(payload.type) !== -1) {
                form.append(key, payload);
            }
        }
        else {
            form.append(key, value);
        }
    }
    return form;
}
export function isAccessToken(arg) {
    return arg.clientToken !== undefined;
}
export function isClientKey(arg) {
    return arg.clientKey !== undefined;
}
export function isSanityAccessToken(arg) {
    return arg.accessToken !== undefined;
}
export function isSanityClientId(arg) {
    return arg.projectId !== undefined;
}
export function isImgurAccessToken(arg) {
    return arg.accessToken !== undefined;
}
export function isImgurClientId(arg) {
    return arg.clientId !== undefined;
}
export function constructTagDataObject(data, fields = []) {
    const tagData = fields.length
        ? fields.reduce((o, f) => {
            o[f] = data[f];
            return o;
        }, {})
        : data;
    tagDataReferenceFields.forEach((f) => {
        if (typeof tagData[f] !== 'undefined') {
            tagData[f] = tagData[f].name;
        }
    });
    // tagData.slug = tagData.slug?.current ? tagData.slug.current : undefined // Undefined would be a problem
    tagData.slug = tagData.slug.current;
    return tagData;
}
export function constructTagNumberSlug(number, game = '') {
    return `${game}-tag-${number}`;
}
export function isImgurCredentials(credentials) {
    return !!(credentials.clientId !== undefined || credentials.clientSecret !== undefined);
}
export function isSanityCredentials(credentials) {
    return !!(credentials.projectId !== undefined && credentials.accessToken !== undefined);
}
export function isBikeTagCredentials(credentials) {
    return !!(credentials.clientToken !== undefined &&
        credentials.clientKey !== undefined);
}
export function assignImgurCredentials(credentials) {
    const imgurCredentials = isImgurCredentials(credentials)
        ? {
            clientId: credentials.clientId,
            clientSecret: credentials.clientSecret,
        }
        : undefined;
    return imgurCredentials;
}
export function assignSanityCredentials(credentials) {
    const sanityCredentials = isSanityCredentials(credentials)
        ? {
            projectId: credentials.projectId,
            useCdn: credentials.useCdn || true,
            dataset: credentials.dataset || 'development',
            accessToken: credentials.accessToken || '',
            password: credentials.password,
            username: credentials.username,
            apiVersion: credentials.apiVersion || '2021-03-25',
        }
        : undefined;
    return sanityCredentials;
}
export function assignBikeTagCredentials(credentials) {
    const biketagCredentials = isBikeTagCredentials(credentials)
        ? credentials
        : { game: credentials.game };
    return biketagCredentials;
}
export function getImgurPictures() {
    return [];
}
//# sourceMappingURL=methods.js.map