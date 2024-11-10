import { injectable } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { empty, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/rest-service';
import { newLensedAtom } from '@frp-ts/lens';
import {
    DepositAsserts,
    WithdrowAsserts,
} from '../assets-card/assets-card.component';

export type AssetsViewModelInit = 'deposit' | 'withdrow';
export interface AssetsViewModel {
    assets: Property<
        E.Either<string | 'pending', Array<DepositAsserts | WithdrowAsserts>>
    >;
}

export interface NewAssetsViewModel {
    (type: AssetsViewModelInit): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    newWaletRestService,
    (waletRestService): NewAssetsViewModel =>
        (type) => {
            const assets = newLensedAtom<
                E.Either<
                    string | 'pending',
                    Array<DepositAsserts | WithdrowAsserts>
                >
            >(E.left('pending'));

            const currentAssets = (() => {
                switch (type) {
                    case 'withdrow':
                        return waletRestService.getWithdrowAssets();
                    case 'deposit': {
                        return waletRestService.getDepositAssets();
                    }
                    default: {
                        return empty();
                    }
                }
            })();

            const getAssetsEffect = pipe(
                // waletRestService.getDepositAssets(),
                currentAssets,
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
