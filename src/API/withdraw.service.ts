import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { API } from './API';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

interface WithdrawResponce {
    status: boolean;
    message: string;
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
        const { initDataRaw } = retrieveLaunchParams();

        return {
            withdraw: (data) =>
                fromPromise(
                    axios.post(API.withdraw, {
                        ...data,
                        telegram_id,
                        init_data: initDataRaw,
                    })
                ),
        };
    }
);
