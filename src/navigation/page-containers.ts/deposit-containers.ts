import { Component, getContainersArgs } from '../containers';
import { Deposit } from '@/pages/deposit/deposit.page';
import { DepositEndPointContainer } from '@/pages/deposit/pages/deposit-end-point/deposit-end-point.container';

export interface DepositContainers {
    DepositPage: Component;
    DepositEndPoint: Component;
}

export const getDepositContainers = ({
    userStore,
    i18n,
    assetsRestService,
    cacheStore,
}: Pick<
    getContainersArgs,
    'i18n' | 'userStore' | 'assetsRestService' | 'cacheStore'
>): DepositContainers => ({
    DepositPage: Deposit({
        userStore,
        i18n,
        assetsRestService,
        cacheStore,
    }),
    DepositEndPoint: DepositEndPointContainer({
        userStore,
        i18n,
        assetsRestService,
    }),
});
