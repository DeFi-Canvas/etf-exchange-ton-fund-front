import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequest } from './request.utils';
import {
    Asset,
    mapAssetsFromBalance,
    mapFunds,
    normolizeTransactionKey,
    Transactions,
    WaletResponce,
} from '@/pages/whalet/whalet.model';
import { API } from './API';
import { CoinCardData } from '@/components/assets-card/assets-card.model';

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<CoinCardData>>>;
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
            getTransactions: getRequest(
                API.transactions(telegram_id),
                normolizeTransactionKey
            ),
        };
    }
);
