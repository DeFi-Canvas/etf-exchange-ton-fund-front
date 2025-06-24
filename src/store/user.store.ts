import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { Error, PENDING } from './errors/error-system';
import { injectable } from '@injectable-ts/core';

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
    assets: Property<E.Either<Error, Array<CoinCardData>>>;
    setAssets: (data: E.Either<Error, Array<CoinCardData>>) => void;
}

export type NewUserStoreService = UserStoreService;

export const newNewUserStoreService = (
    init: UserData | undefined
): NewUserStoreService => {
    const user = newLensedAtom<UserData>(init ?? {});
    const assets = newLensedAtom<E.Either<Error, Array<CoinCardData>>>(
        E.left(PENDING)
    );

    return {
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
        assets,
        setAssets: (data) => assets.set(data),
    };
};

export const UserStore = injectable('userStore', () =>
    newNewUserStoreService({})
);
