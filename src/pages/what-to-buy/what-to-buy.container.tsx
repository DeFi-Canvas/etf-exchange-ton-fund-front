import { injectable } from '@injectable-ts/core';
import React from 'react';
import { WaletPage } from './what-to-buy.page';

export const WaletPageContainer = injectable(
    WaletPage,
    // eslint-disable-next-line react/display-name
    (WhatToBuyPage) => () => {
        return React.createElement(WhatToBuyPage);
    }
);
