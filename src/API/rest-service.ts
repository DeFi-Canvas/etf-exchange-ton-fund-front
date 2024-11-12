import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { JettonType } from '@/types';
import {
    DepositAsserts as DepositAssetsReturnType,
    WithdrowAsserts as WithdrowAssertsReturnType,
} from '@/pages/deposit/assets-card/assets-card.component';
import { DepositDetails as DepositDetailsReturnType } from '@/pages/deposit-end-point/deposit-end-point.view-model';
import { getRequest } from './request.utils';

export const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

const API = {
    getWalletInfo: (id?: number) =>
        `${DOMAIN_API_URL}/wallet/balance?telegram_id=${id}`,
    appopened: `${DOMAIN_API_URL}/appopened`,
    depositAsserts: `${DOMAIN_API_URL}/assets`,
    depositDetails: (id?: number) =>
        `${DOMAIN_API_URL}/deposit?telegram_id=${id}`,
};

interface WaletResponce {
    total: number;
    assets: Array<JettonType>;
}

interface DepositAsserts {
    name: string;
    ticker: string;
    category: string;
    description: string;
    image_url: string;
}

interface DepositDetails {
    address: string;
    memo: string;
    qrimgsrc: string;
}

export interface WaletRestService {
    getWalletInfo: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<JettonType>>>;
    getDepositAssets: () => Stream<
        Either<string, Array<DepositAssetsReturnType>>
    >;
    getDepositDetails: () => Stream<Either<string, DepositDetailsReturnType>>;
    //MOKED
    getWithdrowAssets: () => Stream<
        Either<string, Array<WithdrowAssertsReturnType>>
    >;
}

export const newWaletRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WaletRestService => {
        const { id: telegram_id } = userStore.user.get();

        const mapDepositDetails = (data: DepositDetails) => ({
            ...data,
            qrCode: data.qrimgsrc,
        });
        const mapDepositAssets = (data: DepositAsserts) => ({
            ...data,
            img: data.image_url,
        });
        // MOCK
        const mapWithdrowAssets = (data: DepositAsserts) => ({
            ...data,
            img: data.image_url,
            amount: 123,
        });

        return {
            getWalletInfo: getRequest(API.getWalletInfo(186942268)),
            getAssets: getRequest(
                API.getWalletInfo(186942268),
                (x: WaletResponce) => x.assets
            ),
            getDepositAssets: getRequest(API.depositAsserts, mapDepositAssets),
            getDepositDetails: getRequest(
                API.depositDetails(telegram_id),
                mapDepositDetails
            ),
            // MOCK
            getWithdrowAssets: getRequest(
                API.depositAsserts,
                mapWithdrowAssets
            ),
        };
    }
);
