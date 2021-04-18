import { __awaiter } from "tslib";
export function getTag(client, options) {
    return __awaiter(this, void 0, void 0, function* () {
        /// TODO: Get the tag image hash for Reddit from the tagnumber provided
        /// TODO: Get the images associated with the tagnumber
        /// TODO: Implement data translation for Imgur image to TagData
        /// TODO: Wrap the response in a BikeTagApiResponse
        return yield client.getImage(options.slug);
    });
}
//# sourceMappingURL=getTag.js.map