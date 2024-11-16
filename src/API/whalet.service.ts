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
import { WithdrowAssets } from '@/pages/deposit/deposit.model';

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

interface DepositAsserts {
    name: string;
    ticker: string;
    category: string;
    description: string;
    image_url: string;
}

export interface WaletRestService {
    getBalance: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
    getFunds: () => Stream<Either<string, Array<CoinCardTempProps>>>;
    //MOKED
    getWithdrowAssets: () => Stream<Either<string, Array<WithdrowAssets>>>;
}

export const newWaletRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        // MOCK
        const mapWithdrowAssets = (data: DepositAsserts) => ({
            ...data,
            img: data.image_url,
            amount: 123,
        });

        return {
            getBalance: getRequest(API.getWalletInfo(telegram_id)),
            getAssets: getRequest(
                API.getWalletInfo(telegram_id),
                mapAssetsFromBalance
            ),
            getFunds: getRequest(API.getFunds, mapFunds),
            // MOCK
            getWithdrowAssets: getRequest(
                API.depositAsserts,
                mapWithdrowAssets
            ),
        };
    }
);
