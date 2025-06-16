import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { newWaletRestService } from '@/API/whalet.service';
import { FundsData } from '@/instance/fund/fund.model';
import { Errors, PENDING } from '@/store/errors/erorr-systrm';

export interface FundsViewModel {
    readonly funds: Property<E.Either<Errors, Array<FundsData>>>;
}

export interface NewFundsViewModel {
    (): ValueWithEffect<FundsViewModel>;
}

export const newFundsViewModel = injectable(
    newWaletRestService,
    (service): NewFundsViewModel =>
        () => {
            const funds = newLensedAtom<E.Either<Errors, Array<FundsData>>>(
                E.left(PENDING)
            );

            const getFundsEffect = pipe(
                service.getWhaletFunds(),
                tap((x) => {
                    funds.set(x);
                })
            );

            return valueWithEffect.new(
                {
                    funds,
                },
                getFundsEffect
            );
        }
);
