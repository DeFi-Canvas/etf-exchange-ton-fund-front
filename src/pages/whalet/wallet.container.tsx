import { injectable } from '@injectable-ts/core';
import React, { memo } from 'react';
import { WaletPage } from './wallet.page';

export const WaletPageContainer = injectable(WaletPage, (WaletPage) =>
    memo(() => {
        return React.createElement(WaletPage);
    })
);
