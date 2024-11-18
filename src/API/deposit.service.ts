import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DepositDetails as DepositDetailsReturnType } from '@/pages/deposit-end-point/deposit-end-point.view-model';
import { getRequest } from './request.utils';
import {
    DepositAssets,
    mapDepositAssets,
    mapDepositDetails,
} from '@/pages/deposit/deposit.model';
import { API } from './API';

export interface DepositRestService {
    getDepositAssets: () => Stream<Either<string, Array<DepositAssets>>>;
    getDepositDetails: () => Stream<Either<string, DepositDetailsReturnType>>;
}

export const newDepositRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): DepositRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getDepositAssets: getRequest(API.depositAsserts, mapDepositAssets),
            getDepositDetails: getRequest(
                API.depositDetails(telegram_id),
                mapDepositDetails
            ),
        };
    }
);
