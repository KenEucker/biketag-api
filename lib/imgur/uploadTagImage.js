import { __awaiter } from "tslib";
// import { Progress } from 'axios';
export function uploadTagImage(
// client: ImgurClient,
payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(payload)) {
            const promises = payload.map((p) => {
                // const form = createForm(p);
                // const req = client.request('UPLOAD_ENDPOINT', {
                //   method: 'POST',
                //   body: form,
                //   resolveBodyOnly: true,
                // });
                const id = "a" + p;
                // req.on('uploadProgress', (progress: Progress) => {
                //   client.emit('uploadProgress', { ...progress, id });
                // });
                return id;
            });
            return yield Promise.all(promises);
        }
        // const form = createForm(payload);
        // const req = client.request('UPLOAD_ENDPOINT', {
        //   method: 'POST',
        //   body: form,
        //   resolveBodyOnly: true,
        // });
        const id = "Ads";
        // req.on('uploadProgress', (progress: Progress) => {
        //   client.emit('uploadProgress', { ...progress, id });
        // });
        return id;
    });
}
//# sourceMappingURL=uploadTagImage.js.map