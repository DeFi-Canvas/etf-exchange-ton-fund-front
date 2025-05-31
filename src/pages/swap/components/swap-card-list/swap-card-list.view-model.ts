import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';

export interface SwapCardList {
    swapButtonClick: () => void;
    onAddAsset: () => void;
    onDelete: (id: string) => void;
}

export interface NewSwarCardList {
    (): ValueWithEffect<SwapCardList>;
}

export const newSwapCardList = injectable(
    token('store')<SwapStore>(),
    (store): NewSwarCardList =>
        () => {
            return valueWithEffect.new({
                swapButtonClick: store.swapTokenOrder,
                onAddAsset: store.onOpenaAddAssetBottomSheetIsOpen,
                onDelete: store.onRemoveAsset,
            });
        }
);
