import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { NewSwapStore, newSwapStore, SwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';
import { AssetsRestService } from '@/API/assets/assets.service';
import { CacheStore } from '@/store/cache/cahe.store';

export const SwapPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    CacheStore,
    AssetsRestService,
    SwapPage,
    // newSwapStore,
    token('newSwapStore')<SwapStore>(),

    (userStore, i18n, cacheStore, assetService, SwapPage, newSwapStore) =>
        memo(() => {
            // const store = useValueWithEffect(() => newSwapStore(), []);

            const [swapAssets] = useProperties(newSwapStore.swapAssets);

            return React.createElement(SwapPage, {
                ...newSwapStore,
                swapAssets,
            });
        })
);
