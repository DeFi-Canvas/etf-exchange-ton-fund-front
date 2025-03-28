export interface SwapI18n {
    header: {
        title: string;
        fee: string;
    };
    cards: {
        send: string;
        receive: string;
        max: string;
    };
    footer: {
        INSUFFICIENT_BALANCE: string;
        EMPTY_FIELD: string;
    };
    details: {
        title: string;
        rate: string;
        minimum: string;
        afterSwap: string;
    };
    result: {
        totalAmount: string;
    };
    select: string;
}
