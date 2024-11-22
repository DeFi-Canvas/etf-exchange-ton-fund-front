import { Containers } from '../containers';

export const depositRouter = (containers: Containers) => [
    {
        path: 'deposit',
        page: containers.DepositPageResolved,
    },
    {
        path: '/deposit/:ticker/deposit-end-point',
        page: containers.DepositEndPointResolved,
    },
];
