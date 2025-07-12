import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable, token } from '@injectable-ts/core';
import { BASE_API_CONFIG } from '../API';
import { TransactionApi } from '../scheme/rest-genereted/api';
import {
    authRequestOptions,
    handleGetRequest,
    performGetRequest,
} from '../request.utils';
import {
    Deposit,
    depositResponseCodec,
    Transactions,
    transactionsCodec,
    transactionsResponseCodec,
} from './transactions.responce.contract';
import { CacheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';
import { Error } from '@/store/errors/error-system';

const transactionApi = new TransactionApi(BASE_API_CONFIG);

export interface TransactionsRestService {
    getTransactions: () => Stream<Either<string, Transactions>>;
    getDepositDetails: () => Stream<Either<Error, Deposit>>;
}

export const newTransactionsRestService = injectable(
    CacheStore,
    (cacheStore): TransactionsRestService => {
        return {
            getTransactions: () =>
                pipe(
                    performGetRequest(
                        transactionApi.apiTransactionPost(
                            0,
                            20,
                            authRequestOptions()
                        ),
                        transactionsResponseCodec,
                        (x) => x.payload
                    ),
                    waitWithCache(cacheStore, 'transactions', transactionsCodec)
                ),
            getDepositDetails: handleGetRequest(
                transactionApi.apiTransactionDepositInfoGet(
                    authRequestOptions()
                ),
                depositResponseCodec,
                (x) => x.payload
            ),
        };
    }
);

export const TransactionsRestService = token(
    'transactionsService'
)<TransactionsRestService>();
