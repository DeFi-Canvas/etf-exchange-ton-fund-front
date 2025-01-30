import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwipeStore } from '../../swap.store';

export interface SwarCard {
    onArrowClick: (id: string) => void;
    onChangeField: (id: string, value: number) => void;
    onMaxClick: () => void;
}

export interface NewSwarCard {
    (): ValueWithEffect<SwarCard>;
}

export const newSwarCard = injectable(
    token('store')<SwipeStore>(),
    (store): NewSwarCard =>
        () => {
            const onArrowClick = (id: string) => {
                store.onOpenselectAssetBottomSheetIsOpen();
                store.setCurrentVariableSwapAsset(id);
            };
            return valueWithEffect.new({
                onArrowClick,
                onChangeField: store.updAssetCurrentValue,
                onMaxClick: store.onMaxClick,
            });
        }
);
