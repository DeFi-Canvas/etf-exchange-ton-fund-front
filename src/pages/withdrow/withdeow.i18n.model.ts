export interface WithdrawI18n {
    Withdraw: {
        title: string;
    };
    Amount: {
        title: string;
        balance: string;
        button: {
            empty: string;
            normal: string;
        };
        errors: {
            insufficientBalance: string;
            minimumAmount: string;
        };
    };
    Address: {
        title: string;
        address: string;
        placeholderAddress: string;
        tag: string;
        placeholderTag: string;
        commission: string;
        footer: {
            balance: string;
            button: string;
        };
    };
    Check: {
        title: string;
        address: string;
        tag: string;
        commission: string;
        footer: {
            balance: string;
            button: string;
        };
    };
    Final: {
        title: string;
        description: string;
        ammount: (amount: number, currency: string) => string;
        view: string;
        finish: string;
    };
}
