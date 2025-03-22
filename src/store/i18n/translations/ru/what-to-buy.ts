import { WhatToBuyI18n } from '@/pages/what-to-buy/what-to-buy.i18n.model';

export const WhatToBuy: WhatToBuyI18n = {
    Funds: {
        title: 'What to buy (ru)',
        card: {
            risk: 'Risk (ru)',
            forecast: 'Forecast (ru)',
            return: 'Annual Return (ru)',
        },
    },
    Fund: {
        tvlTitle: 'TVL (ru)',
        about: 'About (ru)',
        toMemeCoins: 'Compared to meme coins (ru)',
        commission: 'Commission (ru)',
        coinsExchangeFee: 'Coins exchange fee (ru)',
        whatsInside: "What's inside",
        moreInfo: {
            title: 'More info (ru)',
            flow: 'People follow',
            created: 'Created at',
        },
        authorTitle: 'Author',
        sell: 'Sell (ru)',
        buy: 'Buy',
    },
    Purchase: {
        title: 'Purchase',
        attention: {
            title: 'Attention',
            text: 'Investments in the funds are in the beta testing phase. Please consider the risks.',
        },
        details: {
            title: 'Purchase Details (ru)',
            commission: 'Commission',
            total: 'Total',
        },
        buy: 'Buy',
        finalBottomSheet: {
            operation: (operation: string) =>
                `The ${operation} is successful (ru)`,
            fund: 'fund',
            total: 'Total amount',
        },
    },
    Sell: {
        title: 'Selling',
        details: {
            title: 'Sell Details (ru)',
            commission: 'Commission',
            total: 'Total',
        },
        finalBottomSheet: {
            operation: (operation: string) =>
                `The ${operation} is successful (ru)`,
            fund: 'fund',
            total: 'Total amount',
        },
    },
    utils: {
        asset: 'Asset',
        amount: 'Amount',
        max: 'MAX',
    },
};
