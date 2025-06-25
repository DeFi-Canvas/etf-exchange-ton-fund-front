import { injectable } from '@injectable-ts/core';
import { newStormStore } from './storm.store';
import { memo } from 'react';
import { Storm } from './storm.page';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const StormContainer = injectable(newStormStore, (newStormStore) =>
    memo(() => {
        const store = useValueWithEffect(() => newStormStore(), []);
        const [
            asset,
            activeAction,
            amount,
            requestFinish,
            isBottomSheetOpen,
            maxAvailable,
        ] = useProperties(
            store.asset,
            store.activeAction,
            store.amount,
            store.requestFinish,
            store.isBottomSheetOpen,
            store.maxAvailable
        );
        const action =
            activeAction === 'DEPOSIT' ? store.deposit : store.withdraw;

        return React.createElement(Storm, {
            ...store,
            asset,
            activeAction,
            action,
            requestFinish,
            isBottomSheetOpen,
            amount,
            maxAvailable,
        });
    })
);
