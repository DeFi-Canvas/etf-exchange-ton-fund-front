import { CoinCardProps } from '@/components/ui-kit/coin-card/coin-card.component';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import * as O from 'fp-ts/Option';

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
    assets: Property<O.Option<Array<CoinCardProps>>>;
    setAssets: (data: O.Option<Array<CoinCardProps>>) => void;
    // TODO
    transactions: Property<Array<unknown>>;
}

export type NewUserStoreService = ValueWithEffect<UserStoreService>;

export const newNewUserStoreService = (
    init: UserData | undefined
): NewUserStoreService => {
    const user = newLensedAtom<UserData>(init ?? {});
    const assets = newLensedAtom<O.Option<Array<CoinCardProps>>>(O.none);
    const transactions = newLensedAtom([]);

    return valueWithEffect.new({
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
        assets,
        setAssets: (data) => assets.set(data),
        transactions,
    });
};
