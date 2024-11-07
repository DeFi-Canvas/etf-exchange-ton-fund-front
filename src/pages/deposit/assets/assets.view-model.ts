import { injectable } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/rest-service';
import { newLensedAtom } from '@frp-ts/lens';
import { DepositAsserts } from '../assets-card/assets-card.component';

export interface AssetsViewModel {
    assets: Property<E.Either<string | 'pending', Array<DepositAsserts>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    newWaletRestService,
    (waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<
                E.Either<string | 'pending', Array<DepositAsserts>>
            >(E.left('pending'));

            const getAssetsEffect = pipe(
                waletRestService.getDepositAssets(),
                tap(assets.set)
            );

            return valueWithEffect.new(
                {
                    assets,
                },
                getAssetsEffect
            );
        }
);
