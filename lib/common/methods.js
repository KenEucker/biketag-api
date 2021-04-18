import { tagDataReferenceFields } from './data';
export function isBikeTagAccessToken(arg) {
    return arg.accessToken !== undefined;
}
export function isBikeTagClientId(arg) {
    return arg.clientId !== undefined;
}
export function isBikeTagLogin(arg) {
    return (arg.clientId !== undefined &&
        arg.username !== undefined &&
        arg.password !== undefined);
}
export function isSanityAccessToken(arg) {
    return arg.accessToken !== undefined;
}
// export function isSanityClientId(arg: unknown): arg is SanityClientId {
//   return (arg as SanityClientId).projectId !== undefined
// }
// export function isSanityLogin(arg: unknown): arg is SanityLogin {
//   return (
//     (arg as SanityLogin).projectId !== undefined &&
//     (arg as SanityLogin).username !== undefined &&
//     (arg as SanityLogin).password !== undefined
//   )
// }
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
export function constructTagNumberSlug(number, game = 'portland') {
    return `${game}-tag-${number}`;
}
export function isImgurCredentials(credentials) {
    return !!(credentials.clientId !== undefined || credentials.clientSecret !== undefined);
}
export function isSanityCredentials(credentials) {
    return !!(credentials.projectId && credentials.accessToken);
}
//# sourceMappingURL=methods.js.map