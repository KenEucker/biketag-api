var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tagDataReferenceFields, gameDataReferenceFields, createGame, createTag, tagDataFields, tagDataObjectFields, gameDataFields, gameDataArrayFields, tagDataAssetFields, } from '../common/data';
export function constructTagFromSanityObject(data, fields = []) {
    var _a, _b;
    const tagData = fields.length
        ? fields.reduce((o, f) => {
            o[f] = data[f];
            return o;
        }, {})
        : data;
    tagDataReferenceFields.forEach((f) => {
        if (tagData[f] && typeof tagData[f] !== 'undefined') {
            tagData[f] = tagData[f].name;
        }
    });
    Object.keys(tagDataObjectFields).forEach((f) => {
        if (tagData[f] && typeof tagData[f] !== 'undefined') {
            const objectTree = tagDataObjectFields[f].split('->');
            let targetObj = tagData[f];
            objectTree.forEach((o) => {
                var _a;
                targetObj = (_a = targetObj[o]) !== null && _a !== void 0 ? _a : undefined;
            });
            tagData[f] = targetObj;
        }
    });
    tagData.slug = (_b = (_a = tagData.slug) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : 'latest';
    return createTag(tagData);
}
export function constructObjectIdFromSlug(slug) {
    return slug
        .replace(/\s/g, '_')
        .replace(/\//g, '-')
        .replace(/[^\w\d]/g, '')
        .toLowerCase();
}
export function constructSanityObjectFromTag(client, data, fields = []) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const tagData = fields.length
            ? fields.reduce((o, f) => {
                o[f] = data[f];
                return o;
            }, {})
            : data;
        for (const field of tagDataReferenceFields) {
            const fieldValue = tagData[field];
            if (fieldValue) {
                /// get the reference values from cache
                const refQuery = `*[_type == "${field}" && slug.current == "${fieldValue}"]{_id}`;
                const referenceObject = yield client.fetch(refQuery, {});
                let referenceId = '';
                if (referenceObject.length) {
                    referenceId = referenceObject[0]._id;
                }
                else {
                    // Create new reference
                    const newReferenceObject = yield client.createIfNotExists({
                        _id: constructObjectIdFromSlug(fieldValue),
                        _type: field,
                        name: fieldValue,
                    });
                    referenceId = newReferenceObject._id;
                }
                tagData[field] = {
                    _type: 'reference',
                    _ref: referenceId,
                };
            }
        }
        for (const field of tagDataAssetFields) {
            const fieldValue = tagData[field];
            if (fieldValue) {
                tagData[field] = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: fieldValue,
                    },
                };
            }
        }
        tagData._type = 'tag';
        tagData._id = (_a = tagData._id) !== null && _a !== void 0 ? _a : tagData.slug;
        tagData.slug = {
            current: (_c = (_b = tagData.slug) === null || _b === void 0 ? void 0 : _b.current) !== null && _c !== void 0 ? _c : tagData.slug,
        };
        return createTag(tagData);
    });
}
export function constructGameFromSanityObject(data, fields = []) {
    var _a, _b;
    const gameData = fields.length
        ? fields.reduce((o, f) => {
            o[f] = data[f];
            return o;
        }, {})
        : data;
    gameDataReferenceFields.forEach((f) => {
        if (gameData[f] && typeof gameData[f] !== 'undefined') {
            gameData[f] = gameData[f].name;
        }
    });
    gameData.slug = (_b = (_a = gameData.slug) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : gameData.slug;
    return createGame(gameData);
}
export function constructSanityFieldsQuery(fields = [], type = 'tag') {
    let referenceFields = [], arrayFields = [];
    switch (type) {
        case 'game':
            referenceFields = gameDataReferenceFields;
            fields = fields.length ? fields : gameDataFields;
            arrayFields = gameDataArrayFields;
            break;
        default:
        case 'tag':
            referenceFields = tagDataReferenceFields;
            fields = fields.length ? fields : tagDataFields;
            break;
    }
    return fields
        .reduce((o, f) => {
        const isRefrerenceField = referenceFields.indexOf(f) != -1;
        const isArrayField = arrayFields.indexOf(f) != -1;
        o += `${isArrayField
            ? `"${f}": ${f}[]->name`
            : isRefrerenceField
                ? `${f}->{name}`
                : f},`;
        return o;
    }, '')
        .slice(0, -1);
}
