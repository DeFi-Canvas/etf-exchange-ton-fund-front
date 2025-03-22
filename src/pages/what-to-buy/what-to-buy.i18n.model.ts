export interface WhatToBuyI18n {
    Funds: {
        title: string;
        card: {
            risk: string;
            forecast: string;
            return: string;
        };
    };
    Fund: {
        tvlTitle: string;
        about: string;
        toMemeCoins: string;
        commission: string;
        coinsExchangeFee: string;
        whatsInside: string;
        moreInfo: {
            title: string;
            flow: string;
            created: string;
        };
        authorTitle: string;
        sell: string;
        buy: string;
    };
    Purchase: {
        title: string;
        attention: {
            title: string;
            text: string;
        };
        details: {
            title: string;
            commission: string;
            total: string;
        };
        buy: string;
        finalBottomSheet: {
            operation: (operation: string) => string;
            fund: string;
            total: string;
        };
    };
    Sell: {
        title: string;
        details: {
            title: string;
            commission: string;
            total: string;
        };
        finalBottomSheet: {
            operation: (operation: string) => string;
            fund: string;
            total: string;
        };
    };
    utils: {
        asset: string;
        amount: string;
        max: string;
    };
}
