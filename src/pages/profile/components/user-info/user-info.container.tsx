import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { pipe, flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import * as A from 'fp-ts/ReadonlyArray';
import { UserInfo } from './user-info.component';

export const UserInfoContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const user = O.fromNullable(userStore.user.get().username);
        const avatar = pipe(
            user,
            O.map(flow(S.toUpperCase, S.split(''), A.head)),
            O.flatten,
            O.getOrElse(() => 'N')
        );

        return <UserInfo user={user} avatar={avatar} />;
    }
);
