import { UserData } from '@/store/user.store';
import { injectable } from '@injectable-ts/core';
import { pipe, flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import * as A from 'fp-ts/ReadonlyArray';
import { UserInfo } from './user-info.component';

export const UserInfoContainer = injectable(UserData, (userData) => () => {
    const user = O.fromNullable(userData.username);
    const avatar = pipe(
        user,
        O.map(flow(S.toUpperCase, S.split(''), A.head)),
        O.flatten,
        O.getOrElse(() => 'N')
    );

    return <UserInfo user={user} avatar={avatar} />;
});
