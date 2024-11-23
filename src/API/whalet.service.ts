import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequest } from './request.utils';
import {
    Asset,
    FundsData,
    mapAssetsFromBalance,
    mapFunds,
    mapWhaletFunds,
    normolizeTransactionKey,
    Transactions,
    WaletResponce,
} from '@/pages/whalet/whalet.model';
import { API } from './API';

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<string, Array<FundsData>>>;
    getTransactions: () => Stream<Either<string, Array<Transactions>>>;
}

export const newWaletRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getBalance: getRequest(API.getWalletInfo(telegram_id)),
            getAssets: getRequest(
                API.getWalletInfo(telegram_id),
                mapAssetsFromBalance
            ),
            getFunds: getRequest(API.getFunds, mapFunds),
            getWhaletFunds: getRequest(
                API.getWhaletFunds(telegram_id),
                mapWhaletFunds
            ),
            getTransactions: getRequest(
                API.transactions(telegram_id),
                normolizeTransactionKey
            ),
        };
    }
);
