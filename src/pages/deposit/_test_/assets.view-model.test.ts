import { describe, it, expect, vi } from 'vitest';
import { newAssetsViewModel } from '../assets/assets.view-model';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { newNewUserStoreService } from '@/store/user.store';
import { voidSink, defaultScheduler } from '@/utils/run-view-model.utils';
import * as E from 'fp-ts/Either';
import { injectable, provide } from '@injectable-ts/core';
import { NEW_WALET_REST_SERVICE } from '@/API/mock/whalet.mock.service';

// vi.mock('@/API/withdraw.service', async () => {
//     const { NEW_WITHDROW_SERVICE } = await vi.importActual<
//         typeof import('@/API/mock/withdraw.mock.service')
//     >('@/API/mock/withdraw.mock.service');
//     return { newWithdrawRestService: NEW_WITHDROW_SERVICE };
// });

// vi.mock('@/API/deposit.service', async () => {
//     const { MOCK_NEW_DEPOSIT_SERVICE } = await vi.importActual<
//         typeof import('@/API/mock/deposit.mock.service')
//     >('@/API/mock/withdraw.mock.service');
//     return { newDepositRestService: MOCK_NEW_DEPOSIT_SERVICE };
// });

// vi.mock('@/API/whalet.service', async () => {
//     const { NEW_WALET_REST_SERVICE } = await vi.importActual<
//         typeof import('@/API/mock/whalet.mock.service')
//     >('@/API/mock/withdraw.mock.service');
//     return { newWaletRestService: NEW_WALET_REST_SERVICE };
// });

vi.mock('@/API/withdraw.service', async () => {
    const newWithdrawRestService = await vi.importActual<
        typeof import('@/API/mock/withdraw.mock.service')
    >('@/API/mock/withdraw.mock.service');
    return newWithdrawRestService;
});

vi.mock('@/API/deposit.service', async () => {
    const newDepositRestService = await vi.importActual<
        typeof import('@/API/mock/deposit.mock.service')
    >('@/API/mock/withdraw.mock.service');
    return newDepositRestService;
});

vi.mock('@/API/whalet.service', async () => {
    const newWaletRestService = await vi.importActual<
        typeof import('@/API/mock/whalet.mock.service')
    >('@/API/mock/withdraw.mock.service');
    return newWaletRestService;
});

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

    it('should return assets pending', () => {
        // const vm = newAssetsViewModel({});
        const vm = newAssetsViewModel({
            withdrowStore: withdrowStore.value,
            userStore: userStoreValues,
        })('deposit');
        // vm.effects.run(voidSink, defaultScheduler);
        // expect(vm.value.assets.get()).toStrictEqual(E.left('pending'));
    });
});
