import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwipeStore } from '../../swap.store';

export interface SwapHeader {
    onClick: () => void;
}

export interface NewSwapHeader {
    (): ValueWithEffect<SwapHeader>;
}

export const newSwapHeader = injectable(
    token('store')<SwipeStore>(),
    (store): NewSwapHeader =>
        () => {
            return valueWithEffect.new({
                onClick: store.onReset,
            });
        }
);
