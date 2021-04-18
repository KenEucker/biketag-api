import { __awaiter } from "tslib";
import { constructTagDataObject } from '../common/methods';
import { tagDataReferenceFields } from '../common/data';
export function getTag(client, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            throw new Error('no options');
        }
        if (!options.slug.length) {
            throw new Error('no slug');
        }
        const fields = options.fields.reduce((o, f) => {
            o += `${f}${tagDataReferenceFields.indexOf(f) != -1 ? '->{name}' : ''},`;
            return o;
        }, '').slice(0, -1);
        const query = `*[_type == "tag" && slug.current == "${options.slug}"][0]{${fields}}`;
        const params = {};
        return client.fetch(query, params).then((tag) => {
            // construct tagData object from tag
            const tagData = constructTagDataObject(tag, options.fields);
            // wrap tag in BikeTagApiResponse
            const response = {
                data: tagData,
                status: 1,
                success: true,
                source: 'sanity',
            };
            // return BikeTagApiResponse
            return response;
        });
    });
}
//# sourceMappingURL=getTag.js.map