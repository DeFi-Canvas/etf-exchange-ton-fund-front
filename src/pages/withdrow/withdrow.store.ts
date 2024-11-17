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
import { injectable } from '@injectable-ts/core';
import { newWithdrawRestService } from '@/API/withdraw.service';

export interface WithdrowService {
    currency: Property<string>;
    amount: Property<E.Either<'too small', number>>;
    isNextButtonAvailable: Property<boolean>;
    approximateCost: Property<string>;
    availableBalance: Property<number>;
    symbolLogo: Property<string>;
    isGoToCheckAvailable: Property<boolean>;
    balanceAfter: Property<number>;
    address: Property<E.Either<string, string>>;
    memo: Property<E.Either<string, string>>;
    setCurrency: (d: string) => void;
    setAmount: (d: number) => void;
    setAvailableBalance: (d: number) => void;
    setTickerPrice: (d: number) => void;
    setSymbolLogo: (d: string) => void;
    setAddress: (d: string) => void;
    setMemo: (d: string) => void;
    onWithdrow: () => void;
    clearData: () => void;
}

export type NewWithdrowService = ValueWithEffect<WithdrowService>;

export const newNewWithdrowService = injectable(
    newWithdrawRestService,
    (service): NewWithdrowService => {
        //#region init Property
        const currency = newLensedAtom<string>('');
        const amount = newLensedAtom<E.Either<'too small', number>>(E.right(0));
        const tickerPrice = newLensedAtom(0);
        const symbolLogo = newLensedAtom<string>('');
        const approximateCost = newLensedAtom('');
        const availableBalance = newLensedAtom(0);
        const balanceAfter = newLensedAtom(0);
        const address = newLensedAtom<E.Either<string, string>>(
            E.left('empty')
        );
        const memo = newLensedAtom<E.Either<string, string>>(E.left('empty'));

        const isGoToCheckAvailable = newLensedAtom(false);
        const isNextButtonAvailable = newLensedAtom(false);

        //#region seters Property
        const setAvailableBalance = availableBalance.set;
        const setSymbolLogo = symbolLogo.set;
        const setCurrency = currency.set;
        const setTickerPrice = tickerPrice.set;

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

        //TODO: скорее всего прийдется переделывать на адаптер
        const onWithdrow = () => {
            const currentAmount = (() => {
                const currentAmount = amount.get();
                return E.isRight(currentAmount) ? currentAmount.right : 0;
            })();

            const currentAddress = (() => {
                const currentAddress = address.get();
                return E.isRight(currentAddress) ? currentAddress.right : '';
            })();

            const currentMemo = (() => {
                const currentMemo = memo.get();
                return E.isRight(currentMemo) ? currentMemo.right : '';
            })();
            service.withdraw({
                asset: currency.get(),
                amount: currentAmount,
                address: currentAddress,
                memo: currentMemo,
            });
        };

        const clearData = () => {
            currency.set('');
            amount.set(E.right(0));
            isNextButtonAvailable.set(false);
            tickerPrice.set(0);
            symbolLogo.set('');
            approximateCost.set('');
            availableBalance.set(0);
            isGoToCheckAvailable.set(false);
            balanceAfter.set(0);
            address.set(E.left('empty'));
            memo.set(E.left('empty'));
        };

        //#region Effects
        const approximateCostInitEffect = pipe(
            currency,
            fromProperty,
            tap((currency) =>
                approximateCost.set(`1 ${currency} ≈ ${tickerPrice.get()} USD`)
            )
        );

        const addressFormValidationEffect = pipe(
            property.combine(address, memo, (address, memo) => ({
                address,
                memo,
            })),
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
                onWithdrow,
                clearData,
            },
            isNextButtonAvailableEffect,
            approximateCostInitEffect,
            addressFormValidationEffect,
            balanceAfterEffect
        );
    }
);
