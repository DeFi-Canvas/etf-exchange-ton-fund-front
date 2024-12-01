import { injectable } from '@injectable-ts/core';
import React from 'react';
import { WaletPage } from './whalet.page';

export const WaletPageContainer = injectable(WaletPage, (WaletPage) => () => {
    return React.createElement(WaletPage);
});
