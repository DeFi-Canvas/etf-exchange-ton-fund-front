import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable } from '@injectable-ts/core';
import {
    authRequestOptions,
    getRequestGenerated,
    handleGetRequest,
} from './request.utils';
import {
    mapAssetsFromBalance,
    WaletResponce,
} from '@/pages/whalet/wallet.model';
import { BASE_API_CONFIG } from './API';
import { WalletApi } from './scheme/rest-genereted/api';
import * as E from 'fp-ts/Either';

import { walletBalanceResponseCodec } from './contracts/walletBalance.contract';
import { AssetBalance, AssetBalanceCodec } from '@/instance/asset/asset.model';
import { FundsData } from '@/instance/fund/fund.model';
import { Error, ERROR } from '@/store/errors/error-system';
import { CacheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';
import * as t from 'io-ts';
import { now } from '@most/core';

export interface WaletRestService {
    getBalance: () => Stream<Either<Error, WaletResponce>>;
    getAssets: () => Stream<Either<Error, Array<AssetBalance>>>;
    getFunds: () => Stream<Either<Error, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<Error, Array<FundsData>>>;
}

const walletApi = new WalletApi(BASE_API_CONFIG);

export const newWalletRestService = injectable(
    CacheStore,
    (cacheStore): WaletRestService => {
        return {
            getBalance: getRequestGenerated(
                walletApi.apiWalletBalanceGet(authRequestOptions()),
                walletBalanceResponseCodec,
                (x) => x.payload
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
            getFunds: () => now(E.left(ERROR)),
            getWhaletFunds: () => now(E.left(ERROR)),
        };
    }
);
