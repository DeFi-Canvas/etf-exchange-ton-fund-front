import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequestGenerated } from './request.utils';
import {
    Asset,
    FundsData,
    getWhaletFundsValidation,
    mapAssetsFromBalance,
    mapAssetsFromBalanceValidation,
    mapFunds,
    mapWhaletFunds,
    normolizeTransactionKey,
    Transactions,
    WaletResponce,
} from '@/pages/whalet/whalet.model';
import { DOMAIN_API_URL } from './API';
import { FundsApi, WalletsApi } from '../API/shema/rest-genereted/api';
import { walletBalanceCodec } from './contracts/walletBalance.contract';
import { Configuration } from './shema/rest-genereted';
import { walletFundsCodec } from './contracts/walletFunds.contract';
import { transactionListCodec } from './contracts/walletTransaction.contract';
import { allFundsCodec } from './contracts/funds.contract';

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<string, Array<FundsData>>>;
    getTransactions: () => Stream<Either<string, Array<Transactions>>>;
}

const walletsApi = new WalletsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

const fundsApi = new FundsApi({
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
                mapAssetsFromBalanceValidation
            ),
            getFunds: getRequestGenerated(
                fundsApi.fundsGet(),
                allFundsCodec,
                mapFunds
            ),
            getWhaletFunds: getRequestGenerated(
                walletsApi.walletFundsGet(telegram_id ?? 0),
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
