import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable } from '@injectable-ts/core';

import { StormApi } from '@/API/scheme/rest-genereted';
import { BASE_API_CONFIG } from '@/API/API';
import { Error } from '@/store/errors/error-system';
import {
    authRequestOptions,
    payloadTransform,
    performGetRequest,
} from '@/API/request.utils';
import {
    StormAnswer,
    stormAnswerResponseCodec,
} from './storm.responce.contract';

const stormApi = new StormApi(BASE_API_CONFIG);

interface RequestData {
    amount: number;
    ticker: string;
}

export interface StormRestService {
    deposit: (data: RequestData) => Stream<Either<Error, StormAnswer>>;
    withdraw: (data: RequestData) => Stream<Either<Error, StormAnswer>>;
}

export const newStormRestService = (): StormRestService => {
    return {
        deposit: (payload) =>
            performGetRequest(
                stormApi.apiStormLiquidityDepositPost(
                    { payload },
                    authRequestOptions()
                ),
                stormAnswerResponseCodec,
                payloadTransform
            ),
        withdraw: (payload) =>
            performGetRequest(
                stormApi.apiStormLiquidityWithdrawPost(
                    { payload },
                    authRequestOptions()
                ),
                stormAnswerResponseCodec,
                payloadTransform
            ),
    };
};

export const StormRestService = injectable(
    'STORM_SERVICE',
    newStormRestService
);
