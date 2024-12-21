import { newAssetsRestService } from '@/API/assets.service';
import { AssetsSingleContainer } from '@/pages/assets-single/assets-single.container';
import { ProfileContainer } from '@/pages/profile/profile.page';
// import { FundPageContainer } from '@/pages/what-to-buy/sub-page/funds/fund.container';
// import { FundsPageContainer } from '@/pages/what-to-buy/sub-page/funds/funds.container';
// import { PurchaseContainer } from '@/pages/what-to-buy/sub-page/purchase/purchase.container';
// import { SellContainer } from '@/pages/what-to-buy/sub-page/sell/sell.container';
// import { WhatToBuyPageContainer } from '@/pages/what-to-buy/what-to-buy.container';
import { UserStoreService } from '@/store/user.store';
import { MemoExoticComponent, FC } from 'react';
import {
    DepositContainers,
    getDepositContainers,
} from './page-containers.ts/deposit-containers';
import {
    getWhaletContainers,
    WhaletContainers,
} from './page-containers.ts/whalet-containers';
import {
    getWithdrowContainers,
    WithdrowContainers,
} from './page-containers.ts/withdraw-containers';
import {
    getWhatToBuyContainers,
    WhatToBuyContainers,
} from './page-containers.ts/what-to-buy-containers';

export interface getContainersArgs {
    userStore: UserStoreService;
}

type ReactComponent = () => JSX.Element;
export type Component = MemoExoticComponent<FC> | ReactComponent;

export interface Containers {
    deposit: DepositContainers;
    whalet: WhaletContainers;
    withdrow: WithdrowContainers;
    whatToBuy: WhatToBuyContainers;
    Profile: Component;
    AssetPage: Component;
}

export const getContainers = ({
    userStore,
}: getContainersArgs): Containers => ({
    deposit: getDepositContainers({ userStore }),
    whalet: getWhaletContainers({ userStore }),
    withdrow: getWithdrowContainers({ userStore }),
    whatToBuy: getWhatToBuyContainers({ userStore }),

    Profile: ProfileContainer({
        userStore,
    }),
    AssetPage: AssetsSingleContainer({
        assetRestService: newAssetsRestService(),
    }),
});
