import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { newWaletRestService } from '@/API/whalet.service';
import { FundsData } from '@/pages/what-to-buy/what-to-buy.model';

export interface FundsViewModel {
    readonly funds: Property<E.Either<string, Array<FundsData>>>;
}

export interface NewFundsViewModel {
    (): ValueWithEffect<FundsViewModel>;
}

export const newFundsViewModel = injectable(
    newWaletRestService,
    (service): NewFundsViewModel =>
        () => {
            const funds = newLensedAtom<E.Either<string, Array<FundsData>>>(
                E.left('pending')
            );

            const getFundsEffect = pipe(service.getFunds(), tap(funds.set));

            return valueWithEffect.new(
                {
                    funds,
                },
                getFundsEffect
            );
        }
);
