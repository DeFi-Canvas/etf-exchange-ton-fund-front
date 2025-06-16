import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Transactions } from '@/API/transactions/transactions.responce.contract';
import { TransactionsRestService } from '@/API/transactions/transactions.service';
import { formatTransactions } from './transactions.model';
import { Errors, PENDING } from '@/store/errors/erorr-systrm';

export interface TransactionsViewModel {
    readonly transactions: Property<
        E.Either<Errors, Record<string, Transactions>>
    >;
}

export interface NewTransactionsViewModel {
    (): ValueWithEffect<TransactionsViewModel>;
}

export const newTransactionsViewModel = injectable(
    TransactionsRestService,
    (service): NewTransactionsViewModel =>
        () => {
            const transactions = newLensedAtom<
                E.Either<Errors, Record<string, Transactions>>
            >(E.left(PENDING));

            const getTransactionsEffect = pipe(
                service.getTransactions(),
                tap((x) => {
                    const newTransactions = pipe(x, E.map(formatTransactions));
                    transactions.set(newTransactions);
                })
            );

            return valueWithEffect.new(
                {
                    transactions,
                },
                getTransactionsEffect
            );
        }
);
