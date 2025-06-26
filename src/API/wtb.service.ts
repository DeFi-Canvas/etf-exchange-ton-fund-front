import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { mapFunds } from '@/pages/what-to-buy/what-to-buy.model';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { getRequestGenerated } from './request.utils';
import { StrategiesApi, WalletsApi } from './scheme/rest-genereted/api';
import { Configuration } from './scheme/rest-genereted';
import { fundByIdResponseCodec } from './contracts/fundById.contract';
import { buyIndexResponseCodec } from './contracts/buyIndex.contract';
import { FundsData } from '@/instance/fund/fund.model';

interface BuyFundArgs {
    fundId: string;
    amount: number;
    assetId: string;
}

export interface WTBRestService {
    getFund: (id: string) => Stream<Either<string, FundsData>>;
    buyFund: (buyFundArgs: BuyFundArgs) => Stream<Either<string, unknown>>;
    sellFund: (
        buyFundArgs: Omit<BuyFundArgs, 'assetId'>
    ) => Stream<Either<string, unknown>>;
}

const strategiesApi = new StrategiesApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

const walletsApi = new WalletsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newWTBRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WTBRestService => {
        const { id: telegram_id } = userStore.user.get();
        const { initDataRaw } = retrieveLaunchParams();

        return {
            getFund: (id) =>
                getRequestGenerated(
                    strategiesApi.strategyStrategyIdGet(id),
                    fundByIdResponseCodec,
                    // TODO fix it with real api data if it's used in the app, or remove it
                    //@ts-ignore
                    mapFunds
                )(),
            buyFund: (args) =>
                getRequestGenerated(
                    walletsApi.walletBuyindexPost({
                        telegram_id,
                        strategy_id: args.fundId,
                        amount: args.amount,
                        asset_id: args.assetId,
                        init_data: initDataRaw,
                    }),
                    buyIndexResponseCodec
                )(),

            sellFund: (args) =>
                getRequestGenerated(
                    walletsApi.walletSellindexPost({
                        telegram_id,
                        fund_id: args.fundId,
                        amount: args.amount,
                        init_data: initDataRaw,
                    }),
                    buyIndexResponseCodec
                )(),
        };
    }
);
