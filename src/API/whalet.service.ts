import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStore, UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import {
    authRequestOptions,
    getRequestGenerated,
    handleGetRequest,
} from './request.utils';
import {
    mapAssetsFromBalance,
    mapFunds,
    mapWhaletFunds,
    WaletResponce,
} from '@/pages/whalet/wallet.model';
import { DOMAIN_API_URL } from './API';
import {
    StrategiesApi,
    WalletApi,
    WalletsApi,
} from './scheme/rest-genereted/api';

import {
    walletBalanceCodec,
    walletBalanceResponseCodec,
} from './contracts/walletBalance.contract';
import { Configuration } from './scheme/rest-genereted';
import { walletFundsCodec } from './contracts/walletFunds.contract';
import { allFundsCodec } from './contracts/funds.contract';
import { AssetBalance, AssetBalanceCodec } from '@/instance/asset/asset.model';
import { FundsData } from '@/instance/fund/fund.model';
import { Error } from '@/store/errors/error-system';
import { CacheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';
import * as t from 'io-ts';
export interface WaletRestService {
    getBalance: () => Stream<Either<Error, WaletResponce>>;
    getAssets: () => Stream<Either<Error, Array<AssetBalance>>>;
    getFunds: () => Stream<Either<Error, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<Error, Array<FundsData>>>;
}

const walletApi = new WalletApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

const walletsApi = new WalletsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

const strategiesApi = new StrategiesApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newWaletRestService = injectable(
    UserStore,
    CacheStore,
    (userStore, cacheStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getBalance: getRequestGenerated(
                walletsApi.walletBalanceGet(telegram_id ?? 0),
                walletBalanceCodec
            ),

            getAssets: () =>
                pipe(
                    handleGetRequest(
                        walletApi.apiWalletBalanceGet(authRequestOptions()),
                        walletBalanceResponseCodec,
                        mapAssetsFromBalance
                    )(),
                    waitWithCache(
                        cacheStore,
                        'WaletAssets',
                        t.array(AssetBalanceCodec)
                    )
                ),
            getFunds: getRequestGenerated(
                strategiesApi.strategiesGet(),
                allFundsCodec,
                // TODO fix it with real api data if it's used in the app, or remove it
                //@ts-ignore
                mapFunds
            ),
            getWhaletFunds: getRequestGenerated(
                walletsApi.walletStrategiesGet(telegram_id ?? 0),
                walletFundsCodec,
                // TODO fix it with real api data if it's used in the app, or remove it
                //@ts-ignore
                mapWhaletFunds
                // getWhaletFundsValidation
            ),
        };
    }
);
