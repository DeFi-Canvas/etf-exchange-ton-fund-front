import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.store';
import { pipe } from 'fp-ts/lib/function';
import WhatInside from './what-inside.component';
import { I18NService } from '@/store/i18n/i18.store';

export const WhatInsideContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),
    (store, i18n) => () => {
        const assets = pipe(
            useProperty(store.fundData),
            E.map(({ assets }) => assets)
        );
        const { Fund: texts } = useProperty(i18n.WhatToBuy);

        return React.createElement(WhatInside, {
            assets,
            texts,
        });
    }
);
