import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffectT } from '@/utils/run-view-model.utils';
import { newSwarCard } from './swap-card.view-model';
import { SwapAssetCard, SwapAssetCardProps } from './swap-asset-card.component';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

interface SwarCardListContainer
    extends Omit<
        SwapAssetCardProps,
        'onArrowClick' | 'onChangeField' | 'onMaxClick' | 'texts'
    > {}

export const SwapAssetCardContainer = injectable(
    useValueWithEffectT,
    newSwarCard,
    token('i18n')<I18NService>(),
    (useValueWithEffect, newSwarCard, i18n) =>
        (props: SwarCardListContainer) => {
            const vm = useValueWithEffect(() => newSwarCard(), []);
            const { cards: texts } = useProperty(i18n.Swap);

            return React.createElement(SwapAssetCard, {
                ...props,
                ...vm,
                texts,
            });
        }
);
