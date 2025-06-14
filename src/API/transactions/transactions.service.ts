import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from '../API';
import { TransactionApi } from '../scheme/rest-genereted/api';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { Configuration } from '../scheme/rest-genereted';
import { handleGetRequest } from '../request.utils';
import {} from '../contracts/withdraw.contract';
import {
    Transactions,
    transactionsResponseCodec,
} from './transactions.responce.contract';

const transactionApi = new TransactionApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export interface TransactionsRestService {
    getTransactions: () => Stream<Either<string, Transactions>>;
}

export const newTransactionsRestService = injectable(
    (): TransactionsRestService => {
        const { initDataRaw } = retrieveLaunchParams();

        return {
            getTransactions: () =>
                handleGetRequest(
                    transactionApi.apiTransactionPost(0, 20, {
                        headers: { Authorization: `tma ${initDataRaw}` },
                    }),
                    transactionsResponseCodec,
                    (x) => x.payload
                )(),
        };
    }
);

export const TransactionsRestService = token(
    'transactionsRestService'
)<TransactionsRestService>();
