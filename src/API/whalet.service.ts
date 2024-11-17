import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequest } from './request.utils';
import { CoinCardTempProps } from '@/components/ui-kit/coin-card/coin-card.component';
import {
    Asset,
    mapAssetsFromBalance,
    mapFunds,
    WaletResponce,
} from '@/pages/whalet/whalet.model';

export const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

const API = {
    getWalletInfo: (id?: number) =>
        `${DOMAIN_API_URL}/wallet/balance?telegram_id=${id}`,
    appopened: `${DOMAIN_API_URL}/appopened`,
    getFunds: `${DOMAIN_API_URL}/funds`,
    depositAsserts: `${DOMAIN_API_URL}/assets`,
    depositDetails: (id?: number) =>
        `${DOMAIN_API_URL}/deposit?telegram_id=${id}`,
};

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<CoinCardTempProps>>>;
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
        };
    }
);
