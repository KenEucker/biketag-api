var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTag } from '../common/data';
import { getCreditFromText, getFoundLocationFromText, getGPSLocationFromText, getHintFromText, getImageURLsFromText, getImgurAlbumIdFromText, getTagNumbersFromText, } from '../common/getters';
export function getBikeTagsFromRedditPosts(posts, imageClient) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let selftext = '', postBody, isSelfPost = true, isImagePost = false;
        const postTexts = [];
        const unreadableRedditPosts = [];
        for (const p of posts) {
            try {
                const imgurBaseUrl = 'imgur.com';
                // const imageBaseUrl = `i.${imgurBaseUrl}/`
                const galleryBaseUrl = `${imgurBaseUrl}/gallery/`;
                const albumBaseUrl = `${imgurBaseUrl}/a/`;
                const imageUrlIsRedditGallery = p.is_gallery;
                if (p.selftext && p.selftext.length) {
                    postBody = selftext = p.selftext;
                }
                else if (p.media && p.media.oembed) {
                    /// Might be a single tag?
                    postBody = `${p.media.oembed.title} ${p.media.oembed.description}`;
                    selftext = p.media.oembed.provider_url;
                    isSelfPost = false;
                }
                else if ((((_a = p.preview) === null || _a === void 0 ? void 0 : _a.images) || imageUrlIsRedditGallery) && p.url) {
                    let expandedPostReplies;
                    yield p.expandReplies({ depth: 1 }).then((r) => {
                        expandedPostReplies = r;
                    });
                    const comments = ((_b = expandedPostReplies.comments) === null || _b === void 0 ? void 0 : _b.length)
                        ? expandedPostReplies.comments.filter((c) => c.author.name === p.author.name)
                        : [];
                    selftext = postBody = comments.length
                        ? comments.reduce((o, v) => {
                            return `${o} ${v.body}`;
                        }, p.url)
                        : p.url;
                    isImagePost = true;
                    // console.log({comments: expandedPostReplies.comments.reduce((o, c) => o + c.body, ''), body: comments.reduce((o, c) => o + c.body, '') })
                }
                else {
                    selftext = null;
                }
                // console.log({selftext, title: p.title})
                if (selftext) {
                    const tagImageURLs = getImageURLsFromText(selftext, []);
                    const tagNumbers = getTagNumbersFromText(postBody);
                    let hint = getHintFromText(postBody, '');
                    let foundAt = getFoundLocationFromText(postBody, '');
                    let gps = getGPSLocationFromText(postBody, undefined);
                    let credit = getCreditFromText(postBody, `u/${p.author.name}`);
                    let timestamp = p.created_utc;
                    const directImageLinks = [];
                    let directImageLinksNumbers = tagNumbers;
                    for (let u = 0; u < tagImageURLs.length; u++) {
                        try {
                            const imageUrl = tagImageURLs[u];
                            const galleryIndex = imageUrl.indexOf(galleryBaseUrl);
                            const albumIndex = imageUrl.indexOf(albumBaseUrl);
                            const imageUrlIsGallery = galleryIndex !== -1;
                            const imageUrlIsAlbum = albumIndex !== -1;
                            const imageIsMultipleIndex = imageUrlIsGallery
                                ? galleryIndex
                                : albumIndex;
                            const imageIsMultipleLength = imageUrlIsGallery
                                ? galleryBaseUrl.length
                                : albumBaseUrl.length;
                            // console.log({imageIsMultipleIndex, imageUrlIsAlbum, imageUrlIsGallery, imageUrl})
                            /// If the one image is a gallery, we need to go get it's images and parse those
                            if (imageUrlIsGallery || imageUrlIsAlbum) {
                                const galleryID = getImgurAlbumIdFromText(imageUrl, imageUrl.substring(imageIsMultipleIndex + imageIsMultipleLength));
                                const galleryInfoResponse = yield imageClient.getAlbum(galleryID);
                                if (galleryInfoResponse) {
                                    for (const image of galleryInfoResponse.data.images) {
                                        const imageText = `${image.title} ${image.description}`;
                                        const newImageNumbers = getTagNumbersFromText(imageText, []);
                                        if (newImageNumbers.length) {
                                            ;
                                            directImageLinksNumbers.splice(u, 1);
                                            directImageLinksNumbers = directImageLinksNumbers.concat(newImageNumbers);
                                        }
                                        directImageLinks.push(image.link);
                                        // console.log({
                                        //   directImageLinks,
                                        //   timestamp,
                                        //   hint,
                                        //   foundAt,
                                        //   credit,
                                        //   gps,
                                        // })
                                        /// TODO: might need a conversion to utc here
                                        timestamp = (_c = image.datetime) !== null && _c !== void 0 ? _c : timestamp;
                                        hint = hint !== null && hint !== void 0 ? hint : getHintFromText(imageText, '');
                                        foundAt = foundAt !== null && foundAt !== void 0 ? foundAt : getFoundLocationFromText(postBody, '');
                                        credit = credit !== null && credit !== void 0 ? credit : getCreditFromText(postBody, '');
                                        gps = gps !== null && gps !== void 0 ? gps : getGPSLocationFromText(postBody, undefined);
                                        credit = credit !== null && credit !== void 0 ? credit : image.account_url;
                                    }
                                }
                            }
                            else if (imageUrlIsRedditGallery) {
                                for (const image of p.gallery_data.items) {
                                    directImageLinks.push(`https://preview.redd.it/${image.media_id}.jpg`);
                                }
                            }
                            else {
                                directImageLinks.push(imageUrl);
                            }
                        }
                        catch (e) {
                            // console.log(p.title, { selftext, tagImageURLs, tagNumbers })
                            console.error('get image url', e);
                        }
                    }
                    if (!directImageLinksNumbers.length) {
                        /// No tag numbers found?
                        unreadableRedditPosts.push(p);
                    }
                    else {
                        if (!foundAt) {
                            foundAt = postBody;
                            const removeStringFromFoundAt = (s) => {
                                foundAt = foundAt.replace(s, '');
                            };
                            const foundAtRemnantRegex = /\s*at\s*/gi;
                            tagImageURLs.forEach(removeStringFromFoundAt);
                            tagNumbers.forEach((s) => removeStringFromFoundAt(`#${s}`));
                            if (credit) {
                                removeStringFromFoundAt(`(@|#|u/)?${credit}`);
                            }
                            if (gps) {
                                removeStringFromFoundAt(new RegExp(`(@|#)?${gps.lat}.?${gps.long}|(@|#)?${gps.lat},${gps.long}`, 'gi'));
                            }
                            if (hint) {
                                removeStringFromFoundAt(new RegExp(/(\()?(hint:?)?\s*(${hint})(\s?\))?/gi));
                            }
                            removeStringFromFoundAt(/\[(?:bike)?\s*tag\s*\d*\]\(\s*\)/gi);
                            removeStringFromFoundAt(/\[\s*\]\(http.*\)/gi);
                            removeStringFromFoundAt(/\[(?!(?:bike)?\s*tag\s*).*\]\(.*\)/gi);
                            removeStringFromFoundAt(/\[(?:bike)?\s*tag\s*\d*\s*-/gi);
                            removeStringFromFoundAt(/\]\(\s*\)/gi);
                            removeStringFromFoundAt(/\r?\n?/gi);
                            removeStringFromFoundAt(/\\/gi);
                            removeStringFromFoundAt(/\(\s*\)/gi);
                            removeStringFromFoundAt(/&#.*;/gi);
                            if (foundAt.endsWith('at') || foundAt.endsWith('at '))
                                removeStringFromFoundAt(foundAtRemnantRegex);
                            if (foundAt.startsWith('-') || foundAt.startsWith(' -'))
                                removeStringFromFoundAt(/^\s*-/i);
                            if (foundAt.startsWith(',') || foundAt.startsWith(' ,'))
                                removeStringFromFoundAt(/^\s*,/i);
                            foundAt = foundAt.trim();
                        }
                        postTexts.push({
                            id: p.id,
                            isSelfPost,
                            isImagePost,
                            selftext,
                            postBody,
                            timestamp,
                            tagNumbers: directImageLinksNumbers,
                            tagImageURLs: directImageLinks,
                            credit,
                            gps,
                            foundAt,
                            hint,
                            author_flair: p.author_flair_text,
                        });
                    }
                }
            }
            catch (e) {
                console.error('assign', e);
            }
        }
        if (unreadableRedditPosts.length) {
            console.log({ unreadableRedditPosts });
        }
        return postTexts;
    });
}
export function getBikeTagInformationFromRedditData(redditPostData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!redditPostData.tagNumbers) {
            /// TODO: handle a link that is an image gallery and has only one tag number attached
            redditPostData.tagNumbers = [redditPostData.tagNumber];
        }
        const mysteryTagNumber = Math.max(...redditPostData.tagNumbers);
        const proofTagNumber = mysteryTagNumber - 1;
        const previousMysteryTagNumber = proofTagNumber > 1 ? mysteryTagNumber - 1 : 1;
        const currentTagURLIndex = redditPostData.tagNumbers.indexOf(mysteryTagNumber);
        const currentTagURL = redditPostData.tagImageURLs[currentTagURLIndex];
        const proofTagUrlIndex = redditPostData.tagNumbers.indexOf(previousMysteryTagNumber);
        const proofTagURL = proofTagUrlIndex !== -1
            ? redditPostData.tagImageURLs[proofTagUrlIndex]
            : null;
        const gps = redditPostData.gps;
        const tagData = {
            foundLocation: redditPostData.foundAt,
            player: redditPostData.credit,
            hint: redditPostData.hint,
            gps,
            discussionUrl: `https://redd.it/${redditPostData.id}`,
            tagnumber: mysteryTagNumber,
            mysteryImageUrl: currentTagURL,
            foundImageUrl: proofTagURL,
        };
        return createTag(tagData);
    });
}
