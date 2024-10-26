import { injectable, token } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
// import { createAdapter } from '@most/adapter';
// import { Option } from 'fp-ts/lib/Option';
// import { Property } from '@frp-ts/core';
// import { newLensedAtom } from '@frp-ts/lens';
// import * as O from 'fp-ts/Option';
// import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { WaletRestService } from '@/API/rest-service';

export interface WhatToBuyViewModel {}

export interface NewWhatToBuyViewModel {
    (): ValueWithEffect<WhatToBuyViewModel>;
}

export const newWhatToBuyViewModel = injectable(
    token('waletRestService')<WaletRestService>(),
    (waletRestService): NewWhatToBuyViewModel =>
        () => {
            const testEffect = pipe(
                waletRestService.getWalletInfo(''),
                tap(console.log)
            );
            return valueWithEffect.new({}, testEffect);
        }
);
