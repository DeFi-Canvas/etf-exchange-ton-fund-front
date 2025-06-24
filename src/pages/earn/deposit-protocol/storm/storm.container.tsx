import { injectable, token } from '@injectable-ts/core';
import { newStormStore } from './storm.store';
import { memo } from 'react';
import { Storm } from './storm.page';
import React from 'react';
import { useProperties, useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const StormContainer = injectable(newStormStore, (newStormStore) =>
    memo(() => {
        const store = useValueWithEffect(() => newStormStore(), []);
        const [asset, activeAction] = useProperties(
            store.asset,
            store.activeAction
        );

        return React.createElement(Storm, { ...store, asset, activeAction });
    })
);
