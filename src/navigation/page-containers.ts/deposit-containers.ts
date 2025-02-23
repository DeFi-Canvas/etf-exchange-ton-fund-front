import { lazy } from 'react';
import { Component, getContainersArgs } from '../containers';

export interface DepositContainers {
    DepositPage: Component;
    DepositEndPoint: Component;
}

export const getDepositContainers = ({
    userStore,
}: getContainersArgs): DepositContainers => ({
    DepositPage: lazy(() =>
        import('@deposit/deposit.page').then((c) => {
            const component = c.Deposit({ userStore });
            return { default: component };
        })
    ),
    DepositEndPoint: lazy(() =>
        import(
            '@deposit/pages/deposit-end-point/deposit-end-point.container'
        ).then((c) => {
            const component = c.DepositEndPointContainer({ userStore });
            return { default: component };
        })
    ),
});
