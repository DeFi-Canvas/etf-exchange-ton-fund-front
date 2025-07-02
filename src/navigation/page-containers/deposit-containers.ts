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
    cacheStore,
    assetService,
    scheduler,
    withdrowStore,
    waletRestService,
}: Pick<
    getContainersArgs,
    | 'i18n'
    | 'userStore'
    | 'cacheStore'
    | 'assetService'
    | 'scheduler'
    | 'withdrowStore'
    | 'waletRestService'
>): DepositContainers => ({
    DepositPage: Deposit({
        userStore,
        i18n,
        cacheStore,
        assetService,
        scheduler,
        withdrowStore,
        waletRestService,
    }),
    DepositEndPoint: DepositEndPointContainer({
        userStore,
        i18n,
        assetService,
        scheduler,
    }),
});
