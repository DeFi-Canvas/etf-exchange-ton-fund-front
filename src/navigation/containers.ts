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
import { newSwapStore } from '@/pages/swap/swap.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export interface getContainersArgs {
    userStore: UserStoreService;
    i18n: I18NService;
    cacheStore: CacheStore;
    assetService: AssetsRestService;
    transactionsService: TransactionsRestService;
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
}: getContainersArgs): Containers => ({
    deposit: getDepositContainers({
        userStore,
        i18n,
        cacheStore,
        assetService,
    }),
    whalet: getWhaletContainers({
        userStore,
        i18n,
        cacheStore,
        assetService,
        transactionsService,
    }),
    withdrow: getWithdrowContainers({
        userStore,
        i18n,
        cacheStore,
        assetService,
    }),
    whatToBuy: getWhatToBuyContainers({ userStore, i18n, cacheStore }),
    Profile: ProfileContainer({
        userStore,
        i18n,
    }),
    AssetPage: AssetsSingleContainer({
        i18n,
        assetService,
    }),
    SwapePage: SwapPageContainer({
        userStore,
        i18n,
        assetService,
        cacheStore,
        newSwapStore: useValueWithEffect(
            () =>
                newSwapStore({
                    i18n,
                    assetService,
                    cacheStore,
                })(),
            []
        ),
    }),
});
