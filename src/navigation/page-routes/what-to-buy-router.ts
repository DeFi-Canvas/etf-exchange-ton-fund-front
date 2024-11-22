import { Containers } from '../containers';

export const whatToBuyRouter = (containers: Containers) => [
    {
        path: '/what-to-buy',
        page: containers.WhatToBuyPageResolved,
    },
    {
        path: '/what-to-buy/purchase/:id',
        page: containers.PurchaseContainerResolved,
    },
    {
        path: '/what-to-buy/sell',
        page: containers.SellContainerResolved,
    },
];
