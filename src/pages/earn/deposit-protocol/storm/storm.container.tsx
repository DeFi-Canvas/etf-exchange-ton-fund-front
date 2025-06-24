import { injectable } from '@injectable-ts/core';
import { newStormStore } from './storm.store';
import { memo } from 'react';
import { Storm } from './storm.page';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const StormContainer = injectable(() =>
    memo(() => {
        const store = useValueWithEffect(() => newStormStore(), []);
        const t = useProperty(store.temp);
        console.log(t);

        return React.createElement(Storm);
    })
);
