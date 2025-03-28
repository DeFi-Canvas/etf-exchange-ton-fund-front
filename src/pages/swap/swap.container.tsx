import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';

export const SwapPageContainer = injectable(
    provide(SwapPage)<'store' | 'userStore'>(),
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    (SwapPage, userStore, i18n) =>
        memo(() => {
            const store = useValueWithEffect(
                () => newSwapStore({ userStore, i18n })(),
                []
            );

            const [swapAssets] = useProperties(store.swapAssets);

            return React.createElement(
                SwapPage({
                    store,
                    userStore,
                }),
                {
                    ...store,
                    swapAssets,
                }
            );
        })
);
