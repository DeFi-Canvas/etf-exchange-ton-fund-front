import { Component, getContainersArgs } from '../containers';
import { WaletPageContainer } from '@whalet/whalet.container';
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

    // Assets: AssetsContainer({
    //     userStore,
    // }),
    // Transactions: lazy(() =>
    //     import('@whalet/sub-pages/transactions/transactions.container').then(
    //         (c) => {
    //             const component = c.TransactionsContainer({ userStore });
    //             return { default: component };
    //         }
    //     )
    // ),
    // Funds: lazy(() =>
    //     import('@whalet/sub-pages/founds/funds.container').then((c) => {
    //         const component = c.FundsContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
});
