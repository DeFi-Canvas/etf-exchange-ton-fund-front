import { Containers } from '../containers';

export const whatToBuyRouter = (containers: Containers) => [
    {
        path: '/what-to-buy',
        page: containers.WhatToBuyPage,
    },
    {
        path: '/what-to-buy/fund/:id',
        page: containers.FundPage,
    },
    {
        path: '/what-to-buy/purchase/:id',
        page: containers.PurchaseContainer,
    },
    {
        path: '/what-to-buy/sell',
        page: containers.SellContainer,
    },
    {
        path: '/what-to-buy/funds',
        page: containers.FundsPage,
    },
];
