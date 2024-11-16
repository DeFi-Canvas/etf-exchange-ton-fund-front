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
import { CoinCardTempProps } from '@/components/ui-kit/coin-card/coin-card.component';

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
interface FundsRespnce {
    id: string;
    name: string;
    description: string;
    management_fee: number;
    image_url: string;
    is_dao: false;
    risk_score: string;
    updated_event: string;
    is_avaiable: boolean;
}

export interface WaletRestService {
    getWalletInfo: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<JettonType>>>;
    getFunds: () => Stream<Either<string, Array<CoinCardTempProps>>>;
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

        const mapFunds = (data: FundsRespnce): CoinCardTempProps => ({
            logo: data.image_url,
            name: data.name,
            ticker: 'O.none',
            coinAmount: 228,
            cost: 0,
        });
        // MOCK
        const mapWithdrowAssets = (data: DepositAsserts) => ({
            ...data,
            img: data.image_url,
            amount: 123,
        });

        return {
            getWalletInfo: getRequest(API.getWalletInfo(telegram_id)),
            getAssets: getRequest(
                API.getWalletInfo(telegram_id),
                (x: WaletResponce) => x.assets
            ),
            getFunds: getRequest(API.getFunds, mapFunds),
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
