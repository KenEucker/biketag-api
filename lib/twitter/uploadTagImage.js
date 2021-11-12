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
import { getImgurFoundDescriptionFromBikeTagData, getImgurFoundTitleFromBikeTagData, getImgurMysteryDescriptionFromBikeTagData, getImgurMysteryTitleFromBikeTagData, } from '../common/getters';
import { AvailableApis, } from '../common/types';
export function getUploadTagImagePayloadFromTagData(tagData, mystery = true) {
    var _a, _b, _c, _d;
    return {
        album: (_a = tagData.album) !== null && _a !== void 0 ? _a : tagData.hash,
        type: (_b = tagData.type) !== null && _b !== void 0 ? _b : 'url',
        image: mystery ? tagData.mysteryImage : tagData.foundImage,
        title: (_c = tagData.title) !== null && _c !== void 0 ? _c : (mystery
            ? getImgurMysteryTitleFromBikeTagData(tagData)
            : getImgurFoundTitleFromBikeTagData(tagData)),
        description: (_d = tagData.description) !== null && _d !== void 0 ? _d : (mystery
            ? getImgurMysteryDescriptionFromBikeTagData(tagData)
            : getImgurFoundDescriptionFromBikeTagData(tagData)),
    };
}
function isValidUploadTagImagePayload(utp) {
    return (
    /// TODO: do better type checking here
    utp &&
        typeof utp.image !== 'undefined' &&
        (typeof utp.title === 'string' || typeof utp.description === 'string'));
}
export function uploadTagImage(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        const payloads = Array.isArray(payload) ? payload : [payload];
        const createUploadPromise = (utp) => {
            let success = true;
            const mysteryImageUploadPayload = !utp.mysteryImageUrl && utp.mysteryImage
                ? getUploadTagImagePayloadFromTagData(utp)
                : null;
            const foundImageUrlUploadPayload = !utp.foundImageUrl && utp.foundImage
                ? getUploadTagImagePayloadFromTagData(utp, false)
                : null;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (isValidUploadTagImagePayload(mysteryImageUploadPayload)) {
                    const mysteryImageUpload = (yield client.upload(mysteryImageUploadPayload));
                    utp.mysteryImageUrl = (_a = mysteryImageUpload.data) === null || _a === void 0 ? void 0 : _a.link;
                    success = success && mysteryImageUpload.success;
                }
                if (isValidUploadTagImagePayload(foundImageUrlUploadPayload)) {
                    const foundImageUpload = (yield client.upload(foundImageUrlUploadPayload));
                    utp.foundImageUrl = (_b = foundImageUpload.data) === null || _b === void 0 ? void 0 : _b.link;
                    success = success && foundImageUpload.success;
                }
                resolve({
                    data: createTag(utp),
                    success,
                    source: AvailableApis[AvailableApis.imgur],
                    status: 200,
                });
            }));
        };
        payloads.map((p) => promises.push(createUploadPromise(p)));
        return Promise.all(promises)
            .then((results) => {
            return results;
        })
            .catch((e) => {
            return {
                data: e.message,
                success: false,
                source: AvailableApis[AvailableApis.imgur],
                status: 200,
            };
        });
    });
}
