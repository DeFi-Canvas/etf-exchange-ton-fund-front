import { WithdrawI18n } from '@/pages/withdrow/withdeow.i18n.model';

export const Withdraw: WithdrawI18n = {
    Withdraw: {
        title: 'Withdraw (RU)',
    },
    Amount: {
        title: 'Enter amount',
        balance: 'Available balance',
        button: {
            empty: 'Enter the total amount',
            normal: 'Continue',
        },
        errors: {
            insufficientBalance: 'Insufficient balance',
            minimumAmount: 'Minimum amount',
        },
    },
    Address: {
        title: 'Enter address',
        address: 'Withdraw address',
        placeholderAddress:
            'Input or press and hold to paste the withdrawal address',
        tag: 'Tag/Memo (Comment/Note/Remark)',
        placeholderTag: 'Enter your tag',
        commission: 'Commission',
        footer: {
            balance: 'Balance after withdraw',
            button: 'Continue (ru)',
        },
    },
    Check: {
        title: 'Check the data',
        address: 'Withdraw address',
        tag: 'Tag/Memo (Comment/Note/Remark)',
        commission: 'Commission',
        footer: {
            balance: 'Balance after withdraw',
            button: 'Submit and withdraw (ru)',
        },
    },
    Final: {
        title: 'is on the way',
        description:
            'Your transaction is being processed. You can follow the status in the “Transactions” section.',
        ammount: (amount: number, currency: string) =>
            `The amount of ${amount} ${currency} has been sent to:`,

        view: 'View the transaction (RU)',
        finish: 'Finish',
    },
};
