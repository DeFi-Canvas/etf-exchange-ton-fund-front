import { injectable } from '@injectable-ts/core';
import { newAssetsSingleViewModel } from '@/pages/assets-single/assets-single.view-model.ts';
import AssetsSinglePage from '@/pages/assets-single/assets-single.page.tsx';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils.ts';
import { useParams } from 'react-router-dom';
import { useProperty } from '@frp-ts/react';

export const AssetsSingleContainer = injectable(
    newAssetsSingleViewModel,
    (newAssetsSingleViewModel) => () => {
        const { assetId } = useParams();

        const viewModel = useValueWithEffect(
            () =>  newAssetsSingleViewModel(assetId ?? ''),
            [],
        );

        const asset = useProperty(viewModel.asset)

        return React.createElement(AssetsSinglePage, {
                asset,
        });
    },
);
