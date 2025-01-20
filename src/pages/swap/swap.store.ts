import { formatNumberToUI } from '@/utils/number';
import { fromProperty } from '@/utils/property.utils';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { tap } from '@most/core';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';
import { injectable } from '@injectable-ts/core';
import { newWaletRestService } from '@/API/whalet.service';
import { newSwipeRestService } from '@/API/swipe.service';

export interface SwipeStore {
    emmitSwipe: () => void;
}

export type NewSwipeStore = ValueWithEffect<SwipeStore>;

export const newSwipeStore = injectable(
    newWaletRestService,
    newSwipeRestService,
    (walletService, swipeRestService) => (): NewSwipeStore => {
        const testEvent = swipeRestService.getConnection();

        return valueWithEffect.new(
            {
                emmitSwipe: swipeRestService.initiate,
            },
            testEvent
        );
    }
);
