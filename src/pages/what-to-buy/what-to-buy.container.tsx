import { injectable } from '@injectable-ts/core';
import React from 'react';
import { WhatToBuyPage } from './what-to-buy.page';

export const WhatToBuyPageContainer = injectable(
    WhatToBuyPage,
    // eslint-disable-next-line react/display-name
    (WhatToBuyPage) => () => {
        return React.createElement(WhatToBuyPage);
    }
);
