import { DepositEndPointContainer } from '@/pages/deposit-end-point/deposit-end-point.container';
import { DepositPageContainer } from '@/pages/deposit/deposit.page';
import { ProfileContainer } from '@/pages/profile/profile.page';
import { AssetsContainer } from '@/pages/whalet/sub-pages/assets/assets.container';
import { FundsContainer } from '@/pages/whalet/sub-pages/founds/funds.container';
import { TransactionsContainer } from '@/pages/whalet/sub-pages/transactions/transactions.container';
import { WaletPageContainer } from '@/pages/whalet/whalet.container';
import { FundPageContainer } from '@/pages/what-to-buy/sub-page/funds/fund.container';
import { PurchaseContainer } from '@/pages/what-to-buy/sub-page/purchase/purchase.container';
import { SellContainer } from '@/pages/what-to-buy/sub-page/sell/sell.container';
import { WhatToBuyPageContainer } from '@/pages/what-to-buy/what-to-buy.container';
import { AddressContainer } from '@/pages/withdrow/sub-page/address/address.container';
import { AmountContainer } from '@/pages/withdrow/sub-page/ammount/amount.container';
import { CheckContainer } from '@/pages/withdrow/sub-page/check/check.container';
import { FinalContainer } from '@/pages/withdrow/sub-page/final/final.container';
import { Withdrow } from '@/pages/withdrow/withdrow.page';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { UserStoreService } from '@/store/user.store';
import { MemoExoticComponent, FC } from 'react';

interface getContainersArgs {
    userStore: UserStoreService;
    withdrowStore: WithdrowStore;
}

type MemoComponent = MemoExoticComponent<FC>;

export interface Containers {
    WaletPage: () => JSX.Element;
    Profile: () => JSX.Element;
    Assets: () => JSX.Element;
    Transactions: () => JSX.Element;
    Funds: () => JSX.Element;
    DepositPage: () => JSX.Element;
    DepositEndPoint: () => JSX.Element;
    Withdrow: MemoComponent;
    Amount: MemoComponent;
    Address: MemoComponent;
    Check: MemoComponent;
    Final: MemoComponent;
    PurchaseContainer: () => JSX.Element;
    SellContainer: () => JSX.Element;
    WhatToBuyPage: () => JSX.Element;
    FundPage: () => JSX.Element;
}

export const getContainers = ({
    userStore,
    withdrowStore,
}: getContainersArgs): Containers => ({
    WaletPage: WaletPageContainer({
        userStore,
    }),
    Profile: ProfileContainer({
        userStore,
    }),
    Assets: AssetsContainer({
        userStore,
    }),
    Transactions: TransactionsContainer({
        userStore,
    }),
    Funds: FundsContainer({
        userStore,
    }),
    DepositPage: DepositPageContainer({
        userStore,
        withdrowStore,
    }),
    DepositEndPoint: DepositEndPointContainer({
        userStore,
    }),
    Withdrow: Withdrow({
        userStore,
        withdrowStore,
    }),
    Amount: AmountContainer({
        userStore,
    }),
    Address: AddressContainer({
        withdrowStore,
    }),
    Check: CheckContainer({
        userStore,
    }),
    Final: FinalContainer({
        userStore,
    }),
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
});
