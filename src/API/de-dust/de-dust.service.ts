import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { Error } from '@/store/errors/error-system';
import {
    DeDustSwapResult,
    swapInitiateCodecResponseCodec,
} from './de-dust.contract';
import { DeDustApi } from '../scheme/rest-genereted';
import { BASE_API_CONFIG } from '../API';
import { authRequestOptions, performGetRequest } from '../request.utils';
import { token } from '@injectable-ts/core';

const deDustApi = new DeDustApi(BASE_API_CONFIG);

export interface DeDustRestService {
    swapInitiate: (args: {
        amount: number;
        tokens: Array<string>;
    }) => Stream<Either<Error, DeDustSwapResult>>;
}

export const newDeDustRestService = (): DeDustRestService => ({
    swapInitiate: ({ amount, tokens }) =>
        performGetRequest(
            deDustApi.apiDedustSwapPost(
                {
                    payload: {
                        amount,
                        tickerFrom: tokens[0],
                        tickerTo: tokens[1],
                    },
                },
                authRequestOptions()
            ),
            swapInitiateCodecResponseCodec,
            (x) => x.payload
        ),
});
export const DeDustRestService =
    token('deDustRestService')<DeDustRestService>();
