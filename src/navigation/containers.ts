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

export interface getContainersArgs {
    userStore: UserStoreService;
    i18n: I18NService;
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
}: getContainersArgs): Containers => ({
    deposit: getDepositContainers({
        userStore,
        i18n,
    }),
    whalet: getWhaletContainers({
        userStore,
        i18n,
    }),
    withdrow: getWithdrowContainers({
        userStore,
        i18n,
    }),
    whatToBuy: getWhatToBuyContainers({ userStore, i18n }),
    Profile: ProfileContainer({
        userStore,
        i18n,
    }),
    AssetPage: AssetsSingleContainer({
        i18n,
    }),
    SwapePage: SwapPageContainer({
        userStore,
        i18n,
    }),
});
