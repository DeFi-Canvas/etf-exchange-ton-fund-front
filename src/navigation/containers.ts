import { DepositEndPointContainer } from '@/pages/deposit-end-point/deposit-end-point.container';
import { DepositPageContainer } from '@/pages/deposit/deposit.page';
import { ProfileContainer } from '@/pages/profile/profile.page';
import { AssetsContainer } from '@/pages/whalet/sub-pages/assets/assets.container';
import { FundsContainer } from '@/pages/whalet/sub-pages/founds/funds.container';
import { TransactionsContainer } from '@/pages/whalet/sub-pages/transactions/transactions.container';
import { WaletPageContainer } from '@/pages/whalet/whalet.container';
import { PurchaseContainer } from '@/pages/what-to-buy/sub-page/purchase/purchase.container';
import { SellContainer } from '@/pages/what-to-buy/sub-page/sell/sell.container';
import { WhatToBuyPageContainer } from '@/pages/what-to-buy/what-to-buy.container';
import { AddressContainer } from '@/pages/withdrow/sub-page/address/address.container';
import { AmountContainer } from '@/pages/withdrow/sub-page/ammount/amount.container';
import { CheckContainer } from '@/pages/withdrow/sub-page/check/check.container';
import { FinalContainer } from '@/pages/withdrow/sub-page/final/final.container';
import { Withdrow } from '@/pages/withdrow/withdrow.page';
import { UserStoreService } from '@/store/user.store';
import { MemoExoticComponent, FC } from 'react';

interface getContainersArgs {
    userStore: UserStoreService;
}

type MemoComponent = MemoExoticComponent<FC>;

export interface Containers {
    WaletPageResolved: () => JSX.Element;
    ProfileResolved: () => JSX.Element;
    AssetsResolved: () => JSX.Element;
    TransactionsResolved: () => JSX.Element;
    FundsResolved: () => JSX.Element;
    DepositPageResolved: () => JSX.Element;
    DepositEndPointResolved: () => JSX.Element;
    WithdrowResolved: () => JSX.Element;
    AmountResolved: MemoComponent;
    AddressResolved: MemoComponent;
    CheckResolved: MemoComponent;
    FinalResolved: MemoComponent;
    PurchaseContainerResolved: () => JSX.Element;
    SellContainerResolved: () => JSX.Element;
    WhatToBuyPageResolved: () => JSX.Element;
}

export const getContainers = ({
    userStore,
}: getContainersArgs): Containers => ({
    WaletPageResolved: WaletPageContainer({
        userStore,
    }),
    ProfileResolved: ProfileContainer({
        userStore,
    }),
    AssetsResolved: AssetsContainer({
        userStore,
    }),
    TransactionsResolved: TransactionsContainer({
        userStore,
    }),
    FundsResolved: FundsContainer({
        userStore,
    }),
    DepositPageResolved: DepositPageContainer({
        userStore,
    }),
    DepositEndPointResolved: DepositEndPointContainer({
        userStore,
    }),
    WithdrowResolved: Withdrow({
        userStore,
    }),
    AmountResolved: AmountContainer({
        userStore,
    }),
    AddressResolved: AddressContainer({
        userStore,
    }),
    CheckResolved: CheckContainer({
        userStore,
    }),
    FinalResolved: FinalContainer({
        userStore,
    }),
    PurchaseContainerResolved: PurchaseContainer({
        userStore,
    }),
    SellContainerResolved: SellContainer({
        userStore,
    }),
    WhatToBuyPageResolved: WhatToBuyPageContainer({
        userStore,
    }),
});
