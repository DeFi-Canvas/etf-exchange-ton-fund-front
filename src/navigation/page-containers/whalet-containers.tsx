import { Component, getContainersArgs } from '../containers';
import { AssetsContainer } from '@whalet/sub-pages/assets/assets.container';
import { FundsContainer } from '@/pages/whalet/sub-pages/founds/funds.container';
import { TransactionsContainer } from '@/pages/whalet/sub-pages/transactions/transactions.container';
import { WaletPage } from '@/pages/whalet/wallet.page';

export interface WhaletContainers {
    WaletPage: Component;
    Assets: Component;
    Funds: Component;
    Transactions: Component;
}

export const getWhaletContainers = (
    services: getContainersArgs
): WhaletContainers => ({
    WaletPage: WaletPage({
        ...services,
    }),
    Assets: AssetsContainer({
        ...services,
    }),
    Transactions: TransactionsContainer({ ...services }),
    Funds: FundsContainer({
        ...services,
    }),
});
