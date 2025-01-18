import { describe, expect, it } from 'vitest';
import { newNewUserStoreService } from '../user.store';
import { defaultScheduler, voidSink } from '@/utils/run-view-model.utils';
import * as E from 'fp-ts/Either';

describe('newNewUserStoreService', () => {
    it('should return empty user/assets obj with no init userData', () => {
        const srore = newNewUserStoreService(undefined);
        srore.effects.run(voidSink, defaultScheduler);

        expect(srore.value.user.get()).toStrictEqual({});
        expect(srore.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    it('should return not empty user/assets obj with init userData', () => {
        const intUser = {
            allowsWriteToPm: false,
            firstName: '',
            id: 123,
            isPremium: false,
            languageCode: '',
            lastName: '',
            username: '',
        };
        const srore = newNewUserStoreService(intUser);
        srore.effects.run(voidSink, defaultScheduler);

        expect(srore.value.user.get()).toStrictEqual(intUser);
        expect(srore.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    it('should update user', () => {
        const intUser = {
            allowsWriteToPm: false,
            firstName: '',
            id: 123,
            isPremium: false,
            languageCode: '',
            lastName: '',
            username: '',
        };
        const srore = newNewUserStoreService(undefined);
        srore.effects.run(voidSink, defaultScheduler);

        srore.value.setUser(intUser);

        expect(srore.value.user.get()).toStrictEqual(intUser);
        expect(srore.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    it('should update user', () => {
        const intUser = {
            allowsWriteToPm: false,
            firstName: '',
            id: 123,
            isPremium: false,
            languageCode: '',
            lastName: '',
            username: '',
        };
        const srore = newNewUserStoreService(undefined);
        srore.effects.run(voidSink, defaultScheduler);

        srore.value.setUser(intUser);

        expect(srore.value.user.get()).toStrictEqual(intUser);
        expect(srore.value.assets.get()).toStrictEqual(E.left('pending'));
    });

    it('should update assets', () => {
        const intUser = {
            allowsWriteToPm: false,
            firstName: '',
            id: 123,
            isPremium: false,
            languageCode: '',
            lastName: '',
            username: '',
        };
        const srore = newNewUserStoreService(undefined);
        srore.effects.run(voidSink, defaultScheduler);

        srore.value.setUser(intUser);
        srore.value.setAssets(E.right([]));

        expect(srore.value.user.get()).toStrictEqual(intUser);
        expect(srore.value.assets.get()).toStrictEqual(E.right([]));

        const mockAsset = {
            id: '123',
            logo: '123',
            name: '123',
            ticker: '123',
            coinAmount: 322,
            cost: 1,
        };

        srore.value.setAssets(
            E.right([mockAsset, { ...mockAsset, id: 'qwe-312' }])
        );

        expect(srore.value.assets.get()).toStrictEqual(
            E.right([mockAsset, { ...mockAsset, id: 'qwe-312' }])
        );
    });
});
