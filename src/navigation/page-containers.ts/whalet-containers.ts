import { Component, getContainersArgs } from '../containers';
import { WaletPageContainer } from '@whalet/whalet.container';
import { AssetsContainer } from '@whalet/sub-pages/assets/assets.container';
import { TransactionsContainer } from '@whalet/sub-pages/transactions/transactions.container';
import { FundsContainer } from '@whalet/sub-pages/founds/funds.container';

export interface WhaletContainers {
    WaletPage: Component;
    Assets: Component;
    Funds: Component;
    Transactions: Component;
}

export const getWhaletContainers = ({
    userStore,
}: getContainersArgs): WhaletContainers => ({
    WaletPage: WaletPageContainer({
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
});
