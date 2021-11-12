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
import { getBikeTagNumberFromImage, getBikeTagFromImgurImageSet, } from './helpers';
export function getTags(client, options) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const tagsData = [];
        let images = [];
        const getGroupedImages = (ungroupedImages) => {
            const groupedImages = [];
            ungroupedImages.forEach((image) => {
                const tagnumber = getBikeTagNumberFromImage(image);
                groupedImages[tagnumber] = groupedImages[tagnumber]
                    ? groupedImages[tagnumber]
                    : [];
                groupedImages[tagnumber].push(image);
            });
            return groupedImages;
        };
        if (((_a = options.tagnumbers) === null || _a === void 0 ? void 0 : _a.length) && options.hash) {
            const albumInfo = yield client.getAlbum(options.hash);
            const imagesData = (_c = (_b = albumInfo.data) === null || _b === void 0 ? void 0 : _b.images) === null || _c === void 0 ? void 0 : _c.filter((image) => options.tagnumbers.indexOf(getBikeTagNumberFromImage(image)) !== -1);
            images = getGroupedImages(imagesData);
        }
        else if ((_d = options.slugs) === null || _d === void 0 ? void 0 : _d.length) {
            const imagesData = [];
            const imagePromises = [];
            let success = true;
            const addToArray = (image) => {
                if (image === null || image === void 0 ? void 0 : image.data)
                    imagesData.push(image.data);
                success = image.success && success;
            };
            options.slugs.forEach((slug) => __awaiter(this, void 0, void 0, function* () { return imagePromises.push(client.getImage(slug).then(addToArray)); }));
            yield Promise.all(imagePromises).then((allImages) => {
                images = getGroupedImages(allImages);
            });
        }
        else if (options.hash) {
            const albumInfo = yield client.getAlbum(options.hash);
            const albumImages = ((_e = albumInfo === null || albumInfo === void 0 ? void 0 : albumInfo.data) === null || _e === void 0 ? void 0 : _e.images) || [];
            images = getGroupedImages(albumImages);
        }
        images.forEach((images) => {
            const tagData = getBikeTagFromImgurImageSet(images[0], images[1], options);
            tagsData.push(tagData);
        });
        return {
            data: tagsData,
            success: true,
            source: AvailableApis[AvailableApis.imgur],
            status: 200,
        };
    });
}
