import { NewUserStoreService, UserData } from './user.store';
import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { Error, PENDING } from './errors/error-system';

const NEW_USER_STORE_SERVICE = (): NewUserStoreService => {
    const user = newLensedAtom<UserData>({});
    const assets = newLensedAtom<E.Either<Error, Array<CoinCardData>>>(
        E.left(PENDING)
    );

    return valueWithEffect.new({
        user,
        setUser: (data) => user.modify((user) => ({ ...user, ...data })),
        assets,
        setAssets: (data) => assets.set(data),
    });
};
