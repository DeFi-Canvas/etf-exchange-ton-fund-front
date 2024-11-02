import { injectable } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as O from 'fp-ts/Option';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/rest-service';
import { newLensedAtom } from '@frp-ts/lens';

export interface WhatToBuyViewModel {
    balance: Property<O.Option<number>>;
}

export interface NewWhatToBuyViewModel {
    (): ValueWithEffect<WhatToBuyViewModel>;
}

export const newWhatToBuyViewModel = injectable(
    newWaletRestService,
    (waletRestService): NewWhatToBuyViewModel =>
        () => {
            const balance = newLensedAtom<O.Option<number>>(O.none);

            const getBalanceEffect = pipe(
                waletRestService.getWalletInfo(),
                tap(
                    flow(
                        either.map(({ balance }) => balance),
                        O.fromEither,
                        balance.set
                    )
                )
            );
            return valueWithEffect.new(
                {
                    balance,
                },
                getBalanceEffect
            );
        }
);
