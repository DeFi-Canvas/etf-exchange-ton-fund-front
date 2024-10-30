import {
    injectable,
    //  token
} from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
// import { createAdapter } from '@most/adapter';
// import { Option } from 'fp-ts/lib/Option';
// import { newLensedAtom } from '@frp-ts/lens';
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
                // tap(balance.set)
                // tap((x) => console.log(x, 'testEffect'))
            );
            return valueWithEffect.new(
                {
                    balance,
                },
                getBalanceEffect
            );
        }
);
