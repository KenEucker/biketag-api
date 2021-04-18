import { BikeTagClient } from '../client';
import { BikeTagApiResponse } from '../common/types';
export declare function favoriteImage(client: BikeTagClient, imageHash: string): Promise<BikeTagApiResponse<'favorited'>>;
