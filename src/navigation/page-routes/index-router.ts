import { Containers } from '../containers';

export const indexRouter = ({
    whalet: containers,
}: Pick<Containers, 'whalet'>) => [
    {
        path: '/',
        page: containers.WaletPage,
        parent: [
            { path: '/', page: containers.Assets, isIndex: true },
            { path: 'funds', page: containers.Funds },
            { path: 'transactions', page: containers.Transactions },
        ],
    },
];
