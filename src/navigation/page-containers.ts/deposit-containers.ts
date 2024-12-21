import { Deposit } from '@deposit/deposit.page';
import { Component, getContainersArgs } from '../containers';
import { DepositEndPointContainer } from '@deposit/pages/deposit-end-point/deposit-end-point.container';

export interface DepositContainers {
    DepositPage: Component;
    DepositEndPoint: Component;
}

export const getDepositContainers = ({
    userStore,
}: getContainersArgs): DepositContainers => ({
    DepositPage: Deposit({
        userStore,
    }),
    DepositEndPoint: DepositEndPointContainer({
        userStore,
    }),
});
