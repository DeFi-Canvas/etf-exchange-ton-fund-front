import { Containers } from '../containers';

export const earnRouter = ({ earn: containers }: Pick<Containers, 'earn'>) => [
    {
        path: '/earn',
        page: containers.Storm,
    },
];
