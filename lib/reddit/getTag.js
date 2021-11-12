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
export function getTag(client, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            throw new Error('no options');
        }
        if (!options.subreddit) {
            throw new Error('no subreddit set');
        }
        const query = `subreddit:${options.subreddit} title:Bike Tag`;
        options.sort = (_a = options.sort) !== null && _a !== void 0 ? _a : 'new';
        options.limit = 1;
        options.time = (_b = options.time) !== null && _b !== void 0 ? _b : 'all';
        return client
            .getSubreddit(options.subreddit)
            .search(Object.assign({ query }, options))
            .then((redditPosts) => __awaiter(this, void 0, void 0, function* () {
            const redditBikeTagData = yield getBikeTagsFromRedditPosts(redditPosts, this.images);
            const response = {
                data: yield getBikeTagInformationFromRedditData(redditBikeTagData[0]),
                status: 1,
                success: true,
                source: AvailableApis[AvailableApis.reddit],
            };
            return response;
        }));
    });
}
