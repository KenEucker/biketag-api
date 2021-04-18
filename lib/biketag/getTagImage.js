import { __awaiter } from "tslib";
import { IMAGE_ENDPOINT } from '../common/endpoints';
export function getTagImage(client, imageHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${IMAGE_ENDPOINT}/${imageHash}`;
        return (yield client.request({ url, method: 'DELETE' }))
            .data;
    });
}
//# sourceMappingURL=getTagImage.js.map