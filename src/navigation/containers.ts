import { UserData } from '@/store/user.store';
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
import { WaletRestService } from '@/API/wallet/wallet.service';
import { SwapRestService } from '@/API/swap.service';
import { DeDustRestService } from '@/API/de-dust/de-dust.service';
import {
    EarnContainers,
    getEarnContainers,
} from './page-containers/earn-containers';

export interface getContainersArgs {
    i18n: I18NService;
    cacheStore: CacheStore;
    assetService: AssetsRestService;
    transactionsService: TransactionsRestService;
    withdrowStore: WithdrowStore;
    waletRestService: WaletRestService;
    scheduler: Scheduler;
    swapService: SwapRestService;
    userData: UserData;
    deDustRestService: DeDustRestService;
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
    earn: EarnContainers;
}

export const getContainers = (services: getContainersArgs): Containers => ({
    deposit: getDepositContainers(services),
    whalet: getWhaletContainers(services),
    withdrow: getWithdrowContainers(services),
    whatToBuy: getWhatToBuyContainers(services),
    Profile: ProfileContainer({
        ...services,
    }),
    AssetPage: AssetsSingleContainer(services),
    SwapePage: SwapPageContainer(services),
    earn: getEarnContainers(services),
});
