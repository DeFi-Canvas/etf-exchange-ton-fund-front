import { UserStoreService } from '@/store/user.store';
import { DepositRestService } from '../deposit.service';
import { now } from '@most/core';
import * as E from 'fp-ts/lib/Either';

interface MockDepositArgs {
    userStore: UserStoreService;
}
export const MOCK_NEW_DEPOSIT_SERVICE = ({
    userStore,
}: MockDepositArgs): DepositRestService => {
    const { id: telegram_id } = userStore.user.get();

    return {
        getDepositAssets: () =>
            now(
                E.right([
                    {
                        id: `${telegram_id ?? 0}`,
                        name: 'name',
                        ticker: 'ticker',
                        description: 'description',
                        category: 'category',
                        img: 'img',
                    },
                ])
            ),
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
