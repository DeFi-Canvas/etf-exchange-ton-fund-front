import { UserStoreService } from '@/store/user.store';
import { now } from '@most/core';
import * as E from 'fp-ts/lib/Either';
import { WithdrawRestService } from '../withdraw.service';

interface MocWithdrowArgs {
    userStore: UserStoreService;
}

export const NEW_WITHDROW_SERVICE = ({
    userStore,
}: MocWithdrowArgs): WithdrawRestService => {
    const { id: telegram_id } = userStore.user.get();

    return {
        withdraw: (data) =>
            now(
                E.right({
                    status: true,
                    message: `${telegram_id} : ${data.asset} ${data.address}`,
                    transaction: 'transaction',
                })
            ),
    };
};
