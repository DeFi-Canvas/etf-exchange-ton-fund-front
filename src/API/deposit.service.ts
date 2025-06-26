import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DepositDetails } from '@/pages/deposit/pages/deposit-end-point/deposit-end-point.view-model';
import { getRequestGenerated } from './request.utils';
import { mapDepositDetails } from '@/pages/deposit/deposit.model';
import { DOMAIN_API_URL } from './API';
import { DepositApi } from './scheme/rest-genereted/api';
import { Configuration } from './scheme/rest-genereted';
import { depositResponseCodec } from './contracts/deposit.contract';
import { Error } from '@/store/errors/error-system';

const depositApi = new DepositApi(
    new Configuration({ basePath: DOMAIN_API_URL })
);

export interface DepositRestService {
    getDepositDetails: () => Stream<Either<Error, DepositDetails>>;
}

export const newDepositRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): DepositRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getDepositDetails: getRequestGenerated(
                depositApi.depositGet(telegram_id ?? 0),
                depositResponseCodec,
                mapDepositDetails
            ),
        };
    }
);
