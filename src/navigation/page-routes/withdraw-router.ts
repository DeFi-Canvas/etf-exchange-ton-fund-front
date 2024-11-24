import { Containers } from '../containers';

export const withdrawRouter = (containers: Containers) => [
    {
        path: 'withdraw',
        page: containers.Withdrow,
    },
    {
        path: '/withdraw/:ticker',
        page: containers.Amount,
    },
    {
        path: '/withdraw/:ticker/address',
        page: containers.Address,
    },
    {
        path: '/withdraw/:ticker/address/check',
        page: containers.Check,
    },
    {
        path: '/withdraw/:ticker/address/final',
        page: containers.Final,
    },
];
