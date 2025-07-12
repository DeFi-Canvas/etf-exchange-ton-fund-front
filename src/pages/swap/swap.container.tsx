import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { I18NService } from '@/store/i18n/i18.store';
import { assetsRestService } from '@/API/assets/assets.service';
import { CacheStore } from '@/store/cache/cahe.store';

export const SwapPageContainer = injectable(
    useValueWithEffect,
    token('i18n')<I18NService>(),
    CacheStore,
    assetsRestService,
    provide(SwapPage)<'store'>(),
    (useValueWithEffect, i18n, cacheStore, assetService, SwapPage) =>
        memo(() => {
            const store = useValueWithEffect(
                () =>
                    newSwapStore({
                        i18n,
                        cacheStore,
                        assetService,
                    })(),
                [i18n, cacheStore, assetService]
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
