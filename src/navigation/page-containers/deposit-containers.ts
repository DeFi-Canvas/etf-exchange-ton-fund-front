import { Component, getContainersArgs } from '../containers';
import { Deposit } from '@/pages/deposit/deposit.page';
import { DepositEndPointContainer } from '@/pages/deposit/pages/deposit-end-point/deposit-end-point.container';

export interface DepositContainers {
    DepositPage: Component;
    DepositEndPoint: Component;
}

export const getDepositContainers = (
    services: getContainersArgs
): DepositContainers => ({
    DepositPage: Deposit({
        ...services,
    }),
    DepositEndPoint: DepositEndPointContainer({
        ...services,
    }),
});
