import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequest } from './request.utils';
import {
    Asset,
    assetsIsValidData,
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
import { API, DOMAIN_API_URL } from './API';
import { flow } from 'fp-ts/lib/function';
import { fromPromise } from '@most/core';
import { WalletsApi } from '../API/shema/rest-genereted/api';
import { either } from 'fp-ts';

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<FundsData>>>;
    getWhaletFunds: () => Stream<Either<string, Array<FundsData>>>;
    getTransactions: () => Stream<Either<string, Array<Transactions>>>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const temp = new WalletsApi({ basePath: DOMAIN_API_URL });

export const newWaletRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            // getBalance: getRequest(API.getWalletInfo(telegram_id)),
            getBalance: () =>
                fromPromise(
                    temp
                        .walletBalanceGet(telegram_id ?? 0)
                        .then(({ data }) => either.of(data))
                ),
            getAssets: () =>
                fromPromise(
                    temp.walletBalanceGet(telegram_id ?? 0).then(({ data }) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        either.of(mapAssetsFromBalance(data))
                    )
                ),
            // getAssets: getRequest(
            //     API.getWalletInfo(telegram_id),
            //     mapAssetsFromBalance,
            //     flow(assetsIsValidData, mapAssetsFromBalanceValidation)
            // ),
            getFunds: getRequest(API.getFunds, mapFunds),
            getWhaletFunds: getRequest(
                API.getWhaletFunds(telegram_id),
                mapWhaletFunds,
                getWhaletFundsValidation
            ),
            getTransactions: getRequest(
                API.transactions(telegram_id),
                normolizeTransactionKey
            ),
        };
    }
);
