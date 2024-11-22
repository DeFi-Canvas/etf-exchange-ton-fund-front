import { Containers } from '../containers';

export const indexRouter = (containers: Containers) => [
    {
        path: '/',
        page: containers.WaletPageResolved,
        parent: [
            //загадка жака фреско откуда взялся #
            { path: '/', page: containers.AssetsResolved, isIndex: true },
            { path: 'funds', page: containers.FundsResolved },
            { path: 'transactions', page: containers.TransactionsResolved },
        ],
    },
];
