import { FundPageContainer } from '@what-to-buy/sub-page/funds/fund.container';
import { FundsPageContainer } from '@what-to-buy/sub-page/funds/funds.container';
import { PurchaseContainer } from '@what-to-buy/sub-page/purchase/purchase.container';
import { SellContainer } from '@what-to-buy/sub-page/sell/sell.container';
import { WhatToBuyPageContainer } from '@what-to-buy/what-to-buy.container';
import { Component, getContainersArgs } from '../containers';

export interface WhatToBuyContainers {
    WhatToBuyPage: Component;
    FundPage: Component;
    PurchaseContainer: Component;
    FundsPage: Component;
    SellContainer: Component;
}

export const getWhatToBuyContainers = ({
    userStore,
}: getContainersArgs): WhatToBuyContainers => ({
    PurchaseContainer: PurchaseContainer({
        userStore,
    }),
    SellContainer: SellContainer({
        userStore,
    }),
    WhatToBuyPage: WhatToBuyPageContainer({
        userStore,
    }),
    FundPage: FundPageContainer({ userStore }),
    FundsPage: FundsPageContainer({
        userStore,
    }),
});
