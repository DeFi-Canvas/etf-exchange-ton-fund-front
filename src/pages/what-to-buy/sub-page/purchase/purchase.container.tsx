import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseSellStore } from './purchase.store';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const PurchaseContainer = injectable(
    useValueWithEffect,
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    CacheStore,
    provide(PurchasePage)<'purchaseStore' | 'i18n'>(),
    (useValueWithEffect, userStore, i18n, cacheStore, PurchasePage) =>
        memo(() => {
            const { id } = useParams();

            const purchaseStore = useValueWithEffect(
                () =>
                    newPurchaseSellStore({
                        userStore,
                        cacheStore,
                    })(id),
                []
            );

            const showBottomSheet = useProperty(purchaseStore.isBottomPanel);
            const isShowBottomSheetFinishBoody = useProperty(
                purchaseStore.isShowBottomSheetFinishBoody
            );
            const isLoading = useProperty(purchaseStore.isLoading);

            const PurchasePageResolve = PurchasePage({
                purchaseStore,
                i18n,
            });

            return React.createElement(PurchasePageResolve, {
                ...purchaseStore,
                showBottomSheet,
                setShowBottomSheet: purchaseStore.setIsBottomPanel,
                isShowBottomSheetFinishBoody,
                isLoading,
            });
        })
);
