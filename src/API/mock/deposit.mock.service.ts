import { UserStoreService } from '@/store/user.store';
import { DepositRestService } from '../deposit.service';
import { now } from '@most/core';
import * as E from 'fp-ts/lib/Either';

interface MockDepositArgs {
    userStore: UserStoreService;
}
export const MOCK_NEW_DEPOSIT_SERVICE =
    ({}: MockDepositArgs): DepositRestService => {
        return {
            getDepositDetails: () =>
                now(
                    E.right({
                        address: 'address',
                        memo: 'memo',
                        qrCode: 'qrCode',
                    })
                ),
        };
    };
