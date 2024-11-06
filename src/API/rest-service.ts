import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { chain, fromPromise } from '@most/core';
import axios from 'axios';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { JettonType } from '@/types';

const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

const API = {
    getWalletInfo: `${DOMAIN_API_URL}/walletbalance`,
    appopened: `${DOMAIN_API_URL}/appopened`,
    depositAsserts: `${DOMAIN_API_URL}/assets`,
};

export interface RestService {}

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

export interface WaletRestService {
    getWalletInfo: () => Stream<Either<string, WaletResponce>>;
    getAssets: () => Stream<Either<string, Array<JettonType>>>;
    getDepositAssets: () => Stream<Either<string, Array<DepositAsserts>>>;
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
                pipe(
                    fromPromise(
                        axios
                            .get(`${API.depositAsserts}`)
                            .then(({ data }) => either.of(data))
                            .catch((e) =>
                                either.left(
                                    `Something goes wrong status = ${e.response.status}`
                                )
                            )
                    )
                ),
        };
    }
);
