import { injectable, token } from '@injectable-ts/core';
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
    CacheStore,
    AssetsRestService,
    useValueWithEffect,
    SwapPage,
    (userStore, i18n, cacheStore, assetService, useValueWithEffect, SwapPage) =>
        memo(() => {
            const store = useValueWithEffect(
                () =>
                    newSwapStore({
                        userStore,
                        i18n,
                        cacheStore,
                        assetService,
                    })(),
                []
            );

            const [swapAssets] = useProperties(store.swapAssets);

            return React.createElement(SwapPage, {
                ...store,
                swapAssets,
            });
        })
);
