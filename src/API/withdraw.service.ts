import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { fromPromise } from '@most/core';
import axios from 'axios';

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
    withdraw: `${DOMAIN_API_URL}/withdraw`,
};

interface WithdrawResponce {
    status: boolean; //true или false
    message: string; //пусто или текст сообщения об ошибке
    transaction: string;
}

interface WithdrawArgs {
    asset: string;
    amount: number;
    address: string;
    memo: string;
}

export interface WithdrawRestService {
    withdraw: (data: WithdrawArgs) => Stream<Either<string, WithdrawResponce>>;
}

export const newWithdrawRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WithdrawRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            withdraw: (data) =>
                fromPromise(axios.post(API.withdraw, { ...data, telegram_id })),
        };
    }
);
