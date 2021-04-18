import { __awaiter } from "tslib";
import { IMAGE_ENDPOINT } from '../common/endpoints';
// function isValidUpdatePayload(p: UpdateTagImagePayload) {
//   return typeof p.title === 'string' || typeof p.description === 'string';
// }
export function updateTagImage(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (Array.isArray(payload)) {
        //   const promises = payload.map((p: UpdateTagImagePayload) => {
        //     if (!isValidUpdatePayload(p)) {
        //       throw new Error('Update requires a title and/or description');
        //     }
        //     const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
        //     const form = createForm(p);
        //     return (client.request(url, {
        //       method: 'POST',
        //       body: form,
        //       resolveBodyOnly: true,
        //     }) as unknown) as Promise<BikeTagApiResponse<boolean>>;
        //   });
        //   return await Promise.all(promises);
        // }
        // if (!isValidUpdatePayload(payload)) {
        //   throw new Error('Update requires a title and/or description');
        // }
        const url = `${IMAGE_ENDPOINT}/${payload.slug}`;
        return (yield client.request({ url, method: 'DELETE' })).data;
        // // const form = createForm(payload);
        // return ((await client.request(url, {
        //   method: 'POST',
        //   body: form,
        //   resolveBodyOnly: true,
        // })) as unknown) as BikeTagApiResponse<boolean>;
    });
}
//# sourceMappingURL=updateTagImage.js.map