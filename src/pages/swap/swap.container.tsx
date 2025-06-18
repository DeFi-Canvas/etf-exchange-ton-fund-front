import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';
import { AssetsRestService } from '@/API/assets/assets.service';
import { CacheStore } from '@/store/cache/cahe.store';

export const SwapPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    AssetsRestService,
    CacheStore,
    (userStore, i18n, assetsRestService, cacheStore) =>
        memo(() => {
            const store = useValueWithEffect(
                () =>
                    newSwapStore({
                        userStore,
                        i18n,
                        assetsRestService,
                        cacheStore,
                    })(),
                []
            );

            const [swapAssets] = useProperties(store.swapAssets);

            return React.createElement(
                SwapPage({
                    store,
                    userStore,
                    i18n,
                    assetsRestService,
                    cacheStore,
                }),
                {
                    ...store,
                    swapAssets,
                }
            );
        })
);
