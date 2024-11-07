import { injectable } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/rest-service';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';

export interface DepositDetails {
    readonly address: string;
    readonly memo: string;
    readonly qrCode: string;
}

export interface DepositEndPointViewModel {
    readonly details: Property<E.Either<string, DepositDetails>>;
}

export interface NewDepositEndPointViewModel {
    (): ValueWithEffect<DepositEndPointViewModel>;
}

export const newDepositEndPointViewModel = injectable(
    newWaletRestService,
    (newWaletRestService): NewDepositEndPointViewModel =>
        () => {
            const details = newLensedAtom<E.Either<string, DepositDetails>>(
                E.left('Loading')
            );

            const getDetails = pipe(
                newWaletRestService.getDepositDetails(),
                tap(details.set)
            );
            return valueWithEffect.new(
                {
                    details,
                },
                getDetails
            );
        }
);
