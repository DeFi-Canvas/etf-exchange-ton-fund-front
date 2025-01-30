import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwipeStore } from '../../swap.store';
import { DropdownOptions } from '@/components/dropdown/dropdown.component';
import { Property } from '@frp-ts/core';

export interface SwapDropdown {
    options: Property<DropdownOptions[]>;
}

export interface NewSwapDropdown {
    (): ValueWithEffect<SwapDropdown>;
}

export const newSwapDropdown = injectable(
    token('store')<SwipeStore>(),
    (store): NewSwapDropdown =>
        () => {
            return valueWithEffect.new({
                options: store.swapListInfo,
            });
        }
);
