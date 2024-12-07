import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellStore } from '../purchase/purchase.view-model';
import SellPage from './sell.page';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';

export const SellContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const { id } = useParams();
        const store = newPurchaseSellStore({ userStore });

        const vm = useValueWithEffect(() => store(id), []);
        const showBottomSheet = useProperty(vm.isShowBottomSheetFinishBoody);
        const isLoading = useProperty(vm.isLoading);
        const SellPageResolve = SellPage({ purchaseStore: vm });

        return React.createElement(SellPageResolve, {
            ...vm,
            showBottomSheet,
            isLoading,
        });
    }
);
