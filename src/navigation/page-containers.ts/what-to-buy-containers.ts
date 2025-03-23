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

export const getWhatToBuyContainers = ({
    userStore,
}: getContainersArgs): WhatToBuyContainers => ({
    WhatToBuyPage: WhatToBuyPageContainer({
        userStore,
    }),
    PurchaseContainer: PurchaseContainer({
        userStore,
    }),
    SellContainer: SellContainer({
        userStore,
    }),
    FundPage: FundPageContainer({ userStore }),
    FundsPage: FundsPageContainer({
        userStore,
    }),
    // WhatToBuyPage: lazy(() =>
    //     import('@what-to-buy/what-to-buy.container').then((c) => {
    //         const component = c.WhatToBuyPageContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // PurchaseContainer: lazy(() =>
    //     import('@what-to-buy/sub-page/purchase/purchase.container').then(
    //         (c) => {
    //             const component = c.PurchaseContainer({ userStore });
    //             return { default: component };
    //         }
    //     )
    // ),
    // SellContainer: lazy(() =>
    //     import('@what-to-buy/sub-page/sell/sell.container').then((c) => {
    //         const component = c.SellContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // FundPage: lazy(() =>
    //     import('@what-to-buy/sub-page/funds/fund.container').then((c) => {
    //         const component = c.FundPageContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // FundsPage: lazy(() =>
    //     import('@what-to-buy/sub-page/funds/funds.container').then((c) => {
    //         const component = c.FundsPageContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
});
