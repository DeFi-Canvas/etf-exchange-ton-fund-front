import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';

export interface UserData {
    allowsWriteToPm?: boolean;
    firstName?: string;
    id?: number;
    isPremium?: boolean;
    languageCode?: string;
    lastName?: string;
    username?: string;
}

export interface UserStoreService {
    user: Property<UserData>;
    setUser: (data: Partial<UserData> | undefined) => void;
    assets: Property<E.Either<string, Array<CoinCardData>>>;
    setAssets: (data: E.Either<string, Array<CoinCardData>>) => void;
    transactions: Property<Array<unknown>>;
}

export type NewUserStoreService = ValueWithEffect<UserStoreService>;

export const newNewUserStoreService = (
    init: UserData | undefined
): NewUserStoreService => {
    const user = newLensedAtom<UserData>(init ?? {});
    const assets = newLensedAtom<E.Either<string, Array<CoinCardData>>>(
        E.left('pending')
    );
    const transactions = newLensedAtom([]);

    return valueWithEffect.new({
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
        assets,
        setAssets: (data) => assets.set(data),
        transactions,
    });
};
