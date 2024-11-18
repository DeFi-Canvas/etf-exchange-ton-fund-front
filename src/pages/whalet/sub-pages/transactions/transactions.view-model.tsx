import { injectable, token } from '@injectable-ts/core';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { UserStoreService } from '@/store/user.store';
import { Transactions } from '../../whalet.model';

export interface TransactionsViewModel {
    transactions: Property<E.Either<string, Array<Transactions>>>;
}

export interface NewTransactionsViewModel {
    (): ValueWithEffect<TransactionsViewModel>;
}

export const newTransactionsViewModel = injectable(
    token('userStore')<UserStoreService>(),
    newWaletRestService,
    (userStore, waletRestService): NewTransactionsViewModel =>
        () => {
            const transactions = newLensedAtom<
                E.Either<string, Array<Transactions>>
            >(E.left('pending'));

            const getTransactionsEffect = pipe(
                waletRestService.getTransactions(),
                tap(transactions.set)
            );
            return valueWithEffect.new(
                {
                    transactions,
                },
                getTransactionsEffect
            );
        }
);
