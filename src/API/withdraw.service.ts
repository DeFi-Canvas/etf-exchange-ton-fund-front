import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { WalletsApi } from './scheme/rest-genereted/api';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { Configuration } from './scheme/rest-genereted';
import { getRequestGenerated } from './request.utils';
import { withdrawResponseCodec } from './contracts/withdraw.contract';

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

const walletsApi = new WalletsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export interface WithdrawRestService {
    withdraw: (data: WithdrawArgs) => Stream<Either<string, WithdrawResponce>>;
}

export const newWithdrawRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): WithdrawRestService => {
        const { initDataRaw } = retrieveLaunchParams();

        return {
            withdraw: (data) =>
                getRequestGenerated(
                    walletsApi.withdrawPost(data, {
                        headers: { Authorization: `tma ${initDataRaw}` },
                    }),
                    withdrawResponseCodec
                )(),
            // withdraw: (data) =>
            //     fromPromise(
            //         axios.post(
            //             API.withdraw,
            //             {
            //                 ...data,
            //             },
            //             {
            //                 headers: {
            //                     Authorization: `tma ${initDataRaw}`,
            //                 },
            //             }
            //         )
            //     ),
        };
    }
);
