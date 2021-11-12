var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AvailableApis, } from '../common/types';
import { getBikeTagNumberFromImage, getBikeTagFromImgurImageSet, sortImgurImagesByTagNumber, } from './helpers';
export function getTag(client, options) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.hash) {
            throw new Error('no Imgur album hash set');
        }
        const albumInfo = yield client.getAlbum(options.hash);
        let imagesData = [];
        if (options.tagnumber) {
            imagesData = (_b = (_a = albumInfo.data) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.filter((image) => getBikeTagNumberFromImage(image) == options.tagnumber);
        }
        else if (!options.tagnumber &&
            options.slug === 'latest' &&
            ((_d = (_c = albumInfo.data) === null || _c === void 0 ? void 0 : _c.images) === null || _d === void 0 ? void 0 : _d.length) > 1) {
            const sortedImages = sortImgurImagesByTagNumber(albumInfo.data.images);
            imagesData.push(sortedImages[0]);
            if (sortedImages[1]) {
                const firstImageNumber = getBikeTagNumberFromImage(sortedImages[0]);
                const secondImageNumber = getBikeTagNumberFromImage(sortedImages[1]);
                if (firstImageNumber === secondImageNumber) {
                    imagesData.push(sortedImages[1]);
                }
            }
        }
        const groupedImages = [];
        imagesData.forEach((image) => {
            const tagnumber = getBikeTagNumberFromImage(image);
            groupedImages[tagnumber] = groupedImages[tagnumber]
                ? groupedImages[tagnumber]
                : [];
            groupedImages[tagnumber].push(image);
        });
        const tagsData = [];
        groupedImages.forEach((images) => {
            tagsData.push(getBikeTagFromImgurImageSet(images[0], images[1], options));
        });
        return {
            data: tagsData[0],
            success: !!tagsData.length,
            source: AvailableApis[AvailableApis.imgur],
            status: 200,
        };
    });
}
