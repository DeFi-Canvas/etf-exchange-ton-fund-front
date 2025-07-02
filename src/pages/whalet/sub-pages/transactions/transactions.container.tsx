import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import { newTransactionsViewModel } from './transactions.view-model';
import { Transactions } from './transactions.page';

export const TransactionsContainer = injectable(
    newTransactionsViewModel,
    useValueWithEffect,
    (newTransactionsViewModel, useValueWithEffect) =>
        memo(() => {
            const vm = useValueWithEffect(() => newTransactionsViewModel(), []);
            const transactions = useProperty(vm.transactions);

            return React.createElement(Transactions, { transactions });
        })
);
