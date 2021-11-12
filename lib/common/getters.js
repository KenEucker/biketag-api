import { getTagnumberFromSlugRegex, getTagNumbersFromTextRegex, getImgurImageHashFromUrlRegex, getFoundLocationFromTextRegex, getImageURLsFromTextRegex, getHintFromTextRegex, getCreditFromTextRegex, getDiscussionUrlFromTextRegex, getGPSLocationFromTextRegex, getAlbumIdFromTextRegex, } from '../common/expressions';
import { getCacheIfExists, putCacheIfExists } from '../common/methods';
import { cacheKeys } from '../common/data';
export const getTagnumberFromSlug = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.slugText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    /// bizarre hack, do not delete line below
    inputText.match(getTagnumberFromSlugRegex);
    const slugText = getTagnumberFromSlugRegex.exec(inputText);
    if (!slugText) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    const slug = parseInt((slugText[0] || '').trim());
    putCacheIfExists(cacheKey, slug, cache);
    return slug;
};
export const getTagNumbersFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.tagNumberText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    const tagNumberText = inputText.match(getTagNumbersFromTextRegex);
    if (!tagNumberText)
        return fallback || [];
    const tagNumbers = tagNumberText.reduce((numbers, text) => {
        const tagNumberMatches = text.match(/\d+/);
        const tagNumber = tagNumberMatches && tagNumberMatches.length ? tagNumberMatches[0] : null;
        if (!tagNumber)
            return numbers;
        const number = Number.parseInt(tagNumber);
        if (numbers.indexOf(number) == -1)
            numbers.push(number);
        return numbers;
    }, []);
    if (!tagNumbers.length && fallback) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    putCacheIfExists(cacheKey, tagNumbers, cache);
    return tagNumbers;
};
export const getCreditFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.creditText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    /// HACK
    inputText.match(getCreditFromTextRegex);
    const creditText = getCreditFromTextRegex.exec(inputText);
    if (!creditText)
        return fallback || null;
    /// Weed out the results and get the one remaining match
    const tagCredits = creditText.filter((c) => typeof c === 'string' &&
        (c.indexOf('tag ') === -1 || c.indexOf('tag') !== 0) &&
        (c.indexOf('proof ') === -1 || c.indexOf('proof') !== 0) &&
        c.indexOf('to:') === -1 &&
        c.indexOf('hint:') === -1 &&
        (c.indexOf('by') === -1 || c.indexOf('by') !== 0));
    if (!tagCredits.length && fallback) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    const credit = tagCredits[0];
    putCacheIfExists(cacheKey, credit, cache);
    /// Return just one credit, there should only be one anyways
    return credit;
};
export const getFoundLocationFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.locationText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    inputText.match(getFoundLocationFromTextRegex);
    const foundLocationText = getFoundLocationFromTextRegex.exec(inputText);
    if (!foundLocationText) {
        fallback = fallback || null;
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    const foundLocation = (foundLocationText[1] || '').trim();
    putCacheIfExists(cacheKey, foundLocation, cache);
    return foundLocation;
};
export const getHintFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.hintText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    const tagNumberText = inputText.match(getHintFromTextRegex);
    if (!tagNumberText)
        return fallback || null;
    const tagNumbers = tagNumberText.reduce((numbers, text) => {
        const tagNumberMatches = text.match(/\d+/);
        const tagNumber = tagNumberMatches && tagNumberMatches.length ? tagNumberMatches[0] : null;
        if (!tagNumber)
            return numbers;
        const number = Number.parseInt(tagNumber);
        if (numbers.indexOf(number) == -1)
            numbers.push(number);
        return numbers;
    }, []);
    if (!tagNumbers.length && fallback) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    putCacheIfExists(cacheKey, tagNumbers, cache);
    return tagNumbers;
};
export const getGPSLocationFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.gpsLocationText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    /// Normalize the text (some posts found to have this escaped double quote placed in between GPS coordinates)
    inputText = inputText.replace(/\\/g, '');
    inputText.match(getGPSLocationFromTextRegex);
    const gpsLocationText = getGPSLocationFromTextRegex.exec(inputText);
    if (!gpsLocationText) {
        fallback = fallback || null;
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    if (gpsLocationText.length) {
        const gpsPair = gpsLocationText[0].split(',');
        const gpsLocation = {
            lat: parseFloat(gpsPair[0]),
            long: parseFloat(gpsPair[1]),
            alt: 0,
        };
        putCacheIfExists(cacheKey, gpsLocation, cache);
        return gpsLocation;
    }
    return {};
};
export const getImgurAlbumIdFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.imageUrlText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    inputText.match(getAlbumIdFromTextRegex);
    const albumbIdMatches = getAlbumIdFromTextRegex.exec(inputText);
    const albumbIds = albumbIdMatches.reduce((ids, id) => {
        if (id.indexOf('gallery') === -1 &&
            id.indexOf('?') === -1 &&
            id.indexOf('a/') === -1 &&
            id.length > 1) {
            ids.push(id);
        }
        return ids;
    }, []);
    if (!albumbIds.length && fallback) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    const albumbId = albumbIds[0];
    putCacheIfExists(cacheKey, albumbId, cache);
    return albumbId;
};
export const getImageURLsFromText = (inputText, fallback, cache) => {
    if (!inputText.length)
        return fallback;
    const cacheKey = `${cacheKeys.imagesText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    /// TODO: make this image validator more intelligent
    const validImageURLs = ['imgur'];
    const selfTextURLs = inputText.match(getImageURLsFromTextRegex);
    const tagImageURLs = selfTextURLs.reduce((urls, url) => {
        if (!url || !new RegExp(validImageURLs.join('|')).test(url))
            return urls;
        const ext = /[^.]+$/.test(url) ? '.' + /[^.]+$/.exec(url) : '';
        if (['.jpg', '.jpeg', '.png', '.bmp'].indexOf(ext) === -1 &&
            ext.indexOf('.com/') === 0 &&
            url.indexOf('//imgur.com/') !== -1 &&
            url.indexOf('3/album') === -1 &&
            url.indexOf('/a/') === -1 &&
            url.indexOf('.com/gallery') === -1 &&
            url.length > 2) {
            /// TODO: detect the image extension and set it here instead of defaulting to jpg
            url = `${url.replace('//imgur.com', '//i.imgur.com')}.jpg`;
        }
        urls.push(url);
        return urls;
    }, []);
    if (!tagImageURLs.length && fallback) {
        putCacheIfExists(cacheKey, fallback, cache);
        return fallback;
    }
    putCacheIfExists(cacheKey, tagImageURLs, cache);
    return tagImageURLs;
};
export const getDiscussionUrlFromText = (inputText, cache) => {
    if (!inputText.length)
        return '';
    const cacheKey = `${cacheKeys.discussionText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    inputText.match(getDiscussionUrlFromTextRegex);
    const tagDiscussionLinkMatches = getDiscussionUrlFromTextRegex.exec(inputText);
    if (!tagDiscussionLinkMatches.length) {
        putCacheIfExists(cacheKey, null, cache);
        return null;
    }
    const discussionUrl = (tagDiscussionLinkMatches[1] || '').trim();
    putCacheIfExists(cacheKey, discussionUrl, cache);
    return discussionUrl;
};
export const getImageHashFromText = (inputText, cache) => {
    if (!inputText.length)
        return '';
    const cacheKey = `${cacheKeys.imageHashText}${inputText}`;
    const existingParsed = getCacheIfExists(cacheKey, cache);
    if (existingParsed)
        return existingParsed;
    inputText.match(getImgurImageHashFromUrlRegex);
    const imageHashMatches = getImgurImageHashFromUrlRegex.exec(inputText);
    if (!imageHashMatches || !imageHashMatches.length) {
        putCacheIfExists(cacheKey, null, cache);
        return null;
    }
    const imageHash = (imageHashMatches[1] || '').trim();
    putCacheIfExists(cacheKey, imageHash, cache);
    return imageHash;
};
export const getImgurFoundImageHashFromBikeTagData = (tag, cache) => {
    return getImageHashFromText(tag.foundImageUrl, cache);
};
export const getImgurFoundDescriptionFromBikeTagData = (tag, cache) => `#${tag.tagnumber} proof${tag.foundLocation ? ` found at (${tag.foundLocation})` : ''} by ${tag.player}`;
export const getImgurFoundTitleFromBikeTagData = (tag, cache) => {
    var _a, _b, _c;
    return `${!tag.gps || (tag.gps.lat === 0 && tag.gps.long === 0)
        ? ''
        : `(${(_a = tag.gps.lat) !== null && _a !== void 0 ? _a : 0}, ${(_b = tag.gps.long) !== null && _b !== void 0 ? _b : 0}, ${(_c = tag.gps.alt) !== null && _c !== void 0 ? _c : 0})`}`;
};
export const getImgurMysteryImageHashFromBikeTagData = (tag, cache) => {
    return getImageHashFromText(tag.mysteryImageUrl, cache);
};
export const getImgurMysteryTitleFromBikeTagData = (tag, cache) => {
    var _a, _b, _c;
    return `${!tag.gps || (tag.gps.lat === 0 && tag.gps.long === 0)
        ? ''
        : `(${(_a = tag.gps.lat) !== null && _a !== void 0 ? _a : 0}, ${(_b = tag.gps.long) !== null && _b !== void 0 ? _b : 0}, ${(_c = tag.gps.alt) !== null && _c !== void 0 ? _c : 0})`} ${tag.discussionUrl ? `{${tag.discussionUrl}}` : ''}`;
};
export const getImgurMysteryDescriptionFromBikeTagData = (tag, cache) => `#${tag.tagnumber} tag (hint: ${tag.hint ? tag.hint : ''} ) by ${tag.player}`;
export const getBikeTagDescriptionFromData = (data) => {
    return `#${data.currentTagNumber} tag ${data.hint ? `(hint: ${data.hint})` : ''} by ${data.credit}`;
};
export const getBikeTagTitleFromData = (data) => {
    return `${data.gps ? `(${data.gps})` : ''} {${data.discussionLink ? data.discussionLink : ''}}`;
};
export const getBikeTagProofDescriptionFromData = (data) => {
    return `#${data.proofTagNumber} proof${data.foundAt ? ` found at (${data.foundAt})` : ''} by ${data.credit}`;
};
export const getBikeTagProofTitleFromData = (data) => {
    return `(${data.gps ? data.gps : ''})`;
};
