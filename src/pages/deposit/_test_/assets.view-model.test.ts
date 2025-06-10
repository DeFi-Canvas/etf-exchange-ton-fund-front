import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { newNewUserStoreService } from '@/store/user.store';
import { voidSink, defaultScheduler } from '@/utils/run-view-model.utils';
import { describe, expect, it, vi } from 'vitest';
import { newAssetsViewModel } from '../assets/assets.view-model';
import { MOCK_NEW_DEPOSIT_SERVICE } from '@/API/mock/deposit.mock.service';
import { NEW_WALET_REST_SERVICE } from '@/API/mock/whalet.mock.service';
import * as E from 'fp-ts/Either';

vi.mock('@telegram-apps/sdk-react', async () => {
    return { retrieveLaunchParams: () => ({ initDataRaw: '' }) };
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('newAssetsViewModel', () => {
    const userStore = newNewUserStoreService({
        allowsWriteToPm: false,
        firstName: 'firstName',
        id: 1,
        isPremium: false,
        languageCode: 'languageCode',
        lastName: 'lastName',
        username: 'username',
    });
    userStore.effects.run(voidSink, defaultScheduler);

    const userStoreValues = userStore.value;
    const withdrowStore = newNewWithdrowStore({ userStore: userStoreValues });

    withdrowStore.effects.run(voidSink, defaultScheduler);

    it('should return assets pending deposit', () => {
        const vm = newAssetsViewModel({
            withdrowStore: withdrowStore.value,
            depositRestService: MOCK_NEW_DEPOSIT_SERVICE({
                userStore: userStoreValues,
            }),
            waletRestService: NEW_WALET_REST_SERVICE({
                userStore: userStoreValues,
            }),
        })('deposit');
        expect(vm.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    it('should return assets pending withdrow', () => {
        const vm = newAssetsViewModel({
            withdrowStore: withdrowStore.value,
            depositRestService: MOCK_NEW_DEPOSIT_SERVICE({
                userStore: userStoreValues,
            }),
            waletRestService: NEW_WALET_REST_SERVICE({
                userStore: userStoreValues,
            }),
        })('withdrow');
        expect(vm.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    describe('runned newAssetsViewModel deposit', () => {
        const vm = newAssetsViewModel({
            withdrowStore: withdrowStore.value,
            depositRestService: MOCK_NEW_DEPOSIT_SERVICE({
                userStore: userStoreValues,
            }),
            waletRestService: NEW_WALET_REST_SERVICE({
                userStore: userStoreValues,
            }),
        })('deposit');

        vm.effects.run(voidSink, defaultScheduler);
        it('should return assets pending', () => {
            expect(vm.value.assets.get()).toStrictEqual(
                E.right([
                    {
                        category: 'category',
                        description: 'description',
                        id: '1',
                        img: 'img',
                        name: 'name',
                        ticker: 'ticker',
                    },
                ])
            );
        });
    });
});
