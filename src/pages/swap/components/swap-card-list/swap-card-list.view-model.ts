import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newSwipeStore, SwipeStore } from '../../swap.store';

export interface Balance {
    int: string;
    float: string;
}

export interface SwarCardList {
    swapButtonClick: () => void;
    onAddAsset: () => void;
}

export interface NewSwarCardList {
    (): ValueWithEffect<SwarCardList>;
}

export const newSwarCardList = injectable(
    token('store')<SwipeStore>(),
    (store): NewSwarCardList =>
        () => {
            return valueWithEffect.new({
                swapButtonClick: store.swapTokenOrder,
                onAddAsset: store.onOpenaAddAssetBottomSheetIsOpen,
            });
        }
);
