import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';

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
}

export type NewUserStoreService = ValueWithEffect<UserStoreService>;

export const newNewUserStoreService = (
    init: UserData | undefined
): NewUserStoreService => {
    const user = newLensedAtom<UserData>(init ?? {});

    return valueWithEffect.new({
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
    });
};
