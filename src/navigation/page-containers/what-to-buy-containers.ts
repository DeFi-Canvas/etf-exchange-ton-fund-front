import { FundPageContainer } from '@/pages/what-to-buy/sub-page/funds/fund.container';
import { FundsPageContainer } from '@/pages/what-to-buy/sub-page/funds/funds.container';
import { PurchaseContainer } from '@/pages/what-to-buy/sub-page/purchase/purchase.container';
import { SellContainer } from '@/pages/what-to-buy/sub-page/sell/sell.container';
import { WhatToBuyPageContainer } from '@/pages/what-to-buy/what-to-buy.container';
import { Component, getContainersArgs } from '../containers';

export interface WhatToBuyContainers {
    WhatToBuyPage: Component;
    FundPage: Component;
    PurchaseContainer: Component;
    FundsPage: Component;
    SellContainer: Component;
}

export const getWhatToBuyContainers = (
    services: getContainersArgs
): WhatToBuyContainers => ({
    WhatToBuyPage: WhatToBuyPageContainer({
        ...services,
    }),
    PurchaseContainer: PurchaseContainer({
        ...services,
    }),
    SellContainer: SellContainer({
        ...services,
    }),
    FundPage: FundPageContainer({
        ...services,
    }),
    FundsPage: FundsPageContainer({
        ...services,
    }),
});
