import { JettonType } from '@/types';
import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

const API = {
    getWalletInfo: `${DOMAIN_API_URL}/walletbalance/`,
};

export interface RestService {}

interface WaletResponce {
    balance: number;
    price: number;
    totalamount: number;
    jettons: Array<JettonType>;
}

export interface WaletRestService {
    getWalletInfo: (address: string) => Stream<Either<string, WaletResponce>>;
}

export const newWaletRestService = (): WaletRestService => ({
    getWalletInfo: () =>
        fromPromise(
            axios
                .get(`${API.getWalletInfo}`)
                .then(({ data }) => pipe(data.json(), either.of))
                .catch((error) => {
                    return either.left(
                        `Something goes wrong status = ${error.response.status}`
                    );
                })
        ),
});
