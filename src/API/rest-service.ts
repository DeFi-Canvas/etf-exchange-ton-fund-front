import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { chain, fromPromise } from '@most/core';
import axios from 'axios';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
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
    getWalletInfo: `${DOMAIN_API_URL}/walletbalance`,
    appopened: `${DOMAIN_API_URL}/appopened`,
    depositAsserts: `${DOMAIN_API_URL}/assets`,
    depositDetails: (id?: number) =>
        `${DOMAIN_API_URL}/deposit?telegram_id=${id}`,
};

interface WaletResponce {
    balance: number;
    price: number;
    totalamount: number;
    jettons: Array<JettonType>;
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
        const {
            lastName: last_name,
            firstName: firs_name,
            username,
            id: telegram_id,
        } = userStore.user.get();

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
            getWalletInfo: () =>
                pipe(
                    fromPromise(
                        axios
                            .post(`${API.appopened}`, {
                                telegram_id,
                                username,
                                firs_name,
                                last_name,
                            })
                            .then(({ data }) => data)
                    ),
                    chain(({ address }) => {
                        return fromPromise(
                            axios
                                .get(`${API.getWalletInfo}/${address}`)
                                .then(({ data }) => pipe(data, either.of))
                                .catch((error) => {
                                    return either.left(
                                        `Something goes wrong status = ${error.response.status}`
                                    );
                                })
                        );
                    })
                ),

            getAssets: () =>
                pipe(
                    fromPromise(
                        axios
                            .post(`${API.appopened}`, {
                                telegram_id,
                                username,
                                firs_name,
                                last_name,
                            })
                            .then(({ data }) => data)
                    ),
                    chain(({ address }) => {
                        return fromPromise(
                            axios
                                .get(`${API.getWalletInfo}/${address}`)
                                .then(({ data }) => {
                                    return pipe(data.jettons, either.of);
                                })
                                .catch((error) => {
                                    return either.left(
                                        `Something goes wrong status = ${error.response.status}`
                                    );
                                })
                        );
                    })
                ),
            getDepositAssets: () =>
                getRequest(API.depositAsserts, mapDepositAssets),
            getDepositDetails: () =>
                getRequest(API.depositDetails(telegram_id), mapDepositDetails),
            // MOCK
            getWithdrowAssets: () =>
                getRequest(API.depositAsserts, mapWithdrowAssets),
        };
    }
);
