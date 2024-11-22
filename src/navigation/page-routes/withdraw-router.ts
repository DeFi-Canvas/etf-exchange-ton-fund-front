import { Containers } from '../containers';

export const withdrawRouter = (containers: Containers) => [
    {
        path: 'withdraw',
        page: containers.WithdrowResolved,
    },
    {
        path: '/withdraw/:ticker',
        page: containers.AmountResolved,
    },
    {
        path: '/withdraw/:ticker/address',
        page: containers.AddressResolved,
    },
    {
        path: '/withdraw/:ticker/address/check',
        page: containers.CheckResolved,
    },
    {
        path: '/withdraw/:ticker/address/final',
        page: containers.FinalResolved,
    },
];
