import { Containers } from '../containers';

export const depositRouter = ({
    deposit: containers,
}: Pick<Containers, 'deposit'>) => [
    {
        path: 'deposit',
        page: containers.DepositPage,
    },
    {
        path: '/deposit/:ticker/deposit-end-point',
        page: containers.DepositEndPoint,
    },
];
