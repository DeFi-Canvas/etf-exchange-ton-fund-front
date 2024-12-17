import { injectable } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { newDepositRestService } from '@/API/deposit.service';
import { DepositAssets } from '../deposit/deposit.model';

export interface DepositDetails {
    readonly address: string;
    readonly memo: string;
    readonly qrCode: string;
}

export interface DepositEndPointViewModel {
    readonly details: Property<E.Either<string, DepositDetails>>;
    readonly img: Property<string>;
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
            const img = newLensedAtom('');

            const getDetails = pipe(
                service.getDepositDetails(),
                tap(details.set)
            );

            // TODO: TypeCast
            const imgEffect = pipe(
                service.getDepositAssets(),
                tap(
                    flow(
                        E.getOrElse(() => [] as DepositAssets[]),
                        A.findFirst((x) => x.ticker === ticker),
                        O.fold(
                            () => '',
                            (x) => x.img
                        ),
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
