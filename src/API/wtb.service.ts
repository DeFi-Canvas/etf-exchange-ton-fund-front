import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequest } from './request.utils';
import { API } from './API';
import { FundsData, mapFunds } from '@/pages/what-to-buy/what-to-buy.model';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

interface BuyFundArgs {
    fundId: string;
    amount: number;
    assetId: string;
}

export interface WTBRestService {
    getFund: () => Stream<Either<string, FundsData>>;
    buyFund: (buyFundArgs: BuyFundArgs) => Stream<Either<string, void>>;
}

export const newWTBRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WTBRestService => {
        const { id: telegram_id } = userStore.user.get();
        const { initDataRaw } = retrieveLaunchParams();

        return {
            getFund: getRequest(
                API.getFund('cec02e9a-ab1b-4a6e-b0fd-e3b0a54842d0'),
                mapFunds
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
