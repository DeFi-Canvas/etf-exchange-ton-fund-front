import { injectable } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as O from 'fp-ts/Option';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';

export interface Balance {
    int: string;
    float: string;
}

export interface WhatToBuyViewModel {
    balance: Property<O.Option<Balance>>;
}

export interface NewWhatToBuyViewModel {
    (): ValueWithEffect<WhatToBuyViewModel>;
}

export const newWhatToBuyViewModel = injectable(
    newWaletRestService,
    (waletRestService): NewWhatToBuyViewModel =>
        () => {
            const balance = newLensedAtom<O.Option<Balance>>(O.none);

            const getBalanceEffect = pipe(
                waletRestService.getBalance(),
                tap(
                    flow(
                        either.map(({ total }) => total),
                        O.fromEither,
                        O.map((balance) => {
                            const [int, float] = balance.toFixed(2).split('.');
                            return {
                                int,
                                float: `.${float
                                    .split('')
                                    // TODO вынести precision  в глобал настройки
                                    .slice(0, 2)
                                    .join('')}`,
                            };
                        }),
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
