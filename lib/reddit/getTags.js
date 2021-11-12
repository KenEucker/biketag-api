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
import { getBikeTagInformationFromRedditData, getBikeTagsFromRedditPosts, } from './helpers';
export function getTags(client, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            throw new Error('no options');
        }
        const query = `subreddit:${options.subreddit} title:Bike Tag`;
        options.sort = (_a = options.sort) !== null && _a !== void 0 ? _a : 'new';
        options.limit = (_b = options.limit) !== null && _b !== void 0 ? _b : 10;
        options.time = (_c = options.time) !== null && _c !== void 0 ? _c : 'all';
        return client
            .getSubreddit(options.subreddit)
            .search(Object.assign({ query }, options))
            .then((redditPosts) => __awaiter(this, void 0, void 0, function* () {
            const redditBikeTagData = yield getBikeTagsFromRedditPosts(redditPosts, this.images);
            const bikeTags = [];
            for (const biketagPost of redditBikeTagData) {
                bikeTags.push(yield getBikeTagInformationFromRedditData(biketagPost));
            }
            const response = {
                data: bikeTags,
                status: 1,
                success: true,
                source: AvailableApis[AvailableApis.reddit],
            };
            return response;
        }));
    });
}
