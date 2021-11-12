import { SanityClient } from '@sanity/client';
import { BikeTagApiResponse, GameData } from '../common/types';
import { getGameDataPayload } from '../common/payloads';
export declare function getGameData(client: SanityClient, options: getGameDataPayload): Promise<BikeTagApiResponse<GameData | GameData[]>>;
