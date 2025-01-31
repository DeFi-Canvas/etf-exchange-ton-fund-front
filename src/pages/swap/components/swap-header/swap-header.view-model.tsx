import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';

export interface SwapHeader {
    onClick: () => void;
}

export interface NewSwapHeader {
    (): ValueWithEffect<SwapHeader>;
}

export const newSwapHeader = injectable(
    token('store')<SwapStore>(),
    (store): NewSwapHeader =>
        () => {
            return valueWithEffect.new({
                onClick: store.onReset,
            });
        }
);
