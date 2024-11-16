import * as O from 'fp-ts/Option';

import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import UserAvatar from '@/components/ui-kit/user-avatar/user-avatar.component';
import css from './user-info.module.css';
import cn from 'classnames';

export interface UserInfoProps {
    readonly avatar: string;
    readonly user: O.Option<string>;
}

export const UserInfo = ({ avatar, user }: UserInfoProps) => {
    return (
        <div className={ cn('app-container', css.wrap) }>
            <UserAvatar userNameLetter={ avatar } />
            <OptionSpan data={user} className={css.username} />
        </div>
    );
};
