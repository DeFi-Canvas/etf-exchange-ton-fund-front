import { describe, expect, it } from 'vitest';
import { defaultScheduler, voidSink } from '@/utils/run-view-model.utils';
import * as E from 'fp-ts/Either';
import { newAssetsSingleViewModel } from '../assets-single.view-model';
import { NEW_ASETSS_REST_SERVICE } from '@/API/assets.mock.service';

describe('newNewUserStoreService', () => {
    it('should return empty asset', () => {
        const vm = newAssetsSingleViewModel({
            assetRestService: NEW_ASETSS_REST_SERVICE(),
        })('123');
        vm.effects.run(voidSink, defaultScheduler);
        expect(vm.value.asset.get()).toStrictEqual(E.left('pending'));
    });

    describe('should return not empty asset after some time', () => {
        const vm = newAssetsSingleViewModel({
            assetRestService: NEW_ASETSS_REST_SERVICE(),
        })('123');
        vm.effects.run(voidSink, defaultScheduler);

        it('should return empty asset', () => {
            expect(vm.value.asset.get()).toStrictEqual(
                E.right({
                    category: '',
                    description: '',
                    id: '123',
                    image_url: '',
                    name: '',
                    price: 1,
                    ticker: '',
                    withdrawal_fee: 1,
                })
            );
        });
    });
});
