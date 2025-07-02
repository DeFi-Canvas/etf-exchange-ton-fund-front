import { UserStoreService } from '@/store/user.store';
import { MemoExoticComponent, FC } from 'react';
import {
    DepositContainers,
    getDepositContainers,
} from './page-containers/deposit-containers';
import {
    getWhaletContainers,
    WhaletContainers,
} from './page-containers/whalet-containers';
import {
    getWithdrowContainers,
    WithdrowContainers,
} from './page-containers/withdraw-containers';
import {
    getWhatToBuyContainers,
    WhatToBuyContainers,
} from './page-containers/what-to-buy-containers';
import { ProfileContainer } from '@/pages/profile/profile.page';
import { AssetsSingleContainer } from '@/pages/assets-single/assets-single.container';
import { SwapPageContainer } from '@/pages/swap/swap.container';
import { I18NService } from '@/store/i18n/i18.store';
import { CacheStore } from '@/store/cache/cahe.store';
import { AssetsRestService } from '@/API/assets/assets.service';
import { TransactionsRestService } from '@/API/transactions/transactions.service';
import { Scheduler } from '@most/types';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { SwapStore } from '@/pages/swap/swap.store';
import { WaletRestService } from '@/API/wallet.service';
import { PurchaseSellStore } from '@/pages/what-to-buy/sub-page/purchase/purchase.store';

export interface getContainersArgs {
    userStore: UserStoreService;
    i18n: I18NService;
    cacheStore: CacheStore;
    assetService: AssetsRestService;
    transactionsService: TransactionsRestService;
    scheduler: Scheduler;
    withdrowStore: WithdrowStore;
    swapStore: SwapStore;
    waletRestService: WaletRestService;
    purchaseStore: PurchaseSellStore;
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
    SwapePage: Component;
}

export const getContainers = ({
    userStore,
    i18n,
    cacheStore,
    assetService,
    transactionsService,
    scheduler,
    withdrowStore,
    swapStore,
    waletRestService,
    purchaseStore,
}: getContainersArgs): Containers => {
    return {
        deposit: getDepositContainers({
            userStore,
            i18n,
            cacheStore,
            assetService,
            scheduler,
            withdrowStore,
            waletRestService,
        }),
        whalet: getWhaletContainers({
            userStore,
            i18n,
            cacheStore,
            assetService,
            transactionsService,
            scheduler,
            withdrowStore,
            swapStore,
            waletRestService,
            purchaseStore,
        }),
        withdrow: getWithdrowContainers({
            userStore,
            i18n,
            cacheStore,
            assetService,
            scheduler,
            waletRestService,
            withdrowStore,
        }),
        whatToBuy: getWhatToBuyContainers({
            userStore,
            i18n,
            cacheStore,
            scheduler,
            purchaseStore,
        }),
        Profile: ProfileContainer({
            userStore,
            i18n,
            scheduler,
        }),
        AssetPage: AssetsSingleContainer({
            i18n,
            assetService,
            scheduler,
        }),
        SwapePage: SwapPageContainer({
            userStore,
            i18n,
            cacheStore,
            assetService,
            scheduler,
            store: swapStore,
        }),
    };
};
