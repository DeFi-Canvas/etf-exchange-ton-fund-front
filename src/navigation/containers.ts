import { newAssetsRestService } from '@/API/assets.service';
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

export interface getContainersArgs {
    userStore: UserStoreService;
}

type ReactComponent = () => JSX.Element;
export type Component =
    | LazyExoticComponent<MemoExoticComponent<FC> | ReactComponent>
    | MemoExoticComponent<FC>
    | ReactComponent;

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
}: getContainersArgs): Containers => ({
    whalet: getWhaletContainers({ userStore }),
    deposit: getDepositContainers({ userStore }),
    withdrow: getWithdrowContainers({ userStore }),
    whatToBuy: getWhatToBuyContainers({ userStore }),

    Profile: lazy(() =>
        import('@/pages/profile/profile.page').then((c) => {
            const component = c.ProfileContainer({ userStore });
            return { default: component };
        })
    ),
    AssetPage: lazy(() =>
        import('@/pages/assets-single/assets-single.container').then((c) => {
            const component = c.AssetsSingleContainer({
                assetRestService: newAssetsRestService(),
            });
            return { default: component };
        })
    ),
    SwapePage: lazy(() =>
        import('@/pages/swap/swap.container').then((c) => {
            const component = c.SwapPageContainer({ userStore });
            return { default: component };
        })
    ),
});
