import { injectable } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { empty, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import {
    DepositAsserts,
    WithdrowAsserts,
} from '../assets-card/assets-card.component';
import { newDepositRestService } from '@/API/deposit.service';

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
    newDepositRestService,
    (waletRestService, newDepositRestService): NewAssetsViewModel =>
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
                        return newDepositRestService.getDepositAssets();
                    }
                    default: {
                        return empty();
                    }
                }
            })();

            const getAssetsEffect = pipe(currentAssets, tap(assets.set));

            return valueWithEffect.new(
                {
                    assets,
                },
                getAssetsEffect
            );
        }
);
