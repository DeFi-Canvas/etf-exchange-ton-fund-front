import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from '../API';
import { TransactionApi } from '../scheme/rest-genereted/api';
import { Configuration } from '../scheme/rest-genereted';
import { authRequestOptions, handleGetRequest } from '../request.utils';
import {
    Transactions,
    transactionsResponseCodec,
} from './transactions.responce.contract';
import { CaheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';

const transactionApi = new TransactionApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export interface TransactionsRestService {
    getTransactions: () => Stream<Either<string, Transactions>>;
}

export const newTransactionsRestService = injectable(
    CaheStore,
    (caheStore): TransactionsRestService => {
        return {
            getTransactions: () =>
                pipe(
                    handleGetRequest(
                        transactionApi.apiTransactionPost(
                            0,
                            20,
                            authRequestOptions()
                        ),
                        transactionsResponseCodec,
                        (x) => x.payload
                    )(),
                    waitWithCache(caheStore, 'transactions')
                ),
        };
    }
);

export const TransactionsRestService = token(
    'transactionsRestService'
)<TransactionsRestService>();
