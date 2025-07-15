import { injectable } from '@injectable-ts/core';

import { constant, flow, pipe } from 'fp-ts/lib/function';
import { chain, map, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { WaletService } from '@/API/wallet/wallet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { TransactionsRestService } from '@/API/transactions/transactions.service';
import { SendTransactionRequest } from '@tonconnect/ui-react';
import { fromProperty } from '@/utils/property.utils';
import { beginCell } from '@ton/core';

export interface Balance {
    int: string;
    float: string;
}

export interface WhatToBuyViewModel {
    balance: Property<O.Option<Balance>>;
    isTransactionAvailible: Property<boolean>;
    isBottomSheetOpen: Property<boolean>;
    chainTransaction: Property<SendTransactionRequest>;
    setBottomSheetOpen: (isOpen: boolean) => void;
    setDepositAmount: (amount: number) => void;
}

export interface NewWhatToBuyViewModel {
    (): ValueWithEffect<WhatToBuyViewModel>;
}

const WAITING_TIME = 600;

export const newWhatToBuyViewModel = injectable(
    WaletService,
    TransactionsRestService,
    (waletRestService, transactionsRestService): NewWhatToBuyViewModel =>
        () => {
            const balance = newLensedAtom<O.Option<Balance>>(O.none);
            const isTransactionAvailible = newLensedAtom(true);
            const isBottomSheetOpen = newLensedAtom(false);
            const depositAmount = newLensedAtom(0);
            const chainTransaction = newLensedAtom<SendTransactionRequest>({
                validUntil: Math.floor(Date.now() / 1000) + WAITING_TIME,
                messages: [],
            });

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

            const isTransactionAvailibleEffect = pipe(
                transactionsRestService.getTransactions(),
                tap((x) => {
                    const transactions = pipe(
                        x,
                        either.getOrElseW(constant([] as const))
                    );
                    isTransactionAvailible.set(!!transactions.length);
                })
            );

            const depositAmmountEffect = pipe(
                depositAmount,
                fromProperty,
                chain(() => transactionsRestService.getDepositDetails()),
                map((details) =>
                    pipe(
                        details,
                        E.getOrElseW(constant({ address: '', memo: '' }))
                    )
                ),
                tap(({ address, memo }) => {
                    const payload = beginCell()
                        .storeUint(0, 32)
                        .storeStringTail(memo)
                        .endCell()
                        .toBoc()
                        .toString('base64');
                    const msg = {
                        address,
                        amount: depositAmount.get().toString(),
                        payload,
                    };
                    chainTransaction.modify((t) => ({ ...t, messages: [msg] }));
                })
            );
            return valueWithEffect.new(
                {
                    balance,
                    isTransactionAvailible,
                    isBottomSheetOpen,
                    chainTransaction,
                    setBottomSheetOpen: isBottomSheetOpen.set,
                    setDepositAmount: depositAmount.set,
                },
                getBalanceEffect,
                isTransactionAvailibleEffect,
                depositAmmountEffect
            );
        }
);
