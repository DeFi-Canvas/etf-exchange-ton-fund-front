import { formatNumberToUI } from '@/utils/number';
import { fromProperty } from '@/utils/property.utils';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { tap } from '@most/core';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';

export interface WithdrowService {
    currency: Property<string>;
    amount: Property<E.Either<'too small', number>>;
    setCurrency: (d: string) => void;
    setAmount: (d: number) => void;
    isNextButtonAvailable: Property<boolean>;
    approximateCost: Property<string>;
    availableBalance: Property<number>;
}

export type NewWithdrowService = ValueWithEffect<WithdrowService>;

export const newNewWithdrowService = (): NewWithdrowService => {
    const currency = newLensedAtom<string>('');
    const amount = newLensedAtom<E.Either<'too small', number>>(E.right(0));
    const isNextButtonAvailable = newLensedAtom(false);
    const tickerPrice = newLensedAtom(5.1);
    const setCurrency = currency.set;
    const approximateCost = newLensedAtom('');
    const availableBalance = newLensedAtom(0);

    const setAmount = (d: number) => {
        if (d > 0 && d < 1) {
            amount.set(E.left('too small'));
        } else {
            amount.set(E.of(d));
            approximateCost.set(
                `≈ ${formatNumberToUI(tickerPrice.get() * d)} USD`
            );
        }
        if (d === 0) {
            approximateCost.set(
                `1 ${currency.get()} ≈ ${tickerPrice.get()} USD`
            );
        }
    };

    const isNextButtonAvailableEffect = pipe(
        amount,
        fromProperty,
        tap(
            flow(
                E.map((d) => d >= 1),
                E.fold(
                    () => isNextButtonAvailable.set(false),
                    (d) => isNextButtonAvailable.set(d)
                )
            )
        )
    );

    const approximateCostInitEffect = pipe(
        currency,
        fromProperty,
        tap((currency) =>
            approximateCost.set(`1 ${currency} ≈ ${tickerPrice.get()} USD`)
        )
    );

    return valueWithEffect.new(
        {
            currency,
            amount,
            setCurrency,
            setAmount,
            isNextButtonAvailable,
            approximateCost,
            availableBalance,
        },
        isNextButtonAvailableEffect,
        approximateCostInitEffect
    );
};
