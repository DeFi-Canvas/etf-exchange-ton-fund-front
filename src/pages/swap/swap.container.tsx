import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffectT } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';
import { assetsRestService } from '@/API/assets/assets.service';
import { CacheStore } from '@/store/cache/cahe.store';

export const SwapPageContainer = injectable(
    useValueWithEffectT,
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    CacheStore,
    assetsRestService,
    provide(SwapPage)<'store'>(),
    (useValueWithEffect, userStore, i18n, cacheStore, assetService, SwapPage) =>
        memo(() => {
            console.log(123);

            const store = useValueWithEffect(
                () =>
                    newSwapStore({
                        userStore,
                        i18n,
                        cacheStore,
                        assetService,
                    })(),
                [userStore, i18n, cacheStore, assetService]
            );

            const [swapAssets] = useProperties(store.swapAssets);

            return React.createElement(
                SwapPage({
                    store,
                }),
                {
                    ...store,
                    swapAssets,
                }
            );
        })
);
