import { __awaiter } from "tslib";
import { IMAGE_ENDPOINT } from '../common/endpoints';
export function favoriteImage(client, imageHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${IMAGE_ENDPOINT}/${imageHash}/favorite`;
        return (yield client.request({ url, method: 'POST' })).data;
    });
}
//# sourceMappingURL=favoriteImage.js.map