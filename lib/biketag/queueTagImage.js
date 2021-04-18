import { __awaiter } from "tslib";
// import { UPLOAD_ENDPOINT } from '../common/endpoints';
export function queueTagImage(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(payload)) {
            const promises = payload.map((p) => {
                // const form = createForm(p);
                // const req = client.request(UPLOAD_ENDPOINT, {
                //   method: 'POST',
                //   body: form,
                //   resolveBodyOnly: true,
                // });
                // const id = ;
                // req.on('uploadProgress', (progress: Progress) => {
                //   client.emit('uploadProgress', { ...progress, id });
                // });
                return p;
            });
            return yield Promise.all(promises);
        }
        // const form = createForm(payload);
        // const req = client.request(UPLOAD_ENDPOINT, {
        //   method: 'POST',
        //   body: form,
        //   resolveBodyOnly: true,
        // });
        // req.on('uploadProgress', (progress: Progress) => {
        //   client.emit('uploadProgress', { ...progress, id });
        // });
        return client;
    });
}
//# sourceMappingURL=queueTagImage.js.map