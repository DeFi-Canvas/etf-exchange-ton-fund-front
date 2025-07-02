import { injectable, token } from '@injectable-ts/core';
import { newAssetsSingleViewModel } from '@/pages/assets-single/assets-single.view-model.ts';
import AssetsSinglePage from '@/pages/assets-single/assets-single.page.tsx';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils.ts';
import { useParams } from 'react-router-dom';
import { useProperty } from '@frp-ts/react';
import { I18NService } from '@/store/i18n/i18.store';

export const AssetsSingleContainer = injectable(
    newAssetsSingleViewModel,
    token('i18n')<I18NService>(),
    useValueWithEffect,
    (newAssetsSingleViewModel, i18n, useValueWithEffect) =>
        memo(() => {
            const { assetId } = useParams();

            const viewModel = useValueWithEffect(
                () => newAssetsSingleViewModel(assetId ?? ''),
                []
            );

            const asset = useProperty(viewModel.asset);
            const texts = useProperty(i18n.Asset);

            return React.createElement(AssetsSinglePage, {
                asset,
                texts,
            });
        })
);
