import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import SellPage from './sell.page';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';
import { I18NService } from '@/store/i18n/i18.store';

export const SellContainer = injectable(
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    (userStore, i18n) =>
        memo(() => {
            const { id } = useParams();
            const store = newPurchaseSellStore({ userStore });

            const purchaseStore = useValueWithEffect(() => store(id), []);
            const showBottomSheet = useProperty(
                purchaseStore.isShowBottomSheetFinishBoody
            );
            const isLoading = useProperty(purchaseStore.isLoading);
            const SellPageResolve = SellPage({ purchaseStore, i18n });

            return React.createElement(SellPageResolve, {
                ...purchaseStore,
                showBottomSheet,
                isLoading,
            });
        })
);
