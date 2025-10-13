import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable } from '@injectable-ts/core';
import { BASE_API_CONFIG } from '@/API/API';
import { Error } from '@/store/errors/error-system';
import { BidaskApi } from '../scheme/rest-genereted';
import {
    DefaultBidaskAnswer,
    defaultResponceBidaskCodec,
    DepositBidaskPayload,
    WithdrawBidaskPayload,
} from './bidask.contract';
import {
    performGetRequest,
    authRequestOptions,
    payloadTransform,
} from '../request.utils';

const bidaskApi = new BidaskApi(BASE_API_CONFIG);

export interface BidaskRestService {
    deposit: (
        data: DepositBidaskPayload
    ) => Stream<Either<Error, DefaultBidaskAnswer>>;
    withdraw: (
        data: WithdrawBidaskPayload
    ) => Stream<Either<Error, DefaultBidaskAnswer>>;
}

export const newStormRestService = (): BidaskRestService => {
    return {
        deposit: (payload) =>
            performGetRequest(
                bidaskApi.apiBidaskLiquidityDepositPost(
                    { payload },
                    authRequestOptions()
                ),
                defaultResponceBidaskCodec,
                payloadTransform
            ),
        withdraw: (payload) =>
            performGetRequest(
                bidaskApi.apiBidaskLiquidityWithdrawPost(
                    { payload },
                    authRequestOptions()
                ),
                defaultResponceBidaskCodec,
                payloadTransform
            ),
    };
};

export const StormService = injectable('BIDASK_SERVICE', newStormRestService);
