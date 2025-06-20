// import { newAssetsRestService } from '@/API/assets.service';
import { UserStoreService } from '@/store/user.store';
import { MemoExoticComponent, FC, lazy, LazyExoticComponent } from 'react';
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
import { ProfileContainer } from '@/pages/profile/profile.page';
import { AssetsSingleContainer } from '@/pages/assets-single/assets-single.container';
import { SwapPageContainer } from '@/pages/swap/swap.container';
import { I18NService } from '@/store/i18n/i18.store';
import { TransactionsRestService } from '@/API/transactions/transactions.service';
import { AssetsRestService } from '@/API/assets/assets.service';
import { CacheStore } from '@/store/cache/cahe.store';

export interface getContainersArgs {
    userStore: UserStoreService;
    i18n: I18NService;
    transactionsRestService: TransactionsRestService;
    assetsRestService: AssetsRestService;
    cacheStore: CacheStore;
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
    transactionsRestService,
    assetsRestService,
    cacheStore,
}: getContainersArgs): Containers => ({
    deposit: getDepositContainers({
        userStore,
        i18n,
        assetsRestService,
        cacheStore,
    }),
    whalet: getWhaletContainers({
        userStore,
        i18n,
        transactionsRestService,
        assetsRestService,
        cacheStore,
    }),
    withdrow: getWithdrowContainers({
        userStore,
        i18n,
        assetsRestService,
        cacheStore,
    }),
    whatToBuy: getWhatToBuyContainers({ userStore, i18n, cacheStore }),
    Profile: ProfileContainer({
        userStore,
        i18n,
    }),
    AssetPage: AssetsSingleContainer({
        assetsRestService,
        i18n,
    }),
    SwapePage: SwapPageContainer({
        userStore,
        i18n,
        assetsRestService,
        cacheStore,
    }),
});
