import { NewUserStoreService, UserData } from './user.store';
import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';

const NEW_USER_STORE_SERVICE = (): NewUserStoreService => {
    const user = newLensedAtom<UserData>({});
    const assets = newLensedAtom<E.Either<string, Array<CoinCardData>>>(
        E.left('pending')
    );

    return valueWithEffect.new({
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
        assets,
        setAssets: (data) => assets.set(data),
    });
};
