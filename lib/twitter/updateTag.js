var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AvailableApis } from '../common/types';
import { getImgurFoundImageHashFromBikeTagData, getImgurFoundDescriptionFromBikeTagData, getImgurFoundTitleFromBikeTagData, getImgurMysteryTitleFromBikeTagData, getImgurMysteryDescriptionFromBikeTagData, getImgurMysteryImageHashFromBikeTagData, getImageHashFromText, } from '../common/getters';
import { createTag } from '../common/data';
function isValidUpdatePayload(utp) {
    return (typeof utp.imageHash === 'string' &&
        (typeof utp.title === 'string' || typeof utp.description === 'string'));
}
export function getUpdateTagPayloadFromTagData(tagData, mystery = true) {
    return {
        imageHash: mystery
            ? getImgurMysteryImageHashFromBikeTagData(tagData)
            : getImgurFoundImageHashFromBikeTagData(tagData),
        title: mystery
            ? getImgurMysteryTitleFromBikeTagData(tagData)
            : getImgurFoundTitleFromBikeTagData(tagData),
        description: mystery
            ? getImgurMysteryDescriptionFromBikeTagData(tagData)
            : getImgurFoundDescriptionFromBikeTagData(tagData),
    };
}
export function updateTag(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        const payloads = Array.isArray(payload) ? payload : [payload];
        const createUpdatePromise = (utp) => {
            const imgurMysteryImagePayload = getUpdateTagPayloadFromTagData(utp);
            const imgurFoundImagePayload = getUpdateTagPayloadFromTagData(utp, false);
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                let success = true;
                if (isValidUpdatePayload(imgurMysteryImagePayload) &&
                    isValidUpdatePayload(imgurFoundImagePayload)) {
                    const tagExistsForBikeTagAlbum = yield this.getTag(utp.tagnumber);
                    if (tagExistsForBikeTagAlbum.success &&
                        ((_b = (_a = tagExistsForBikeTagAlbum.data) === null || _a === void 0 ? void 0 : _a.mysteryImageUrl) === null || _b === void 0 ? void 0 : _b.length)) {
                        const mysteryImageUpdated = (yield client.updateImage(Object.assign(Object.assign({}, imgurMysteryImagePayload), { imageHash: getImageHashFromText(tagExistsForBikeTagAlbum.data.mysteryImageUrl) })));
                        success = mysteryImageUpdated.data;
                    }
                    else {
                        const mysteryImageUploaded = yield this.uploadTagImage(Object.assign(Object.assign({}, imgurMysteryImagePayload), { mysteryImage: utp.mysteryImageUrl, mysteryImageUrl: undefined }));
                        if ((mysteryImageUploaded === null || mysteryImageUploaded === void 0 ? void 0 : mysteryImageUploaded.length) && mysteryImageUploaded[0].success) {
                            utp.mysteryImageUrl = mysteryImageUploaded[0].data.mysteryImageUrl;
                        }
                        else {
                            success = false;
                        }
                    }
                    if (tagExistsForBikeTagAlbum.success &&
                        ((_d = (_c = tagExistsForBikeTagAlbum.data) === null || _c === void 0 ? void 0 : _c.foundImageUrl) === null || _d === void 0 ? void 0 : _d.length)) {
                        const foundImageUpdated = (yield client.updateImage(Object.assign(Object.assign({}, imgurFoundImagePayload), { imageHash: getImageHashFromText(tagExistsForBikeTagAlbum.data.foundImageUrl) })));
                        success = success && foundImageUpdated.data;
                    }
                    else {
                        const foundImageUploaded = yield this.uploadTagImage(Object.assign(Object.assign({}, imgurFoundImagePayload), { foundImage: utp.foundImageUrl, foundImageUrl: undefined }));
                        if ((foundImageUploaded === null || foundImageUploaded === void 0 ? void 0 : foundImageUploaded.length) && foundImageUploaded[0].success) {
                            utp.foundImageUrl = foundImageUploaded[0].data.foundImageUrl;
                        }
                        else {
                            success = false;
                        }
                    }
                }
                else {
                    throw new Error('one update payload is invalid');
                }
                resolve({
                    data: createTag(utp),
                    success,
                    source: AvailableApis[AvailableApis.imgur],
                    status: 200,
                });
            }));
        };
        payloads.map((p) => promises.push(createUpdatePromise(p)));
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
