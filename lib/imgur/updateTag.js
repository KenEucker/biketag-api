import { __awaiter } from "tslib";
// function isValidUpdatePayload(p: UpdateTagPayload) {
//   return typeof p.title === 'string' || typeof p.description === 'string';
// }
export function updateTag(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (Array.isArray(payload)) {
        //   const promises = payload.map((p: UpdateTagPayload) => {
        //     if (!isValidUpdatePayload(p)) {
        //       throw new Error('Update requires a title and/or description');
        //     }
        //     const form = createForm(p);
        //     return (client.request('url', {
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
        // const form = createForm(payload);
        // return ((await client.request('url', {
        //   method: 'POST',
        //   body: form,
        //   resolveBodyOnly: true,
        // })) as unknown) as BikeTagApiResponse<boolean>;
        return (yield client.request({ url: payload, method: 'POST' }))
            .data;
    });
}
//# sourceMappingURL=updateTag.js.map