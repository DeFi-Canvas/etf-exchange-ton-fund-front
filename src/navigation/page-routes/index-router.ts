import { Containers } from '../containers';

export const indexRouter = (containers: Containers) => [
    {
        path: '/',
        page: containers.WaletPage,
        parent: [
            //загадка жака фреско откуда взялся #
            { path: '/', page: containers.Assets, isIndex: true },
            { path: 'funds', page: containers.Funds },
            { path: 'transactions', page: containers.Transactions },
        ],
    },
];
