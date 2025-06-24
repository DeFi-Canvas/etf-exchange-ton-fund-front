import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable, token } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { Configuration, StormApi } from '@/API/scheme/rest-genereted';
import { DOMAIN_API_URL } from '@/API/API';
import { Error } from '@/store/errors/error-system';
import { authRequestOptions, performGetRequest } from '@/API/request.utils';
import {
    StormAnswer,
    stormAnswerResponseCodec,
} from './storm.responce.contract';

const stormApi = new StormApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

interface RequestData {
    amount: number;
    ticker: string;
}

export interface StormRestService {
    deposit: (data: RequestData) => Stream<Either<Error, StormAnswer>>;
    withdrow: (data: RequestData) => Stream<Either<Error, StormAnswer>>;
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
                (x) => x.payload
            ),
        withdrow: (payload) =>
            performGetRequest(
                stormApi.apiStormLiquidityWithdrawPost(
                    { payload },
                    authRequestOptions()
                ),
                stormAnswerResponseCodec,
                (x) => x.payload
            ),
    };
};

export const StormRestService = injectable(
    'STORM_SERVICE',
    newStormRestService
);
