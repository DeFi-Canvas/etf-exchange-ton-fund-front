import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';
import { FundsData } from '@/instance/fund/fund.model';
import { now } from '@most/core';

interface BuyFundArgs {
    fundId: string;
    amount: number;
    assetId: string;
}

export interface WTBRestService {
    getFund: (id: string) => Stream<E.Either<string, FundsData>>;
    buyFund: (buyFundArgs: BuyFundArgs) => Stream<E.Either<string, unknown>>;
    sellFund: (
        buyFundArgs: Omit<BuyFundArgs, 'assetId'>
    ) => Stream<Either<string, unknown>>;
}

export const newWTBRestService = (): WTBRestService => {
    return {
        getFund: (id) => now(E.left('')),
        buyFund: (args) => now(E.left('')),
        sellFund: (args) => now(E.left('')),
    };
};
