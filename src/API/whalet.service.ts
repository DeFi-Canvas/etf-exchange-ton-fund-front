import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequestGenerated } from './request.utils';
import {
    getWhaletFundsValidation,
    mapAssetsFromBalance,
    assetsFromBalanceValidation,
    mapFunds,
    mapWhaletFunds,
    normolizeTransactionKey,
    WalletTransactions,
    WaletResponce,
} from '@/pages/whalet/wallet.model';
import { DOMAIN_API_URL } from './API';
import { StrategiesApi, WalletsApi } from './scheme/rest-genereted/api';

import { walletBalanceCodec } from './contracts/walletBalance.contract';
import { Configuration } from './scheme/rest-genereted';
import { walletFundsCodec } from './contracts/walletFunds.contract';
import { transactionListCodec } from './contracts/walletTransaction.contract';
import { allFundsCodec } from './contracts/funds.contract';
import { Asset } from '@/instance/asset/asset.model';
import { FundsData } from '@/instance/fund/fund.model';

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<string, Array<FundsData>>>;
    getTransactions: () => Stream<Either<string, Array<WalletTransactions>>>;
}

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
            getAssets: getRequestGenerated(
                walletsApi.walletBalanceGet(telegram_id ?? 0),
                walletBalanceCodec,
                mapAssetsFromBalance,
                assetsFromBalanceValidation
            ),
            getFunds: getRequestGenerated(
                strategiesApi.strategiesGet(),
                allFundsCodec,
                mapFunds
            ),
            getWhaletFunds: getRequestGenerated(
                walletsApi.walletStrategiesGet(telegram_id ?? 0),
                walletFundsCodec,
                mapWhaletFunds,
                getWhaletFundsValidation
            ),
            getTransactions: getRequestGenerated(
                walletsApi.walletTransactionsGet(telegram_id ?? 0),
                transactionListCodec,
                normolizeTransactionKey
            ),
        };
    }
);
