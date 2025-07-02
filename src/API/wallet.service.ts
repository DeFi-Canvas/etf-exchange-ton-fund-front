import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStore } from '@/store/user.store';
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
import { DOMAIN_API_URL } from './API';
import { WalletApi, WalletsApi } from './scheme/rest-genereted/api';
import * as E from 'fp-ts/Either';

import {
    walletBalanceCodec,
    walletBalanceResponseCodec,
} from './contracts/walletBalance.contract';
import { Configuration } from './scheme/rest-genereted';
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

const walletApi = new WalletApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

const walletsApi = new WalletsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newWalletRestService = injectable(
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
            getFunds: () => now(E.left(ERROR)),
            getWhaletFunds: () => now(E.left(ERROR)),
        };
    }
);
