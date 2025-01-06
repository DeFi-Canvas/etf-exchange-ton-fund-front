import { injectable } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { newDepositRestService } from '@/API/deposit.service';

export interface DepositDetails {
    readonly address: string;
    readonly memo: string;
    readonly qrCode: string;
}

export interface DepositEndPointViewModel {
    readonly details: Property<E.Either<string, DepositDetails>>;
    readonly img: Property<E.Either<string, string>>;
}

export interface NewDepositEndPointViewModel {
    (ticker: string | undefined): ValueWithEffect<DepositEndPointViewModel>;
}

export const newDepositEndPointViewModel = injectable(
    newDepositRestService,
    (service): NewDepositEndPointViewModel =>
        (ticker) => {
            const details = newLensedAtom<E.Either<string, DepositDetails>>(
                E.left('Loading')
            );
            const img = newLensedAtom<E.Either<string, string>>(
                E.left('empty')
            );

            const getDetails = pipe(
                service.getDepositDetails(),
                tap(details.set)
            );

            const imgEffect = pipe(
                service.getDepositAssets(),
                tap(
                    flow(
                        E.chain((depositAssets) => {
                            return pipe(
                                depositAssets,
                                A.findFirst((x) => x.ticker === ticker),
                                E.fromOption(() => 'empty'),
                                E.map(({ img }) => img)
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
