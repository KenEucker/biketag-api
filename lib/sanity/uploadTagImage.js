import { __awaiter } from "tslib";
export function uploadTagImage(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = null;
        if (Array.isArray(payload)) {
            const promises = payload.map((p) => {
                return p;
            });
            return yield Promise.all(promises);
        }
        return yield { client, req };
    });
}
//# sourceMappingURL=uploadTagImage.js.map