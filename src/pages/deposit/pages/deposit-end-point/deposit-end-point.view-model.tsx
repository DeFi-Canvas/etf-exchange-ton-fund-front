import { injectable } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { newDepositRestService } from '@/API/deposit.service';
import { EMPTY, Errors, LOADING } from '@/store/errors/erorr-systrm';
import { AssetsRestService } from '@/API/assets/assets.service';

export interface DepositDetails {
    readonly address: string;
    readonly memo: string;
    readonly qrCode: string;
}

export interface DepositEndPointViewModel {
    readonly details: Property<E.Either<Errors, DepositDetails>>;
    readonly img: Property<E.Either<Errors, string>>;
}

export interface NewDepositEndPointViewModel {
    (ticker: string | undefined): ValueWithEffect<DepositEndPointViewModel>;
}

export const newDepositEndPointViewModel = injectable(
    newDepositRestService,
    AssetsRestService,
    (service, assetsRestService): NewDepositEndPointViewModel =>
        (ticker) => {
            const details = newLensedAtom<E.Either<Errors, DepositDetails>>(
                E.left(LOADING)
            );
            const img = newLensedAtom<E.Either<Errors, string>>(E.left(EMPTY));

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
