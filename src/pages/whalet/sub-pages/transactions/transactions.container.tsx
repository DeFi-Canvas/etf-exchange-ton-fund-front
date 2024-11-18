import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import React from 'react';
import { Transactions } from './transactions.page';
import { newTransactionsViewModel } from './transactions.view-model';

export const TransactionsContainer = injectable(
    newTransactionsViewModel,
    (newTransactionsViewModel) => () => {
        const vm = useValueWithEffect(() => newTransactionsViewModel(), []);
        const transactions = useProperty(vm.transactions);

        return React.createElement(Transactions, { transactions });
    }
);
