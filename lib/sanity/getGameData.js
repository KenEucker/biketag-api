var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AvailableApis } from '../common/types';
import { constructGameFromSanityObject, constructSanityFieldsQuery, } from './helpers';
export function getGameData(client, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            throw new Error('no options');
        }
        const fields = constructSanityFieldsQuery(options.fields, 'game');
        const slugIsSet = (_a = options.slug) === null || _a === void 0 ? void 0 : _a.length;
        const nameIsSet = (_b = options.name) === null || _b === void 0 ? void 0 : _b.length;
        const query = slugIsSet
            ? `*[_type == "game" && slug.current == "${options.slug}"][0]{${fields}}`
            : nameIsSet
                ? `*[_type == "game" && name match "${options.name}"][0]{${fields}}`
                : '*[_type == "game"]';
        const params = {};
        return client.fetch(query, params).then((game) => {
            const isArray = Array.isArray(game);
            const games = isArray ? game : [game];
            const gameData = [];
            // construct gameData object from game
            for (const game of games) {
                gameData.push(constructGameFromSanityObject(game, options.fields));
            }
            // wrap tag in BikeTagApiResponse
            const response = {
                data: isArray ? gameData : gameData[0],
                status: 1,
                success: true,
                source: AvailableApis[AvailableApis.sanity],
            };
            // return BikeTagApiResponse
            return response;
        });
    });
}
