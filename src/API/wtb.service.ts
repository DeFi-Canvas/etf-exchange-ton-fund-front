import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
// import { getRequest } from './request.utils';
import { API } from './API';
import { FundsData, mapFunds } from '@/pages/what-to-buy/what-to-buy.model';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { either } from 'fp-ts';

interface BuyFundArgs {
    fundId: string;
    amount: number;
    assetId: string;
}

export interface WTBRestService {
    getFund: (id: string) => Stream<Either<string, FundsData>>;
    buyFund: (buyFundArgs: BuyFundArgs) => Stream<Either<string, void>>;
}

export const newWTBRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WTBRestService => {
        const { id: telegram_id } = userStore.user.get();
        const { initDataRaw } = retrieveLaunchParams();

        return {
            // getFund: (id) => getRequest(API.getFund(id), mapFunds)(),
            getFund: (id) =>
                fromPromise(
                    axios
                        .get(API.getFund(id))
                        .then(({ data }) => either.of(mapFunds(data)))
                ),
            buyFund: (args) =>
                fromPromise(
                    axios.post(API.buyFund, {
                        telegram_id,
                        fund_id: args.fundId,
                        amount: args.amount,
                        asset_id: args.assetId,
                        init_data: initDataRaw,
                    })
                ),
        };
    }
);
