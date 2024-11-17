import { formatNumberToUI } from '@/utils/number';
import { fromProperty } from '@/utils/property.utils';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { property, Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { tap } from '@most/core';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/lib/Apply';
import * as S from 'fp-ts/string';

export interface WithdrowService {
    currency: Property<string>;
    amount: Property<E.Either<'too small', number>>;
    setCurrency: (d: string) => void;
    setAmount: (d: number) => void;
    isNextButtonAvailable: Property<boolean>;
    approximateCost: Property<string>;
    availableBalance: Property<number>;
    setAvailableBalance: (d: number) => void;
    setTickerPrice: (d: number) => void;
    symbolLogo: Property<string>;
    setSymbolLogo: (d: string) => void;

    isGoToCheckAvailable: Property<boolean>;
    balanceAfter: Property<number>;
    address: Property<E.Either<string, string>>;
    memo: Property<E.Either<string, string>>;
    setAddress: (d: string) => void;
    setMemo: (d: string) => void;
}

export type NewWithdrowService = ValueWithEffect<WithdrowService>;

export const newNewWithdrowService = (): NewWithdrowService => {
    const currency = newLensedAtom<string>('');
    const amount = newLensedAtom<E.Either<'too small', number>>(E.right(0));
    const isNextButtonAvailable = newLensedAtom(false);
    const tickerPrice = newLensedAtom(0);
    const setTickerPrice = tickerPrice.set;

    const symbolLogo = newLensedAtom<string>('');
    const setSymbolLogo = symbolLogo.set;

    const setCurrency = currency.set;
    const approximateCost = newLensedAtom('');
    const availableBalance = newLensedAtom(0);
    const setAvailableBalance = availableBalance.set;
    const isGoToCheckAvailable = newLensedAtom(false);
    const balanceAfter = newLensedAtom(0);
    const address = newLensedAtom<E.Either<string, string>>(E.left('empty'));
    const memo = newLensedAtom<E.Either<string, string>>(E.left('empty'));

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

    const setAddress = (d: string) => {
        address.set(E.of(d));
        if (S.isEmpty(d)) {
            address.set(E.left('empty'));
        }
    };
    const setMemo = (d: string) => {
        memo.set(E.of(d));
        if (S.isEmpty(d)) {
            memo.set(E.left('empty'));
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

    const addressFormValidationEffect = pipe(
        property.combine(address, memo, (address, memo) => ({ address, memo })),
        fromProperty,
        tap(
            flow(
                A.sequenceS(E.Applicative),
                E.isRight,
                isGoToCheckAvailable.set
            )
        )
    );

    const balanceAfterEffect = pipe(
        amount,
        fromProperty,
        tap((x) => {
            if (E.isRight(x)) {
                balanceAfter.set(
                    Number((availableBalance.get() - x.right).toFixed(2))
                );
            }
        })
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
            setAvailableBalance,
            isGoToCheckAvailable,
            balanceAfter,
            address,
            memo,
            setAddress,
            setMemo,
            setTickerPrice,
            symbolLogo,
            setSymbolLogo,
        },
        isNextButtonAvailableEffect,
        approximateCostInitEffect,
        addressFormValidationEffect,
        balanceAfterEffect
    );
};
