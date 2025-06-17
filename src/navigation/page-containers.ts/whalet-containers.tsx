import { Component, getContainersArgs } from '../containers';
import { WaletPageContainer } from '@/pages/whalet/wallet.container';
import { AssetsContainer } from '@whalet/sub-pages/assets/assets.container';
import { FundsContainer } from '@/pages/whalet/sub-pages/founds/funds.container';
import { TransactionsContainer } from '@/pages/whalet/sub-pages/transactions/transactions.container';

export interface WhaletContainers {
    WaletPage: Component;
    Assets: Component;
    Funds: Component;
    Transactions: Component;
}

export const getWhaletContainers = ({
    userStore,
    i18n,
    transactionsRestService,
    caheStore,
}: getContainersArgs): WhaletContainers => ({
    WaletPage: WaletPageContainer({
        userStore,
        i18n,
        caheStore,
    }),
    Assets: AssetsContainer({
        userStore,
        caheStore,
    }),
    Transactions: TransactionsContainer({
        transactionsRestService,
    }),
    Funds: FundsContainer({
        userStore,
        caheStore,
    }),
});
