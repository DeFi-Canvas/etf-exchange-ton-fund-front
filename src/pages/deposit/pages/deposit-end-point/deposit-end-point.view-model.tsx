import { injectable } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { EMPTY, Error, LOADING } from '@/store/errors/error-system';
import { assetsRestService } from '@/API/assets/assets.service';
import { TransactionsRestService } from '@/API/transactions/transactions.service';
import { Deposit } from '@/API/transactions/transactions.responce.contract';

export interface DepositEndPointViewModel {
    readonly details: Property<E.Either<Error, Deposit>>;
    readonly img: Property<E.Either<Error, string>>;
}

export interface NewDepositEndPointViewModel {
    (ticker: string | undefined): ValueWithEffect<DepositEndPointViewModel>;
}

export const newDepositEndPointViewModel = injectable(
    TransactionsRestService,
    assetsRestService,
    (service, assetsRestService): NewDepositEndPointViewModel =>
        (ticker) => {
            const details = newLensedAtom<E.Either<Error, Deposit>>(
                E.left(LOADING)
            );
            const img = newLensedAtom<E.Either<Error, string>>(E.left(EMPTY));

            const getDetails = pipe(
                service.getDepositDetails(),
                tap(details.set)
            );

            const imgEffect = pipe(
                assetsRestService.getAllAssets(),
                tap(
                    flow(
                        E.chain((depositAssets) => {
                            return pipe(
                                depositAssets,
                                A.findFirst((x) => x.ticker === ticker),
                                E.fromOption(() => EMPTY),
                                E.map(({ imageUrl }) => imageUrl)
                            );
                        }),
                        img.set
                    )
                )
            );

            return valueWithEffect.new(
                {
                    details,
                    img,
                },
                getDetails,
                imgEffect
            );
        }
);
