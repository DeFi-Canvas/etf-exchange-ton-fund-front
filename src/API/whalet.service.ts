import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
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
    normolizeTransactionKey,
    WalletTransactions,
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
import { transactionListCodec } from './contracts/walletTransaction.contract';
import { allFundsCodec } from './contracts/funds.contract';
import { AssetBalance } from '@/instance/asset/asset.model';
import { FundsData } from '@/instance/fund/fund.model';
import { AxiosResponse } from 'axios';
import { Errors } from '@/store/errors/erorr-systrm';

export interface WaletRestService {
    getBalance: () => Stream<Either<Errors, WaletResponce>>;
    getAssets: () => Stream<Either<Errors, Array<AssetBalance>>>;
    getFunds: () => Stream<Either<Errors, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<Errors, Array<FundsData>>>;
    getTransactions: () => Stream<Either<Errors, Array<WalletTransactions>>>;
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
    token('userStore')<UserStoreService>(),
    (userStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getBalance: getRequestGenerated(
                walletsApi.walletBalanceGet(telegram_id ?? 0),
                walletBalanceCodec
            ),
            getAssets: handleGetRequest(
                walletApi.apiWalletBalanceGet(authRequestOptions()),
                walletBalanceResponseCodec,
                mapAssetsFromBalance
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
            getTransactions: getRequestGenerated(
                walletsApi.walletTransactionsGet(telegram_id ?? 0),
                transactionListCodec,
                // TODO fix it with real api data if it's used in the app, or remove it
                // TODO this endpoint returns data from the old transactions structure
                //  we should replace it with the new structure where every transaction groups entries
                //@ts-ignore
                (transactions) => transactions.map(normolizeTransactionKey)
            ),
        };
    }
);
