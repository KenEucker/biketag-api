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
import { getImageHashFromImgurImage } from './helpers';
export function deleteTag(client, payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const responses = [];
        const deleteHashes = [];
        let tags = payload.tags;
        if (!tags.length && (payload.tagnumbers || payload.slugs)) {
            tags = yield this.getTags((_a = payload.tagnumbers) !== null && _a !== void 0 ? _a : payload.slugs);
        }
        for (const tag of tags) {
            if (tag.foundImageUrl) {
                deleteHashes.push(getImageHashFromImgurImage({ link: tag.foundImageUrl }));
            }
            if (tag.mysteryImageUrl) {
                deleteHashes.push(getImageHashFromImgurImage({ link: tag.mysteryImageUrl }));
            }
        }
        if (!deleteHashes.length) {
            throw new Error('Imgur delete hashes not set');
        }
        for (const hash of deleteHashes) {
            responses.push(yield client.deleteImage(hash));
        }
        return {
            data: responses,
            success: true,
            source: AvailableApis[AvailableApis.imgur],
            status: 200,
        };
    });
}
