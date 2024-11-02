import * as O from 'fp-ts/Option';

import css from './user-info.module.css';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';

export interface UserInfoProps {
    readonly avatar: string;
    readonly user: O.Option<string>;
}

export const UserInfo = ({ avatar, user }: UserInfoProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.avatar}>
                <span className={css.letter}>{avatar}</span>
            </div>
            <OptionSpan data={user} className={css.username} />
        </div>
    );
};
